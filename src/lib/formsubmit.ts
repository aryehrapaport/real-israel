import type { ContactIntakeValues } from "@/lib/contact-intake";

type SubmitOptions = {
  subject: string;
  source: string;
  pagePath?: string;
};

type IntakeResult = {
  emailed: boolean;
  saved: boolean;
};

function getPagePath(explicit?: string) {
  return explicit ?? `${window.location.pathname}${window.location.search}`;
}

function toErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export async function submitContactIntakeToFormSubmit(
  values: ContactIntakeValues,
  options: SubmitOptions,
): Promise<void> {
  const recipient = import.meta.env.VITE_FORMSUBMIT_EMAIL as string | undefined;

  if (!recipient) {
    console.error("[FormSubmit] Missing VITE_FORMSUBMIT_EMAIL. Email notification will not be sent.");
    throw new Error("Missing VITE_FORMSUBMIT_EMAIL.");
  }

  const pagePath = getPagePath(options.pagePath);

  let response: Response;
  try {
    response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          _subject: options.subject,
          _template: "table",
          _replyto: values.email,
          source: options.source,
          page_path: pagePath,
        }),
      },
    );
  } catch (err) {
    console.error("[FormSubmit] Network error", {
      message: toErrorMessage(err),
      source: options.source,
      subject: options.subject,
      page_path: pagePath,
    });
    throw err;
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("[FormSubmit] Request failed", {
      status: response.status,
      statusText: response.statusText,
      body: text?.slice(0, 2000) ?? "",
      source: options.source,
      subject: options.subject,
      page_path: pagePath,
    });
    throw new Error(text || `FormSubmit failed (${response.status}).`);
  }
}

async function submitContactIntakeToD1(
  values: ContactIntakeValues,
  options: SubmitOptions,
): Promise<void> {
  const pagePath = getPagePath(options.pagePath);

  const response = await fetch("/api/intake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...values,
      source: options.source,
      subject: options.subject,
      pagePath,
    }),
  });

  const data = (await response.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;

  if (!response.ok || !data?.ok) {
    throw new Error(data?.error || `D1 save failed (${response.status}).`);
  }
}

/**
 * Sends the intake to FormSubmit (email) and also stores it in Cloudflare D1.
 *
 * Behavior:
 * - We attempt both in parallel.
 * - The overall request succeeds if either email OR D1 succeeds.
 * - We only throw if both fail.
 */
export async function submitContactIntake(
  values: ContactIntakeValues,
  options: SubmitOptions,
): Promise<IntakeResult> {
  const [emailResult, d1Result] = await Promise.allSettled([
    submitContactIntakeToFormSubmit(values, options),
    submitContactIntakeToD1(values, options),
  ]);

  const emailed = emailResult.status === "fulfilled";
  const saved = d1Result.status === "fulfilled";

  if (!emailed) {
    console.warn("[Intake] Email notification failed", {
      reason: emailResult.status === "rejected" ? toErrorMessage(emailResult.reason) : "unknown",
      saved,
      source: options.source,
      subject: options.subject,
    });
  }

  if (!saved) {
    console.warn("[Intake] D1 save failed", {
      reason: d1Result.status === "rejected" ? toErrorMessage(d1Result.reason) : "unknown",
      emailed,
      source: options.source,
      subject: options.subject,
    });
  }

  if (!emailed && !saved) {
    const reason =
      (emailResult.status === "rejected" ? emailResult.reason : null) ??
      (d1Result.status === "rejected" ? d1Result.reason : null) ??
      new Error("Submission failed.");
    throw reason;
  }

  return {
    emailed,
    saved,
  };
}
