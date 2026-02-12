import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Globe,
  MessageSquare,
  ShieldCheck,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroVisual } from "@/components/hero-visual";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/contact-section";

const servicesIncluded = [
  {
    title: "Purchasing / Negotiating apartment",
    items: ["Lawyers", "Accountants", "Payment coordination", "Israeli tax payments"],
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Signing documents",
  },
  {
    title: "Project Managment & Coordination",
    items: [
      "Building requirements",
      "Inspector reviews",
      "Timeline mapping",
      "Weekly progress reports",
      "Communication",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Project planning documents",
  },
  {
    title: "Delivery & placement",
    items: ["Coordinate receipt of furniture", "Electrical products"],
    imageSrc:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Delivery boxes",
  },
] as const;

const whyChooseUs = [
  "Critical details get lost across time zones and translation.",
  "Without local knowledge, it’s difficult to know who is reliable, available, and fairly priced.",
  "Quotes are hard to compare remotely, leading to higher prices or unclear scopes of work.",
  "From abroad, it’s difficult to confirm that work is completed correctly before releasing funds.",
  "Without someone on site, issues surface late and cost a lot more to fix.",
] as const;

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

  return (
    <>
      <Seo
        title="Your Eyes and Hands on the Ground in Israel"
        description="A discreet presence based coordination service in Israel for international buyers, renovators, and builders who cannot be on site." 
      />

      <section id="home" className="relative overflow-hidden">
        <Container className="py-14 sm:py-18 lg:py-24">
          <motion.div
            className="grid items-start gap-10 lg:grid-cols-12"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <div className="order-2 lg:order-1 lg:col-span-7">
              <motion.h1
                variants={heroItem}
                className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Project management services for real estate in Israel
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Building a home from abroad can be risky, expensive, and frustrating. BridgePoint is
                your local partner, ensuring your home is built according to plan in an efficient,
                transparent, and cost-effective way.
              </motion.p>

              <motion.div
                variants={heroItem}
                className="mt-7"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                  {[
                    { icon: ShieldCheck, label: "Neutral reporting" },
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
                  <Link to="/#contact">
                    Request a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link to="/#problem">Beware of costly mistakes</Link>
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

      <div id="problem">
        <Section>
          <Container>
            <SectionHeader
              eyebrow=""
              title="Your dream home shouldn’t become a long-distance headache."
              description="Avoid the risks of building from abroad."
            />

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
                  <p className="text-lg font-semibold tracking-tight sm:text-xl">
                    Beware of costly mistakes, delays and stress
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The biggest risks are not dramatic. They are small gaps that compound: unclear responsibility,
                    language friction, and assumptions that go unverified.
                  </p>

                  <div className="mt-6 grid gap-4">
                    {[
                      {
                        icon: Globe,
                        title: "Distance and language barriers",
                        body: "Critical details get lost across time zones and translation.",
                      },
                      {
                        icon: ClipboardCheck,
                        title: "Different building standards, suppliers and contractors",
                        body: "What is ‘normal’ locally may differ from your expectations.",
                      },
                      {
                        icon: MessageSquare,
                        title: "Limited local oversight, accountability, miscommunication",
                        body: "Without presence, issues surface late and cost more to fix.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-xl border border-border/70 bg-background/60 p-4"
                      >
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/60">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground sm:text-base">{item.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild variant="premium">
                      <Link to="/#contact">Talk to us</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/#services">See what’s included</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm shadow-black/5">
                  <img
                    src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                    alt="Reviewing plans on site"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="rounded-xl border border-border/60 bg-background/55 px-4 py-3 backdrop-blur-sm">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Reality, documented
                      </p>
                      <p className="mt-1 text-sm text-foreground">Clear status. Clear next steps.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Divider />

      <div id="why-us">
        <Section>
          <Container>
            <SectionHeader
              eyebrow=""
              title="Why Choose Us"
              description="We are your eyes and ears on the ground—representing your interests every step of the way."
            />

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm shadow-black/5">
                  <img
                    src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                    alt="On site coordination"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
                  <p className="text-lg font-semibold tracking-tight sm:text-xl">Your partner on the ground</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    One point of accountability, with local context and clear communication—so decisions stay grounded in reality.
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground sm:text-base">
                    {whyChooseUs.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    That’s why you need a trusted partner on the ground—protecting your interests every step of the way.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild variant="premium">
                      <Link to="/#contact">Request a consultation</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/#contact">Send a message</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Divider />

      <div id="services">
        <Section>
          <Container>
            <SectionHeader
              eyebrow="Services included"
              title="Services Included"
              description="A clear scope covering the core phases of finding, purchasing, and coordinating work on the ground."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {servicesIncluded.map((block) => (
                <div
                  key={block.title}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm shadow-black/5"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
                    <img
                      src={block.imageSrc}
                      alt={block.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="text-xl font-semibold tracking-tight">{block.title}</p>
                    <div className="mt-4 h-px w-full bg-border/70" />
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground sm:text-base">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button asChild variant="premium">
                <Link to="/#contact">Get a suggested scope</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/#why-us">Why choose us</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </div>

      <Divider />

      <div id="contact">
        <ContactSection />
      </div>

      <Divider />
    </>
  );
}
