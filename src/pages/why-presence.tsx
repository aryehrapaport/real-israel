import { ComparisonBlock } from "@/components/comparison-block";
import { HeroVisual } from "@/components/hero-visual";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";

export function WhyPresencePage() {
  return (
    <>
      <Seo
        title="Why Presence Matters — Real Israel"
        description="Presence prevents drift: miscommunication, delays, and avoidable cost when projects are managed remotely." 
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-muted/45 to-transparent" />
        <Container className="py-14 sm:py-18 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">Why presence matters</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Presence sells the idea, not the tasks
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A site visit is not the point. The point is what changes when someone competent is there consistently:
                clarity, accountability, and earlier detection.
              </p>
            </div>
            <div className="lg:col-span-5">
              <HeroVisual
                src="https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                alt="Construction site with cranes"
                className="aspect-[4/3] w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Where distance breaks things"
            title="Distance doesn’t just slow progress. It changes outcomes."
            description="These are the three failure modes we see most often when a project is managed remotely." 
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Miscommunication",
                body: "A detail can be “understood” and still be wrong when no one verifies it. Presence closes the gap between what was said, what was assumed, and what is happening.",
                imageSrc: "https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Engineers reviewing a blueprint",
              },
              {
                n: "02",
                title: "Delays",
                body: "Small blockers linger between messages and time zones. Presence creates forward motion: decisions are clarified earlier, and follow-ups happen before delays become expensive.",
                imageSrc: "https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Construction cranes and progress",
              },
              {
                n: "03",
                title: "Compounding cost",
                body: "Prevention is often cheaper than correction—even when everything looks “fine.” Presence reduces the likelihood and impact of preventable errors by catching them while they’re still small.",
                imageSrc: "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Construction equipment on site",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card/60"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 backdrop-blur">
                    <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">{item.n}</span>
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {item.title}
                  </p>
                  <div className="mt-5 h-px w-full bg-border/70" />
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </div>
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
          <div className="mt-12">
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
