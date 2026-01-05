import { useMemo, useState } from "react";
import { CheckCircle2, Download, Mail, Trash2 } from "lucide-react";
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

export function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") ?? "");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [actionBusy, setActionBusy] = useState<"mark-read" | "delete" | null>(null);

  const canLoad = useMemo(() => token.trim().length > 10, [token]);

  const selectedIds = useMemo(
    () => Object.entries(selected).filter(([, v]) => v).map(([k]) => k),
    [selected],
  );

  const selectedCount = selectedIds.length;
  const allCount = items.length;
  const headerCheckboxState =
    selectedCount === 0 ? false : selectedCount === allCount ? true : "indeterminate";

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/submissions?limit=200", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; items?: Submission[]; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || "Could not load submissions.");
      }

      setItems(data.items ?? []);
      setSelected({});
      localStorage.setItem("admin_token", token);
    } catch (err) {
      setItems([]);
      setSelected({});
      setError(err instanceof Error ? err.message : "Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("admin_token");
    setToken("");
    setItems([]);
    setSelected({});
    setError(null);
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

    if (!response.ok || !data?.ok) {
      throw new Error(data?.error || "Request failed.");
    }
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

  const unreadCount = useMemo(
    () => items.filter((s) => !s.read_at).length,
    [items],
  );

  return (
    <>
      <Seo title="Admin | Real Israel" description="Submissions inbox." />

      <Section>
        <Container className="py-14 sm:py-18">
          <SectionHeader
            eyebrow="Admin"
            title="Submissions"
            description="Contact and briefing PDF requests." 
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[420px_1fr]">
            <Card className="border-border/70 bg-card/60">
              <CardContent className="space-y-4 p-6 sm:p-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Admin token</p>
                  <Input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste ADMIN_TOKEN"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Stored in this browser only. Anyone with the token can view submissions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={load} disabled={!canLoad || loading} aria-busy={loading}>
                    {loading ? "Loading…" : "Load"}
                  </Button>
                  <Button variant="secondary" onClick={signOut}>
                    Sign out
                  </Button>
                </div>

                {error ? (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60">
              <CardContent className="p-6 sm:p-8">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No submissions loaded.</p>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        {items.length} total · {unreadCount} unread
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        {selectedCount > 0 ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                              {selectedCount} selected
                            </p>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => markRead(selectedIds)}
                              disabled={actionBusy !== null}
                              aria-busy={actionBusy === "mark-read"}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Mark read
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => deleteItems(selectedIds)}
                              disabled={actionBusy !== null}
                              aria-busy={actionBusy === "delete"}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        ) : null}

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            const rows = items.map((s) => ({
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
                            downloadCsv(`submissions-${new Date().toISOString().slice(0, 10)}.csv`, rows);
                          }}
                          disabled={items.length === 0}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export CSV
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-border/70">
                      <div className="grid grid-cols-[40px_120px_1fr_110px_150px] gap-3 border-b border-border/70 bg-background/30 px-4 py-3 text-xs text-muted-foreground">
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={headerCheckboxState as any}
                            onCheckedChange={(v) => toggleAll(Boolean(v))}
                            aria-label="Select all"
                          />
                        </div>
                        <div>Date</div>
                        <div>Contact</div>
                        <div>Status</div>
                        <div className="text-right">Actions</div>
                      </div>

                      <div className="divide-y divide-border/70">
                        {items.map((s) => {
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
                                <Button asChild size="sm" variant="secondary">
                                  <a href={mailto}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                  </a>
                                </Button>

                                {isUnread ? (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => markRead([s.id])}
                                    disabled={actionBusy !== null}
                                  >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Read
                                  </Button>
                                ) : null}

                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => deleteItems([s.id])}
                                  disabled={actionBusy !== null}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
