import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About — Real Israel"
        description="A presence-based coordination service in Israel built for international clients who value discretion, neutrality, and clear reporting." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="About"
            title="Presence-based coordination for international clients"
            description="We support overseas buyers, families, and investors by being physically present when they can’t be—so decisions stay grounded in reality." 
          />

          <div className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Our role is simple: represent your interests on the ground—without competing agendas.
              We coordinate, observe, document, and follow through.
            </p>
            <p>
              The tone is calm by design. Projects already have enough moving parts. You get clear
              updates and clean next steps, not noise.
            </p>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Mission"
            title="Reduce avoidable risk through presence"
            description="Distance creates gaps. Our work is to close them—through direct observation, structured communication, and consistent accountability." 
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-card p-6">
              <p className="text-sm font-medium">Neutrality</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We are client-aligned. We don’t earn commissions on deals or contractor work.
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card p-6">
              <p className="text-sm font-medium">Clarity</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We translate on-the-ground reality into decisions you can confidently make remotely.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
