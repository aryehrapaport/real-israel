import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";

export function ScopePage() {
  return (
    <>
      <Seo
        title="Scope — Real Israel"
        description="Clear expectations: what this presence-based coordination service is—and what it is not." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Scope"
            title="Firm clarity, designed to protect everyone"
            description="This page is intentionally direct. It prevents misunderstandings and keeps engagements professional." 
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border/70 bg-card p-6">
              <p className="text-sm font-semibold">What we are</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>Local presence for observation, follow-through, and verification.</li>
                <li>Client-aligned coordination across vendors and timelines.</li>
                <li>Structured reporting: what changed, what it means, what’s next.</li>
                <li>A calm point of accountability when you’re not onsite.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border/70 bg-card p-6">
              <p className="text-sm font-semibold">What we are not</p>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>A real estate brokerage or listing platform.</li>
                <li>A general contractor, architect, engineer, or licensed inspector.</li>
                <li>A guarantor of workmanship, timelines, or third-party performance.</li>
                <li>A replacement for legal, structural, or permitting professionals.</li>
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            We can be present, document, and coordinate. We do not claim authority we don’t have.
            This is part of how we keep the service high-trust.
          </p>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Reassurance"
            title="Professional boundaries are a feature"
            description="Clear scope reduces risk. You’ll always know what we will do, what we won’t, and what requires a licensed expert." 
          />
        </Container>
      </Section>
    </>
  );
}
