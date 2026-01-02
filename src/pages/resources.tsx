import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const gateSchema = z.object({
  email: z.string().email(),
  newsletterOptIn: z.boolean().optional(),
});

const PDF_PATH = "/resources/what-international-buyers-miss.pdf";

export function ResourcesPage() {
  const [email, setEmail] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const downloadName = useMemo(
    () => "What International Buyers Miss When They’re Not on the Ground in Israel.pdf",
    [],
  );

  return (
    <>
      <Seo
        title="Resources — Real Israel"
        description="A short PDF briefing for international buyers and families: what gets missed when no one is on the ground in Israel." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="A short briefing for international buyers"
            description="One practical PDF—designed to help you spot preventable risk before it becomes costly." 
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-border/70">
              <CardContent className="p-6">
                <p className="text-sm font-medium">
                  What International Buyers Miss When They’re Not on the Ground in Israel
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A concise checklist of the small, common misses that create disproportionate friction.
                </p>

                <div className="mt-6">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="group">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Before you download</DialogTitle>
                        <DialogDescription>
                          We’ll email you the download link if needed later. No spam.
                        </DialogDescription>
                      </DialogHeader>

                      <form
                        className="space-y-4"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const result = gateSchema.safeParse({ email, newsletterOptIn });
                          if (!result.success) {
                            setError("Please enter a valid email.");
                            return;
                          }

                          setError(null);

                          const a = document.createElement("a");
                          a.href = PDF_PATH;
                          a.download = downloadName;
                          document.body.appendChild(a);
                          a.click();
                          a.remove();

                          setOpen(false);
                        }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="gate-email">Email</Label>
                          <Input
                            id="gate-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                          />
                          {error ? <p className="text-xs text-destructive">{error}</p> : null}
                        </div>

                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="newsletter-opt-in"
                            checked={newsletterOptIn}
                            onCheckedChange={(v) => setNewsletterOptIn(Boolean(v))}
                          />
                          <Label htmlFor="newsletter-opt-in" className="text-sm text-muted-foreground">
                            Optional: subscribe to occasional, low-frequency updates.
                          </Label>
                        </div>

                        <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
                          <p className="text-xs text-muted-foreground">
                            Privacy reassurance: we don’t sell emails, and we don’t share client lists.
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Download</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  This PDF is a starting point—not legal or engineering advice.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <NewsletterSignup />
              <div className="rounded-xl border border-border/70 bg-card p-5">
                <p className="text-sm font-medium">Prefer a private conversation?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  If you’re already mid-process, a short call can clarify what presence would change.
                </p>
                <div className="mt-4">
                  <Button asChild variant="secondary">
                      <Link to="/contact">Request a Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Quality"
            title="Lead magnet, kept calm"
            description="The goal is to help qualified clients make better decisions—not to flood your inbox." 
          />
        </Container>
      </Section>
    </>
  );
}
