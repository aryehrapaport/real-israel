import { Link } from "react-router-dom";
import { Container, Divider, Section } from "@/components/section";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <Section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Discreet, presence-based coordination in Israel for international clients.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                This is an advisory and coordination service—not a brokerage and not a contractor.
              </p>
            </div>

            <div className="flex items-center justify-start gap-3 md:justify-end">
              <Button asChild variant="secondary">
                <Link to="/resources">Download the briefing PDF</Link>
              </Button>
              <Button asChild>
                <Link to="/contact">Request a Consultation</Link>
              </Button>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Real Israel</p>
            <p>Privacy-first communication. No spam. No public client list.</p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
