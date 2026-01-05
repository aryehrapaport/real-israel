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

export async function submitContactIntakeToFormSubmit(
  values: ContactIntakeValues,
  options: SubmitOptions,
): Promise<void> {
  const recipient = import.meta.env.VITE_FORMSUBMIT_EMAIL as string | undefined;

  if (!recipient) {
    throw new Error("Missing VITE_FORMSUBMIT_EMAIL.");
  }

  const response = await fetch(
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
        source: options.source,
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `FormSubmit failed (${response.status}).`);
  }
}

async function submitContactIntakeToD1(
  values: ContactIntakeValues,
  options: SubmitOptions,
): Promise<void> {
  const pagePath =
    options.pagePath ?? `${window.location.pathname}${window.location.search}`;

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
 * - Email must succeed (otherwise we throw).
 * - D1 is best-effort: we attempt it, but do not block the user if it fails.
 */
export async function submitContactIntake(
  values: ContactIntakeValues,
  options: SubmitOptions,
): Promise<IntakeResult> {
  const [emailResult, d1Result] = await Promise.allSettled([
    submitContactIntakeToFormSubmit(values, options),
    submitContactIntakeToD1(values, options),
  ]);

  if (emailResult.status === "rejected") {
    throw emailResult.reason;
  }

  return {
    emailed: true,
    saved: d1Result.status === "fulfilled",
  };
}
