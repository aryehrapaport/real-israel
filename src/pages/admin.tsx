import { useMemo, useState } from "react";
import { Seo } from "@/components/seo";
import { Container, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
};

export function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") ?? "");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);

  const canLoad = useMemo(() => token.trim().length > 10, [token]);

  async function load() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/submissions?limit=150", {
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
      localStorage.setItem("admin_token", token);
    } catch (err) {
      setItems([]);
      setError(err instanceof Error ? err.message : "Could not load submissions.");
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem("admin_token");
    setToken("");
    setItems([]);
    setError(null);
  }

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
                    {items.map((s) => (
                      <div key={s.id} className="rounded-2xl border border-border/70 bg-background/40 p-5">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {s.email}
                              {s.name ? (
                                <span className="text-muted-foreground"> · {s.name}</span>
                              ) : null}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {new Date(s.created_at).toLocaleString()} · {s.source}
                              {s.subject ? <span> · {s.subject}</span> : null}
                            </p>
                          </div>
                        </div>

                        {s.message ? (
                          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                            {s.message}
                          </p>
                        ) : null}

                        <p className="mt-4 text-xs text-muted-foreground">
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
                    ))}
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
