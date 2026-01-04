import type { ContactIntakeValues } from "@/lib/contact-intake";

type SubmitOptions = {
  subject: string;
  source: string;
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
