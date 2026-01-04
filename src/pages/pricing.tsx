import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";

export function PricingPage() {
  return (
    <>
      <Seo
        title="Real Israel | Pricing"
        description="Retainer based engagement for presence and coordination in Israel. Designed for ongoing oversight and clear reporting." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Pricing & engagement"
            title="Professional engagement, billed monthly"
            description="Coordination is most valuable when it’s consistent. The model is a monthly retainer with a minimum commitment, sized to your project’s intensity." 
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card className="border-border/70 md:col-span-2">
              <CardContent className="p-6">
                <p className="text-sm font-medium">Monthly retainer</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Covers ongoing presence, coordination, documentation, and a predictable cadence of updates.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm font-medium">Minimum commitment</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Ensures enough continuity to reduce drift and maintain accountability.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm font-medium">Appropriate scope</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Light touch oversight looks different than an active renovation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardContent className="p-6">
                <p className="text-sm font-medium">Add ons</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  One time site visits, special reporting, or time intensive coordination can be scoped as add ons.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            Retainers are not about “hours”. They’re about reliably being available, present, and accountable across a moving timeline.
          </p>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Next step"
            title="We’ll quote after a short consultation"
            description="We’ll confirm what you need, the project stage, and the expected cadence. Then we’ll propose a retainer that fits." 
          />
        </Container>
      </Section>
    </>
  );
}
