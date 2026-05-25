import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { Container, Divider, Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/contact-section";

const servicesIncluded = [
  {
    title: "Purchasing & Negotiating",
    items: ["Lawyers & accountants coordination", "Payment structure alignment", "Israeli tax payment oversight"],
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Signing documents",
  },
  {
    title: "Oversight & Coordination",
    items: [
      "Building requirements compliance",
      "Inspector timeline alignment",
      "Weekly detailed photographic updates",
      "Neutral status reporting",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Project planning documents",
  },
  {
    title: "Delivery & Placement",
    items: ["Receipt & inspection of furniture", "Electrical & utility installation oversight"],
    imageSrc:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Delivery boxes",
  },
] as const;

const whyChooseUs = [
  "Critical details get lost across time zones and language barriers.",
  "Without local presence, it is challenging to verify who is reliable, available, and fairly priced.",
  "Quotes are hard to evaluate remotely, leading to scope creep or inflated costs.",
  "From abroad, confirming that milestones are truly met before releasing funds is highly risky.",
  "Without eyes on site, small mistakes stay hidden until they become incredibly expensive to fix.",
] as const;

export function HomePageEditorial() {
  const heroContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <>
      <Seo
        title="BridgePoint Israel | Presence & Coordination"
        description="A discreet presence based coordination service in Israel for international buyers, renovators, and builders who cannot be on site."
      />

      {/* Editorial Hero Section */}
      <section id="home" className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-muted/30 to-transparent" />
        
        <Container>
          <motion.div
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={heroItem}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
            >
              Exclusive On-Ground Representation
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="mt-6 text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-foreground font-serif"
            >
              Your eyes and hands on the ground in Israel
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Building or purchasing a home from abroad can be complex and risky. BridgePoint is your local, client-aligned partner—ensuring your interest is protected with direct oversight, clear reporting, and complete transparency.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Button asChild size="lg" className="px-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium">
                <Link to="/editorial#contact">
                  Request a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 rounded-full border-border/85 hover:bg-muted/10 font-medium">
                <Link to="/editorial#problem">Beware of Costly Mistakes</Link>
              </Button>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mt-12 w-full max-w-5xl"
            >
              <div className="relative group overflow-hidden rounded-2xl border border-border/70 p-2 bg-card/40 backdrop-blur shadow-xl shadow-black/5">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <img
                    src="https://images.pexels.com/photos/2087392/pexels-photo-2087392.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                    alt="Jerusalem cityscape"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-left rounded-xl border border-border/60 bg-background/75 px-4 py-3 backdrop-blur-sm shadow-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Calm, Professional Oversight
                    </p>
                    <p className="mt-1 text-xs text-foreground font-medium">
                      Direct, clear coordination tailored entirely to you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <Divider />

      {/* Redesigned Asymmetric Problem Section */}
      <div id="problem">
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  The Challenge of Distance
                </p>
                <h2 className="mt-4 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl font-serif">
                  Your dream home shouldn’t become a long-distance headache.
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  The biggest risks are not dramatic. They are small gaps that compound: unverified assumptions, communication friction, and local standards that differ from your expectations.
                </p>
                <div className="mt-8">
                  <Button asChild className="rounded-full bg-primary hover:bg-primary/90">
                    <Link to="/editorial#contact">Talk to us</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {[
                  {
                    num: "I",
                    title: "Distance and translation friction",
                    body: "Critical details and specific design nuances easily get lost across remote time zones and language barriers.",
                  },
                  {
                    num: "II",
                    title: "Supplier & standard differences",
                    body: "What is considered typical or standard locally may be completely different from your expectations and requirements.",
                  },
                  {
                    num: "III",
                    title: "Limited local oversight & reviews",
                    body: "Without structured local presence, project details stay unverified, and errors compound until they are incredibly costly to resolve.",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="flex gap-6 rounded-2xl border border-border/60 bg-card/50 p-6 sm:p-8 backdrop-blur shadow-sm hover:border-primary/30 transition-all duration-300"
                  >
                    <span className="text-3xl font-light text-primary/60 font-serif leading-none shrink-0 w-8">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium text-foreground sm:text-xl font-serif">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Divider />

      {/* Redesigned Why Choose Us Section */}
      <div id="why-us">
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative group overflow-hidden rounded-2xl border border-border/70 p-2 bg-card/40 shadow-lg">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop"
                      alt="On site coordination"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8 md:p-10 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Client Aligned Oversight
                  </p>
                  <h2 className="mt-4 text-3xl font-normal leading-tight text-foreground sm:text-4xl font-serif">
                    Why choose BridgePoint
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    We act strictly as your representatives, without competing commissions or contractor alliances. We observe, coordinate, and deliver completely honest, transparent status.
                  </p>

                  <div className="mt-8 space-y-4">
                    {whyChooseUs.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                          <ShieldCheck className="h-3 w-3 text-primary" />
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-4 items-center">
                    <Button asChild className="rounded-full bg-primary hover:bg-primary/90 px-6">
                      <Link to="/editorial#contact">Request a consultation</Link>
                    </Button>
                    <Button asChild variant="ghost" className="rounded-full text-primary hover:text-primary/80">
                      <Link to="/editorial#contact">Send a message →</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>

      <Divider />

      {/* Redesigned Services Included Section (Portfolio Editorial Grid) */}
      <div id="services">
        <Section>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                A Predictable Scope
              </p>
              <h2 className="mt-4 text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl font-serif">
                Services included
              </h2>
              <p className="mt-4 text-base text-muted-foreground">
                We represent your interests across each core phase of purchasing and coordinating your apartment build from abroad.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {servicesIncluded.map((block) => (
                <div
                  key={block.title}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted/20">
                      <img
                        src={block.imageSrc}
                        alt={block.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                    </div>

                    <div className="p-6 sm:p-8">
                      <h3 className="text-xl font-normal tracking-tight text-foreground font-serif">
                        {block.title}
                      </h3>
                      <div className="mt-4 h-[1px] w-full bg-border/80" />
                      <ul className="mt-5 space-y-3">
                        {block.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild className="rounded-full bg-primary hover:bg-primary/90 px-8">
                <Link to="/editorial#contact">Get a suggested scope</Link>
              </Button>
            </div>
          </Container>
        </Section>
      </div>

      <Divider />

      {/* Beautiful Editorial Contact Form */}
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
