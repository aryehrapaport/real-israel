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

export const onRequestPost = async (ctx: any) => {
  const expected = ctx.env?.ADMIN_TOKEN;
  if (!expected) return unauthorized();

  const token = getToken(ctx.request);
  if (!token || token !== expected) return unauthorized();

  let body: any;
  try {
    body = await ctx.request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const ids = Array.isArray(body?.ids) ? body.ids.filter((x: any) => typeof x === "string") : [];
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
       SET read_at = COALESCE(read_at, ?)
       WHERE deleted_at IS NULL AND id IN (${placeholders})`,
    )
    .bind(now, ...ids)
    .run();

  return json({ ok: true, updated: result?.meta?.changes ?? 0 });
};
