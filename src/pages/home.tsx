import { ArrowRight, Eye, Hand, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroVisual } from "@/components/hero-visual";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <>
      <Seo
        title="Your Eyes and Hands on the Ground in Israel"
        description="A discreet presence-based coordination service in Israel for international buyers, renovators, and builders who can’t be onsite." 
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-muted/45 to-transparent" />
        <Container className="py-14 sm:py-18 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                Presence. Coordination. Prevention.
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Your Eyes and Hands on the Ground in Israel
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                When you can’t be present, small uncertainties become expensive. We act as your local
                eyes, ears, and hands—coordinating details, verifying reality, and reducing avoidable
                risk.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="premium" size="lg" className="group">
                  <Link to="/contact">
                    Request a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/why-presence">Why presence matters</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroVisual
                src="https://images.pexels.com/photos/2087392/pexels-photo-2087392.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                alt="Jerusalem cityscape"
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
            eyebrow="The problem of distance"
            title="When you’re far away, clarity is fragile"
            description="Projects don’t fail from one big mistake. They drift—through assumptions, delays, and missing context. Presence is how we keep reality close." 
          />

          <div className="mt-10 space-y-10">
            {[
              {
                icon: Eye,
                title: "Visibility",
                body: "You receive grounded updates—not interpretations.",
                imageSrc: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Engineers reviewing plans",
              },
              {
                icon: Hand,
                title: "Follow-through",
                body: "Commitments become actions, tracked to completion.",
                imageSrc: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Team working on plans",
              },
              {
                icon: ShieldCheck,
                title: "Risk reduction",
                body: "Small issues get contained before they compound.",
                imageSrc: "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Building under construction",
              },
            ].map((item, idx) => {
              const isReversed = idx % 2 === 1;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-7"
                >
                  <div className="grid items-center gap-8 lg:grid-cols-12">
                    <div
                      className={
                        isReversed
                          ? "lg:col-span-5 lg:order-2"
                          : "lg:col-span-5"
                      }
                    >
                      <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1">
                        <item.icon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                          {item.title.toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
                        {item.title}
                      </p>
                      <div className="mt-5 h-px w-full bg-border/70" />
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.body}
                      </p>
                    </div>

                    <div
                      className={
                        isReversed
                          ? "lg:col-span-7 lg:order-1"
                          : "lg:col-span-7"
                      }
                    >
                      <HeroVisual
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="aspect-[16/10] w-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="How presence works"
            title="A simple process, repeated consistently"
            description="Routine, documentation, and follow-through—without drama." 
          />

          <div className="mt-12 rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Timeline
                </p>
                <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  Three steps. One calm cadence.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  You always know what changed, what it means, and what’s next.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ol className="relative space-y-10">
                  <div className="pointer-events-none absolute left-[18px] top-2 h-[calc(100%-8px)] w-px bg-border/80" />
                  {[
                    {
                      n: "01",
                      title: "We align on what matters",
                      body: "Your priorities, risk tolerance, and the decisions you want protected.",
                    },
                    {
                      n: "02",
                      title: "We observe and verify",
                      body: "On-the-ground checks that turn assumptions into clarity.",
                    },
                    {
                      n: "03",
                      title: "We document and follow through",
                      body: "A calm cadence of updates and next steps—tracked to completion.",
                    },
                  ].map((step) => (
                    <li key={step.n} className="relative pl-14">
                      <div className="absolute left-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/70">
                        <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                          {step.n}
                        </span>
                      </div>
                      <p className="text-lg font-semibold leading-tight tracking-tight sm:text-xl">
                        {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>
                      <div className="mt-6 h-px w-full bg-border/60" />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Premium coordination philosophy"
            title="Less noise. More certainty."
            description="We focus on preventing the avoidable: unclear scope, missed decisions, misunderstood instructions, and last-minute surprises." 
          />

          <div className="mt-10 rounded-xl border border-border/70 bg-muted/20 p-6 md:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              You shouldn’t have to micromanage a project across time zones. We keep a clean
              cadence: what changed, what it means, what’s next, and what requires your decision.
            </p>
          </div>

          <div className="mt-10 flex">
            <Button asChild variant="outline">
              <Link to="/services">Explore services</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Divider />
    </>
  );
}
