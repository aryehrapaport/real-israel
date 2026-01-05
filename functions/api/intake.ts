function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
    ...init,
  });
}

function getString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export const onRequestPost = async (ctx: any) => {
  let body: any;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = (getString(body?.email) ?? "").trim();
  if (!email || !email.includes("@")) {
    return json({ ok: false, error: "Email is required" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const source = (getString(body?.source) ?? "unknown").slice(0, 80);
  const subject = getString(body?.subject)?.slice(0, 160) ?? null;

  const name = getString(body?.name)?.trim()?.slice(0, 120) ?? null;
  const phone = getString(body?.phone)?.trim()?.slice(0, 80) ?? null;
  const location = getString(body?.location)?.trim()?.slice(0, 160) ?? null;
  const timeline = getString(body?.timeline)?.trim()?.slice(0, 160) ?? null;
  const message = getString(body?.message)?.trim()?.slice(0, 4000) ?? null;
  const pagePath = getString(body?.pagePath)?.trim()?.slice(0, 240) ?? null;

  const userAgent = (ctx.request.headers.get("user-agent") ?? "").slice(0, 240);

  const db = ctx.env?.DB;
  if (!db) {
    return json({ ok: false, error: "DB binding missing" }, { status: 500 });
  }

  await db
    .prepare(
      `INSERT INTO submissions
      (id, created_at, source, subject, name, email, phone, location, timeline, message, page_path, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      id,
      createdAt,
      source,
      subject,
      name,
      email,
      phone,
      location,
      timeline,
      message,
      pagePath,
      userAgent,
    )
    .run();

  return json({ ok: true, id });
};
