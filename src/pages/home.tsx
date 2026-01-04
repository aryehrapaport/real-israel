import { ArrowRight, Clock, Eye, Hand, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroVisual } from "@/components/hero-visual";
import { ComparisonBlock } from "@/components/comparison-block";
import { MediaFrame } from "@/components/media-frame";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const heroContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const gridContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const gridItem = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <>
      <Seo
        title="Your Eyes and Hands on the Ground in Israel"
        description="A discreet presence based coordination service in Israel for international buyers, renovators, and builders who cannot be on site." 
      />

      <section className="relative overflow-hidden">
        <Container className="py-14 sm:py-18 lg:py-24">
          <motion.div
            className="grid items-start gap-10 lg:grid-cols-12"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <div className="order-2 lg:order-1 lg:col-span-7">
              <motion.div variants={heroItem}>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2">
                  <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                    PRESENCE BASED COORDINATION
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Your Eyes and Hands on the Ground in Israel
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                When you cannot be present, uncertainty gets expensive. We help you stay grounded in
                reality with on the ground checks, clear reporting, and calm follow through.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="mt-7"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                  {[
                    { icon: ShieldCheck, label: "Neutral reporting" },
                    { icon: Eye, label: "Local verification" },
                    { icon: Target, label: "Actionable next steps" },
                  ].map((item) => (
                    <div key={item.label} className="inline-flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/60">
                        <item.icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={heroItem}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button asChild variant="premium" size="lg" className="group">
                  <Link to="/contact">
                    Request a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/why-presence">Why presence matters</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div variants={heroItem} className="order-1 lg:order-2 lg:col-span-5">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <HeroVisual
                  src="https://images.pexels.com/photos/2087392/pexels-photo-2087392.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                  alt="Jerusalem cityscape"
                  className="aspect-[4/3] w-full"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The problem of distance"
            title="When you are far away, clarity gets fragile"
            description="Projects rarely fail from one big mistake. They drift through small misses, unclear ownership, and delayed decisions. Presence keeps reality close." 
          />

          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            variants={gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              {
                icon: Eye,
                title: "Visibility",
                body: "You get concrete status: what changed, what is true, and what is next.",
                imageSrc:
                  "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Engineers reviewing plans",
              },
              {
                icon: Hand,
                title: "Follow through",
                body: "Commitments become tracked actions, not vague reassurance.",
                imageSrc:
                  "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Team working on plans",
              },
              {
                icon: ShieldCheck,
                title: "Risk containment",
                body: "Small issues get contained early before they compound into cost and delay.",
                imageSrc:
                  "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Building under construction",
              },
              {
                icon: Clock,
                title: "Momentum",
                body: "Decisions get unblocked sooner so the timeline keeps moving.",
                imageSrc:
                  "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Team reviewing a schedule",
              },
              {
                icon: Target,
                title: "Scope clarity",
                body: "Everyone stays aligned on what is included, what is pending, and what needs approval.",
                imageSrc:
                  "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Blueprint and measuring tape",
              },
              {
                icon: ShieldCheck,
                title: "Vendor alignment",
                body: "Instructions are confirmed on site so meaning does not drift across time zones.",
                imageSrc:
                  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
                imageAlt: "Team discussion",
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                variants={gridItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 backdrop-blur-sm">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                      {item.title.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-xl font-semibold leading-tight tracking-tight text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="How presence works"
            title="A simple process, repeated consistently"
            description="Routine, documentation, and calm follow through, without drama." 
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <MediaFrame
                title="A calm cadence"
                caption="You always know what changed, what it means, and what needs a decision."
                className="min-h-[320px]"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                    CONSISTENT CADENCE
                  </span>
                </div>

                <div className="mt-8 grid gap-4">
                  {["Photo and notes", "Decision prompts", "Next actions"].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/50 px-3 py-3"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </MediaFrame>
            </div>

            <motion.div
              className="lg:col-span-7"
              variants={gridContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ol className="relative space-y-4 pl-10">
                <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-border/70" />

                {[
                  {
                    n: "01",
                    icon: Target,
                    title: "Align",
                    body: "Agree on priorities, risk tolerance, and the decisions you want protected.",
                    bullets: [
                      "What matters most right now",
                      "What counts as evidence",
                      "What needs approval",
                      "What can wait",
                    ],
                  },
                  {
                    n: "02",
                    icon: Eye,
                    title: "Verify",
                    body: "On the ground checks that turn assumptions into clarity.",
                    bullets: [
                      "Site visit and photos",
                      "Status confirmation",
                      "Questions answered in context",
                      "Issues flagged early",
                    ],
                  },
                  {
                    n: "03",
                    icon: Clock,
                    title: "Decide",
                    body: "Short, structured prompts so decisions happen on time.",
                    bullets: [
                      "Options and tradeoffs",
                      "Cost and schedule impact",
                      "Recommended next action",
                      "Owner assigned",
                    ],
                  },
                  {
                    n: "04",
                    icon: ShieldCheck,
                    title: "Follow through",
                    body: "Actions get tracked to completion and confirmed on site.",
                    bullets: [
                      "Commitments recorded",
                      "Work verified",
                      "Documentation kept current",
                      "Surprises reduced",
                    ],
                  },
                ].map((step) => (
                  <motion.li
                    key={step.n}
                    variants={gridItem}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative"
                  >
                    <div className="absolute left-0 top-7 grid h-8 w-8 place-items-center rounded-full border border-border/70 bg-background/70">
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>

                    <article className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-3">
                          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60">
                            <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                              {step.n}
                            </span>
                          </div>
                          <p className="text-lg font-semibold leading-tight tracking-tight text-foreground">
                            {step.title}
                          </p>
                        </div>

                        <div className="inline-flex items-center rounded-full border border-border/70 bg-background/50 px-3 py-1">
                          <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                            STEP {step.n}
                          </span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>

                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {step.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Premium coordination philosophy"
            title="Less noise. More certainty."
            description="We focus on preventing the avoidable: unclear scope, missed decisions, misunderstood instructions, and late surprises." 
          />

          <div className="mt-10">
            <ComparisonBlock />
          </div>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button asChild variant="outline">
              <Link to="/services">Explore services</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/contact">Start with a message</Link>
            </Button>
          </motion.div>
        </Container>
      </Section>

      <Divider />
    </>
  );
}
