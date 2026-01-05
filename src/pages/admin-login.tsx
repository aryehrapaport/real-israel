import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Seo } from "@/components/seo";
import { Container, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") ?? "");
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => token.trim().length > 10, [token]);

  useEffect(() => {
    const existing = localStorage.getItem("admin_token");
    if (existing && existing.trim().length > 10) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("reason") === "unauthorized") {
      setError("Session expired or token is invalid. Please sign in again.");
    }
  }, [location.search]);

  return (
    <>
      <Seo title="Admin Login | Real Israel" description="Sign in to the admin inbox." />

      <Section>
        <Container className="py-14 sm:py-18">
          <SectionHeader
            eyebrow="Admin"
            title="Sign in"
            description="Enter your admin token to access the submissions inbox."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Card className="border-border/70 bg-card/60">
                <CardContent className="space-y-4 p-6 sm:p-8">
                  {error ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Admin token</p>
                    <Input
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      type="password"
                      placeholder="Paste ADMIN_TOKEN"
                      autoComplete="off"
                      spellCheck={false}
                      className="h-10"
                    />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Stored in this browser only. Keep it private.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      className="h-9 px-3 text-xs"
                      onClick={() => {
                        localStorage.removeItem("admin_token");
                        setToken("");
                        setError(null);
                      }}
                    >
                      Clear
                    </Button>

                    <Button
                      className="h-9 px-3 text-xs"
                      disabled={!canSubmit}
                      onClick={() => {
                        localStorage.setItem("admin_token", token);
                        navigate("/admin", { replace: true });
                      }}
                    >
                      Sign in
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-8">
                <p className="text-sm font-medium">Tip</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  If you don’t have the token, create or update it in Cloudflare Pages:
                  Settings → Environment variables → Secrets → <span className="font-medium text-foreground">ADMIN_TOKEN</span>.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
