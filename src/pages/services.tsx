import { ChevronRight } from "lucide-react";
import { Seo } from "@/components/seo";
import { Container, Section, SectionHeader } from "@/components/section";

const services = [
  {
    title: "Property search coordination",
    description:
      "Coordinate viewings, gather details, and verify key questions so you’re not deciding off a listing alone.",
    prevents: "Prevents wasted trips, missed details, and decision making from incomplete information.",
    imageSrc: "https://images.pexels.com/photos/2087392/pexels-photo-2087392.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
    imageAlt: "Cityscape",
  },
  {
    title: "Purchase coordination",
    description:
      "Help keep parties aligned across time zones: documents, timelines, and follow up actions, so momentum doesn’t stall.",
    prevents: "Prevents avoidable delays and late surprises during closing.",
    imageSrc: "https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
    imageAlt: "Signing a document",
  },
  {
    title: "Contractor & vendor qualification",
    description:
      "Support due diligence through structured questions, references, and reality checks when possible.",
    prevents: "Prevents misalignment, unclear scope, and avoidable rework.",
    imageSrc: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
    imageAlt: "Construction professionals reviewing plans",
  },
  {
    title: "Project observation & reporting",
    description:
      "On site observation with concise reporting: photos, notes, decisions needed, and what’s next.",
    prevents: "Prevents drift and ‘we thought it was handled’ moments.",
    imageSrc: "https://images.pexels.com/photos/5584052/pexels-photo-5584052.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
    imageAlt: "Architect planning and documentation",
  },
  {
    title: "Logistics & delivery coordination",
    description:
      "Coordinate deliveries, access, and timing so the right items arrive at the right moment.",
    prevents: "Prevents missed deliveries, storage problems, and schedule disruption.",
    imageSrc: "https://images.pexels.com/photos/6407530/pexels-photo-6407530.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
    imageAlt: "Delivery van and packages",
  },
  {
    title: "On site meetings and verification",
    description:
      "Attend key meetings when appropriate and confirm what was agreed, so instructions stay consistent and decisions don’t drift.",
    prevents: "Prevents misalignment between what was discussed and what gets executed.",
    imageSrc: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=1600&fit=crop",
    imageAlt: "Team meeting around plans",
  },
] as const;

export function ServicesPage() {
  return (
    <>
      <Seo
        title="BridgePoint Israel | Services"
        description="Presence based coordination services in Israel: observation, reporting, vendor qualification, logistics, and purchase support." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="Clear scope, no inflated claims"
            description="Each engagement is tailored, but the principle stays the same: reduce risk through presence, coordination, and clear documentation." 
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="overflow-hidden rounded-2xl border border-border/70 bg-card/60"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-muted/20">
                  <img
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1">
                      <span className="text-xs font-medium tracking-[0.18em] text-muted-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {service.title}
                  </h2>
                  <div className="mt-5 h-px w-full bg-border/70" />
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-border/70 bg-background/60 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      What this prevents
                    </p>
                    <div className="mt-2 flex gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{service.prevents}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
