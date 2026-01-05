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

export const onRequestGet = async (ctx: any) => {
  const expected = ctx.env?.ADMIN_TOKEN;
  if (!expected) return unauthorized();

  const auth = ctx.request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length) : "";
  if (!token || token !== expected) return unauthorized();

  const url = new URL(ctx.request.url);
  const limitRaw = parseInt(url.searchParams.get("limit") ?? "100", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 100;
  const source = url.searchParams.get("source");

  const db = ctx.env?.DB;
  if (!db) {
    return json({ ok: false, error: "DB binding missing" }, { status: 500 });
  }

  const baseSql =
    "SELECT id, created_at, source, subject, name, email, phone, location, timeline, message, page_path FROM submissions";

  const statement = source
    ? db
        .prepare(`${baseSql} WHERE source = ? ORDER BY created_at DESC LIMIT ?`)
        .bind(source, limit)
    : db.prepare(`${baseSql} ORDER BY created_at DESC LIMIT ?`).bind(limit);

  const result = await statement.all();
  return json({ ok: true, items: result?.results ?? [] });
};
