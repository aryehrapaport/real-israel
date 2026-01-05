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
  const limitRaw = parseInt(url.searchParams.get("limit") ?? "25", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 200) : 25;
  const offsetRaw = parseInt(url.searchParams.get("offset") ?? "0", 10);
  const offset = Number.isFinite(offsetRaw) ? Math.max(offsetRaw, 0) : 0;
  const source = url.searchParams.get("source");
  const status = url.searchParams.get("status");
  const includeDeleted = url.searchParams.get("includeDeleted") === "1";

  const db = ctx.env?.DB;
  if (!db) {
    return json({ ok: false, error: "DB binding missing" }, { status: 500 });
  }

  const baseSql =
    "SELECT id, created_at, source, subject, name, email, phone, location, timeline, message, page_path, read_at, deleted_at FROM submissions";

  const whereParts: string[] = [];
  const binds: unknown[] = [];

  if (!includeDeleted) {
    whereParts.push("deleted_at IS NULL");
  }

  if (source) {
    whereParts.push("source = ?");
    binds.push(source);
  }

  if (status === "unread") {
    whereParts.push("read_at IS NULL");
  } else if (status === "read") {
    whereParts.push("read_at IS NOT NULL");
  }

  const whereSql = whereParts.length ? ` WHERE ${whereParts.join(" AND ")}` : "";
  const statement = db
    .prepare(`${baseSql}${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`)
    .bind(...binds, limit, offset);

  const countResult = await db
    .prepare(`SELECT COUNT(1) as total FROM submissions${whereSql}`)
    .bind(...binds)
    .first();

  const total = typeof countResult?.total === "number" ? countResult.total : 0;

  const result = await statement.all();
  return json({ ok: true, items: result?.results ?? [], total, limit, offset });
};
