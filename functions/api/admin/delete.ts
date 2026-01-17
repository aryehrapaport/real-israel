function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
    ...init,
  });
}

function unauthorized() {
  return json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function getToken(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  return auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
}

type Ctx = {
  request: Request;
  env?: {
    ADMIN_TOKEN?: string;
    DB?: {
      prepare: (sql: string) => {
        bind: (...args: unknown[]) => { run: () => Promise<{ meta?: { changes?: number } }> };
      };
    };
  };
};

export const onRequestPost = async (ctx: Ctx) => {
  const expected = ctx.env?.ADMIN_TOKEN;
  if (!expected) return unauthorized();

  const token = getToken(ctx.request);
  if (!token || token !== expected) return unauthorized();

  let body: unknown;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const ids =
    body && typeof body === "object" && Array.isArray((body as { ids?: unknown }).ids)
      ? ((body as { ids: unknown[] }).ids).filter((x) => typeof x === "string")
      : [];
  if (ids.length === 0) {
    return json({ ok: false, error: "No ids provided" }, { status: 400 });
  }

  const db = ctx.env?.DB;
  if (!db) return json({ ok: false, error: "DB binding missing" }, { status: 500 });

  const now = new Date().toISOString();
  const placeholders = ids.map(() => "?").join(",");

  const result = await db
    .prepare(
      `UPDATE submissions
       SET deleted_at = COALESCE(deleted_at, ?)
       WHERE deleted_at IS NULL AND id IN (${placeholders})`,
    )
    .bind(now, ...ids)
    .run();

  return json({ ok: true, deleted: result?.meta?.changes ?? 0 });
};
