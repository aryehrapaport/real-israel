import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  LogOut,
  Mail,
  Search,
  Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { Seo } from "@/components/seo";
import { Container, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type Submission = {
  id: string;
  created_at: string;
  source: string;
  subject: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  timeline: string | null;
  message: string | null;
  page_path: string | null;
  read_at?: string | null;
  deleted_at?: string | null;
};

function toCsvValue(value: unknown) {
  const s = value == null ? "" : String(value);
  const needsQuotes = /[\n\r,\"]/g.test(s);
  const escaped = s.replace(/\"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function downloadCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0] ?? {});
  const lines = [headers.map(toCsvValue).join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => toCsvValue((row as any)[h])).join(","));
  }

  const csv = "\ufeff" + lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function downloadXlsx(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return;
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

  const array = XLSX.write(workbook, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
  const blob = new Blob([array],
    { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function AdminPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") ?? "");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [actionBusy, setActionBusy] = useState<"mark-read" | "delete" | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 25;
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");
  const [query, setQuery] = useState("");

  const authed = useMemo(() => token.trim().length > 10, [token]);

  useEffect(() => {
    const existing = localStorage.getItem("admin_token") ?? "";
    if (!existing || existing.trim().length <= 10) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setToken(existing);
  }, [navigate]);

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, v]) => v).map(([k]) => k),
    [selected],
  );

  const selectedCount = selectedIds.length;
  const allCount = items.length;
  const headerCheckboxState =
    selectedCount === 0 ? false : selectedCount === allCount ? true : "indeterminate";

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < pageCount;

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((s) => {
      const haystack = [
        s.email,
        s.name ?? "",
        s.subject ?? "",
        s.message ?? "",
        s.location ?? "",
        s.timeline ?? "",
      ]
        .join("\n")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query]);

  const unreadCount = useMemo(
    () => items.filter((s) => !s.read_at).length,
    [items],
  );

  const selectedReadItems = useMemo(() => {
    if (selectedIds.length === 0) return [] as Submission[];
    const set = new Set(selectedIds);
    return items.filter((s) => set.has(s.id) && Boolean(s.read_at));
  }, [items, selectedIds]);

  const canExportSelectedRead = selectedReadItems.length > 1;

  function buildExportRows(subs: Submission[]) {
    return subs.map((s) => ({
      id: s.id,
      created_at: s.created_at,
      read_at: s.read_at ?? "",
      source: s.source,
      subject: s.subject ?? "",
      name: s.name ?? "",
      email: s.email,
      phone: s.phone ?? "",
      location: s.location ?? "",
      timeline: s.timeline ?? "",
      message: s.message ?? "",
      page_path: s.page_path ?? "",
    }));
  }

  async function load(nextPage = 1) {
    setLoading(true);
    setError(null);

    try {
      const offset = Math.max(0, (nextPage - 1) * pageSize);
      const qs = new URLSearchParams({
        limit: String(pageSize),
        offset: String(offset),
      });
      if (statusFilter !== "all") qs.set("status", statusFilter);

      const response = await fetch(`/api/admin/submissions?${qs.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; items?: Submission[]; error?: string; total?: number }
        | null;

      if (response.status === 401) {
        localStorage.removeItem("admin_token");
        navigate("/admin/login?reason=unauthorized", { replace: true });
        return;
      }

      if (!response.ok || !data?.ok) throw new Error(data?.error || "Could not load submissions.");

      setItems(data.items ?? []);
      setTotal(typeof data.total === "number" ? data.total : 0);
      setSelected({});
      setPage(nextPage);
      localStorage.setItem("admin_token", token);
    } catch (err) {
      setItems([]);
      setTotal(0);
      setSelected({});
      setError(err instanceof Error ? err.message : "Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("admin_token");
    setItems([]);
    setTotal(0);
    setSelected({});
    setError(null);
    setPage(1);
    setQuery("");
    navigate("/admin/login", { replace: true });
  }

  function toggleOne(id: string, next: boolean) {
    setSelected((prev) => ({ ...prev, [id]: next }));
  }

  function toggleAll(next: boolean) {
    if (!next) {
      setSelected({});
      return;
    }
    const map: Record<string, boolean> = {};
    for (const s of items) map[s.id] = true;
    setSelected(map);
  }

  async function postAdminAction(path: string, ids: string[]) {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    });

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (response.status === 401) {
      localStorage.removeItem("admin_token");
      navigate("/admin/login?reason=unauthorized", { replace: true });
      return;
    }

    if (!response.ok || !data?.ok) throw new Error(data?.error || "Request failed.");
  }

  async function markRead(ids: string[]) {
    setActionBusy("mark-read");
    setError(null);
    try {
      await postAdminAction("/api/admin/mark-read", ids);
      const now = new Date().toISOString();
      setItems((prev) =>
        prev.map((s) => (ids.includes(s.id) ? { ...s, read_at: s.read_at ?? now } : s)),
      );
      setSelected((prev) => {
        const next = { ...prev };
        for (const id of ids) delete next[id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not mark as read.");
    } finally {
      setActionBusy(null);
    }
  }

  async function deleteItems(ids: string[]) {
    setActionBusy("delete");
    setError(null);
    try {
      await postAdminAction("/api/admin/delete", ids);
      setItems((prev) => prev.filter((s) => !ids.includes(s.id)));
      setTotal((t) => Math.max(0, t - ids.length));
      setSelected((prev) => {
        const next = { ...prev };
        for (const id of ids) delete next[id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete submissions.");
    } finally {
      setActionBusy(null);
    }
  }

  return (
    <>
      <Seo title="Admin | Real Israel" description="Submissions inbox." />

      <Section>
        <Container className="py-14 sm:py-18">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionHeader
              eyebrow="Admin"
              title="Submissions"
              description="Contact and briefing PDF requests."
            />

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                className="h-9 px-3 text-xs"
                onClick={() => load(1)}
                disabled={!authed || loading}
                aria-busy={loading}
              >
                {loading ? "Loading…" : "Refresh"}
              </Button>
              <Button
                variant="secondary"
                className="h-9 px-3 text-xs"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>

          {error ? (
            <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          ) : null}

          <div className="mt-8">
            <Card className="border-border/70 bg-card/60">
              <CardContent className="p-6 sm:p-8">
                {items.length === 0 ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground">No submissions loaded.</p>
                    <p className="text-xs text-muted-foreground">
                      Use “Refresh” to fetch the inbox.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Tools */}
                    <div className="rounded-2xl border border-border/70 bg-background/30 p-4">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <p className="text-sm text-muted-foreground">
                          {total} total · {unreadCount} unread
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <div className="relative w-full sm:w-[260px]">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search this page"
                              className="h-9 pl-9"
                            />
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              type="button"
                              variant={statusFilter === "all" ? "default" : "secondary"}
                              className="h-9 px-3 text-xs"
                              onClick={() => {
                                setStatusFilter("all");
                                load(1);
                              }}
                              disabled={loading}
                            >
                              All
                            </Button>
                            <Button
                              type="button"
                              variant={statusFilter === "unread" ? "default" : "secondary"}
                              className="h-9 px-3 text-xs"
                              onClick={() => {
                                setStatusFilter("unread");
                                load(1);
                              }}
                              disabled={loading}
                            >
                              Unread
                            </Button>
                            <Button
                              type="button"
                              variant={statusFilter === "read" ? "default" : "secondary"}
                              className="h-9 px-3 text-xs"
                              onClick={() => {
                                setStatusFilter("read");
                                load(1);
                              }}
                              disabled={loading}
                            >
                              Read
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {selectedCount > 0 ? (
                            <p className="text-xs text-muted-foreground">{selectedCount} selected</p>
                          ) : (
                            <p className="text-xs text-muted-foreground">Select items to apply actions</p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            className="h-9 px-3 text-xs"
                            onClick={() => markRead(selectedIds)}
                            disabled={selectedCount === 0 || actionBusy !== null}
                            aria-busy={actionBusy === "mark-read"}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark read
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            className="h-9 px-3 text-xs"
                            onClick={() => deleteItems(selectedIds)}
                            disabled={selectedCount === 0 || actionBusy !== null}
                            aria-busy={actionBusy === "delete"}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>

                          <Button
                            type="button"
                            variant="secondary"
                            className="h-9 px-3 text-xs"
                            onClick={() => {
                              const rows = buildExportRows(selectedReadItems);
                              downloadCsv(
                                `submissions-read-selected-${new Date().toISOString().slice(0, 10)}.csv`,
                                rows,
                              );
                            }}
                            disabled={!canExportSelectedRead}
                            title="Select 2+ read submissions to export"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            CSV (read)
                          </Button>

                          <Button
                            type="button"
                            variant="secondary"
                            className="h-9 px-3 text-xs"
                            onClick={() => {
                              const rows = buildExportRows(selectedReadItems);
                              downloadXlsx(
                                `submissions-read-selected-${new Date().toISOString().slice(0, 10)}.xlsx`,
                                rows,
                              );
                            }}
                            disabled={!canExportSelectedRead}
                            title="Select 2+ read submissions to export"
                          >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Excel (read)
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          Page {page} of {pageCount}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="h-9 w-9 rounded-lg"
                            onClick={() => load(page - 1)}
                            disabled={!canPrev || loading}
                            aria-label="Previous page"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="h-9 w-9 rounded-lg"
                            onClick={() => load(page + 1)}
                            disabled={!canNext || loading}
                            aria-label="Next page"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop list */}
                    <div className="hidden overflow-hidden rounded-2xl border border-border/70 md:block">
                      <div className="grid grid-cols-[40px_120px_1fr_110px_156px] gap-3 border-b border-border/70 bg-background/30 px-4 py-3 text-xs text-muted-foreground">
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={headerCheckboxState as any}
                            onCheckedChange={(v) => toggleAll(Boolean(v))}
                            aria-label="Select all"
                          />
                        </div>
                        <div>Date</div>
                        <div>Submission</div>
                        <div>Status</div>
                        <div className="text-right">Actions</div>
                      </div>

                      <div className="divide-y divide-border/70">
                        {filteredItems.map((s) => {
                          const checked = Boolean(selected[s.id]);
                          const isUnread = !s.read_at;
                          const preview = s.message
                            ? s.message.length > 180
                              ? `${s.message.slice(0, 180)}…`
                              : s.message
                            : "";

                          const emailSubject = encodeURIComponent(
                            s.subject || `Re: ${s.source} — Real Israel`,
                          );
                          const emailBody = encodeURIComponent(
                            `Hi${s.name ? ` ${s.name}` : ""},\n\nThanks for reaching out.\n\n— Real Israel\n\n---\nSubmitted: ${new Date(
                              s.created_at,
                            ).toLocaleString()}\nSource: ${s.source}\nPage: ${s.page_path ?? ""}\n\nMessage:\n${s.message ?? ""}\n`,
                          );
                          const mailto = `mailto:${encodeURIComponent(
                            s.email,
                          )}?subject=${emailSubject}&body=${emailBody}`;

                          return (
                            <div
                              key={s.id}
                              className={
                                "grid grid-cols-[40px_120px_1fr_110px_150px] gap-3 px-4 py-4 " +
                                (isUnread ? "bg-background/40" : "bg-background/20")
                              }
                            >
                              <div className="flex items-start justify-center pt-1">
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(v) => toggleOne(s.id, Boolean(v))}
                                  aria-label={`Select submission ${s.id}`}
                                />
                              </div>

                              <div className="text-xs text-muted-foreground">
                                <p className="text-foreground/90">
                                  {new Date(s.created_at).toLocaleDateString()}
                                </p>
                                <p className="mt-1">{new Date(s.created_at).toLocaleTimeString()}</p>
                              </div>

                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-medium text-foreground">
                                    {s.email}
                                    {s.name ? (
                                      <span className="text-muted-foreground"> · {s.name}</span>
                                    ) : null}
                                  </p>
                                  <span className="rounded-full border border-border/70 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                                    {s.source}
                                  </span>
                                </div>

                                {s.subject ? (
                                  <p className="mt-1 text-xs text-muted-foreground">{s.subject}</p>
                                ) : null}

                                {preview ? (
                                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    {preview}
                                  </p>
                                ) : null}

                                <p className="mt-3 text-xs text-muted-foreground">
                                  {[
                                    s.phone ? `Phone: ${s.phone}` : null,
                                    s.location ? `Location: ${s.location}` : null,
                                    s.timeline ? `Timeline: ${s.timeline}` : null,
                                    s.page_path ? `Page: ${s.page_path}` : null,
                                  ]
                                    .filter(Boolean)
                                    .join(" · ")}
                                </p>
                              </div>

                              <div>
                                <span
                                  className={
                                    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] " +
                                    (isUnread
                                      ? "border border-primary/30 bg-primary/10 text-foreground"
                                      : "border border-border/70 bg-background/40 text-muted-foreground")
                                  }
                                >
                                  {isUnread ? "Unread" : "Read"}
                                </span>
                              </div>

                              <div className="flex items-start justify-end gap-2">
                                <Button asChild size="icon" variant="secondary" className="h-9 w-9 rounded-lg" aria-label="Email">
                                  <a href={mailto}>
                                    <Mail className="h-4 w-4" />
                                  </a>
                                </Button>

                                {isUnread ? (
                                  <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-9 w-9 rounded-lg"
                                    onClick={() => markRead([s.id])}
                                    disabled={actionBusy !== null}
                                    aria-label="Mark read"
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                ) : null}

                                <Button
                                  size="icon"
                                  variant="secondary"
                                  className="h-9 w-9 rounded-lg"
                                  onClick={() => deleteItems([s.id])}
                                  disabled={actionBusy !== null}
                                  aria-label="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Mobile list */}
                    <div className="grid gap-3 md:hidden">
                      {filteredItems.map((s) => {
                        const checked = Boolean(selected[s.id]);
                        const isUnread = !s.read_at;
                        const emailSubject = encodeURIComponent(
                          s.subject || `Re: ${s.source} — Real Israel`,
                        );
                        const emailBody = encodeURIComponent(
                          `Hi${s.name ? ` ${s.name}` : ""},\n\nThanks for reaching out.\n\n— Real Israel\n\n---\nSubmitted: ${new Date(
                            s.created_at,
                          ).toLocaleString()}\nSource: ${s.source}\nPage: ${s.page_path ?? ""}\n\nMessage:\n${s.message ?? ""}\n`,
                        );
                        const mailto = `mailto:${encodeURIComponent(
                          s.email,
                        )}?subject=${emailSubject}&body=${emailBody}`;

                        return (
                          <div
                            key={s.id}
                            className={
                              "rounded-2xl border border-border/70 p-4 " +
                              (isUnread ? "bg-background/40" : "bg-background/20")
                            }
                          >
                            <div className="flex items-start gap-3">
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(v) => toggleOne(s.id, Boolean(v))}
                                aria-label="Select"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="truncate text-sm font-medium text-foreground">
                                    {s.email}
                                  </p>
                                  <span className="rounded-full border border-border/70 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                                    {s.source}
                                  </span>
                                  <span
                                    className={
                                      "rounded-full px-2 py-0.5 text-[11px] " +
                                      (isUnread
                                        ? "border border-primary/30 bg-primary/10 text-foreground"
                                        : "border border-border/70 bg-background/40 text-muted-foreground")
                                    }
                                  >
                                    {isUnread ? "Unread" : "Read"}
                                  </span>
                                </div>
                                {s.name ? (
                                  <p className="mt-1 text-xs text-muted-foreground">{s.name}</p>
                                ) : null}
                                {s.subject ? (
                                  <p className="mt-2 text-xs text-muted-foreground">{s.subject}</p>
                                ) : null}
                                {s.message ? (
                                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                                    {s.message.length > 220 ? `${s.message.slice(0, 220)}…` : s.message}
                                  </p>
                                ) : null}
                                <p className="mt-3 text-xs text-muted-foreground">
                                  {new Date(s.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-end gap-2">
                              <Button
                                asChild
                                variant="secondary"
                                size="icon"
                                className="h-9 w-9 rounded-lg"
                                aria-label="Email"
                              >
                                <a href={mailto}>
                                  <Mail className="h-4 w-4" />
                                </a>
                              </Button>

                              {isUnread ? (
                                <Button
                                  variant="secondary"
                                  size="icon"
                                  className="h-9 w-9 rounded-lg"
                                  onClick={() => markRead([s.id])}
                                  disabled={actionBusy !== null}
                                  aria-label="Mark read"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                              ) : null}

                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-9 w-9 rounded-lg"
                                onClick={() => deleteItems([s.id])}
                                disabled={actionBusy !== null}
                                aria-label="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
