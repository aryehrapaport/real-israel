import { ComparisonBlock } from "@/components/comparison-block";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";

export function WhyPresencePage() {
  return (
    <>
      <Seo
        title="Why Presence Matters — Real Israel"
        description="Presence prevents drift: miscommunication, delays, and avoidable cost when projects are managed remotely." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why presence matters"
            title="Presence sells the idea, not the tasks"
            description="A site visit is not the point. The point is what changes when someone competent is there consistently: clarity, accountability, and earlier detection." 
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Miscommunication",
                body: "A detail can be ‘understood’ and still be wrong when no one verifies it.",
              },
              {
                title: "Delays",
                body: "When no one is onsite, small blockers linger between messages and time zones.",
              },
              {
                title: "Compounding cost",
                body: "Prevention is often cheaper than correction—even when everything is ‘fine’.",
              },
            ].map((s) => (
              <div key={s.title} className="rounded-xl border border-border/70 bg-card p-6">
                <p className="text-sm font-medium">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Comparison"
            title="With on-the-ground presence vs without it"
            description="The service is designed to reduce uncertainty—not to replace the professionals doing the work." 
          />
          <div className="mt-10">
            <ComparisonBlock />
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Cost vs prevention"
            title="A monthly retainer is often less than one avoidable surprise"
            description="We don’t promise perfection. We reduce the likelihood and impact of preventable errors by being present, consistent, and documented." 
          />
        </Container>
      </Section>
    </>
  );
}
