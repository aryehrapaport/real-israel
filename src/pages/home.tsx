import { ArrowRight, Eye, Hand, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ComparisonBlock } from "@/components/comparison-block";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HomePage() {
  return (
    <>
      <Seo
        title="Your Eyes and Hands on the Ground in Israel"
        description="A discreet presence-based coordination service in Israel for international buyers, renovators, and builders who can’t be onsite." 
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-muted/35 to-transparent" />
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">Presence. Coordination. Prevention.</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Your Eyes and Hands on the Ground in Israel
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              When you can’t be present, small uncertainties become expensive. We act as your local
              eyes, ears, and hands—coordinating details, verifying reality, and reducing avoidable
              risk.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="group">
                <Link to="/contact">
                  Request a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/why-presence">Why presence matters</Link>
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Not a real estate website. Not a construction company. A presence-first coordination
              service aligned to the client.
            </p>
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

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[{
              icon: Eye,
              title: "Visibility",
              body: "You receive grounded updates—not interpretations.",
            },{
              icon: Hand,
              title: "Follow-through",
              body: "Commitments become actions, tracked to completion.",
            },{
              icon: ShieldCheck,
              title: "Risk reduction",
              body: "Small issues get contained before they compound.",
            }].map((item) => (
              <Card key={item.title} className="border-border/70">
                <CardContent className="p-6">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <p className="mt-4 text-sm font-medium">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why local presence matters"
            title="With oversight, the project stays honest"
            description="Presence isn’t a checklist. It’s the difference between ‘we think’ and ‘we know.’" 
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
            eyebrow="What makes us different"
            title="Neutral, client-aligned coordination"
            description="We’re not selling a property, and we’re not selling a build. Our work is to protect decisions, timelines, and expectations—with calm, professional documentation." 
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card className="border-border/70">
              <CardContent className="p-6">
                <p className="text-sm font-medium">Independent presence</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  We verify reality on site and translate it into clear, actionable reporting.
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/70">
              <CardContent className="p-6">
                <p className="text-sm font-medium">Quiet accountability</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Vendors and contractors work best when someone competent is paying attention.
                </p>
              </CardContent>
            </Card>
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

      <Section className="py-16">
        <Container>
          <div className="rounded-2xl border border-border/70 bg-card p-7 md:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-medium">A quiet next step</p>
              <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                If you want fewer surprises, start with a short call.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                We’ll ask a few focused questions and explain how presence-based coordination would
                fit your situation.
              </p>
              <div className="mt-7">
                <Button asChild>
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
