import { Seo } from "@/components/seo";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Target, Hand } from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import { Button } from "@/components/ui/button";
import { Container, Divider, Section } from "@/components/section";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About — Real Israel"
        description="A presence-based coordination service in Israel built for international clients who value discretion, neutrality, and clear reporting." 
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-muted/45 to-transparent" />
        <Container className="py-14 sm:py-18 lg:py-24">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium tracking-wide text-muted-foreground">About</p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                Presence-based coordination for international clients
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
                We support overseas buyers, families, and investors by being physically present when
                you can’t be—so decisions stay grounded in reality.
              </p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Our role is simple: represent your interests on the ground—without competing agendas.
                We coordinate, observe, document, and follow through.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild variant="premium" size="lg">
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/why-presence">Why presence matters</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <HeroVisual
                src="https://images.pexels.com/photos/1659291/pexels-photo-1659291.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                alt="Stone street in Jerusalem"
                className="aspect-[4/3] w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Mission
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Reduce avoidable risk through presence
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Distance creates gaps. Our work is to close them—through direct observation, structured
              communication, and consistent accountability.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-center text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              We’ll also keep you updated and give you access to:
            </h3>

            <div className="mt-12 grid gap-y-12 gap-x-10 md:grid-cols-2">
              {[
                {
                  icon: ShieldCheck,
                  title: "Neutrality",
                  body: "Client-aligned oversight. No commissions, no competing agenda.",
                },
                {
                  icon: Target,
                  title: "Clarity",
                  body: "Reality on the ground—translated into decisions you can make remotely.",
                },
                {
                  icon: Hand,
                  title: "Follow-through",
                  body: "Commitments become actions, tracked to completion.",
                },
                {
                  icon: Sparkles,
                  title: "Discretion",
                  body: "Calm communication and professional boundaries. No noise.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/60">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em]">
                    <span className="border-b border-foreground/25 pb-1">{item.title}</span>
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
