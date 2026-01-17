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

type Ctx = {
  request: Request;
  env?: {
    DB?: {
      prepare: (sql: string) => {
        bind: (...args: unknown[]) => { run: () => Promise<unknown> };
      };
    };
  };
};

export const onRequestPost = async (ctx: Ctx) => {
  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const bodyObj = body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  const email = (getString(bodyObj.email) ?? "").trim();
  if (!email || !email.includes("@")) {
    return json({ ok: false, error: "Email is required" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const source = (getString(bodyObj.source) ?? "unknown").slice(0, 80);
  const subject = getString(bodyObj.subject)?.slice(0, 160) ?? null;

  const name = getString(bodyObj.name)?.trim()?.slice(0, 120) ?? null;
  const phone = getString(bodyObj.phone)?.trim()?.slice(0, 80) ?? null;
  const location = getString(bodyObj.location)?.trim()?.slice(0, 160) ?? null;
  const timeline = getString(bodyObj.timeline)?.trim()?.slice(0, 160) ?? null;
  const message = getString(bodyObj.message)?.trim()?.slice(0, 4000) ?? null;
  const pagePath = getString(bodyObj.pagePath)?.trim()?.slice(0, 240) ?? null;

  const userAgent = (ctx.request.headers.get("user-agent") ?? "").slice(0, 240);

  const db = ctx.env?.DB;
  if (!db) {
    return json({ ok: false, error: "DB binding missing" }, { status: 500 });
  }

  await db
    .prepare(
      `INSERT INTO submissions
      (id, created_at, source, subject, name, email, phone, location, timeline, message, page_path, user_agent, read_at, deleted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, NULL)`
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
