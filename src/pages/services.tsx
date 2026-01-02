import { CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Property search coordination",
    description:
      "Coordinate viewings, gather details, and verify key questions so you’re not deciding off a listing alone.",
    prevents: "Prevents wasted trips, missed details, and decision-making from incomplete information.",
  },
  {
    title: "Purchase coordination",
    description:
      "Help keep parties aligned across time zones—documents, timelines, and follow-ups—so momentum doesn’t stall.",
    prevents: "Prevents avoidable delays and last-minute surprises during closing.",
  },
  {
    title: "Contractor & vendor qualification",
    description:
      "Support due diligence through structured questions, references, and reality checks when possible.",
    prevents: "Prevents misalignment, unclear scope, and avoidable rework.",
  },
  {
    title: "Project observation & reporting",
    description:
      "On-site observation with concise reporting: photos, notes, decisions needed, and what’s next.",
    prevents: "Prevents drift and ‘we thought it was handled’ moments.",
  },
  {
    title: "Logistics & delivery coordination",
    description:
      "Coordinate deliveries, access, and timing so the right items arrive at the right moment.",
    prevents: "Prevents missed deliveries, storage problems, and schedule disruption.",
  },
] as const;

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Services — Real Israel"
        description="Presence-based coordination services in Israel: observation, reporting, vendor qualification, logistics, and purchase support." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="Clear scope, no over-promising"
            description="Each engagement is tailored, but the principle stays the same: reduce risk through presence, coordination, and clear documentation." 
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card key={service.title} className="border-border/70">
                <CardHeader>
                  <CardTitle className="text-base">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">What this prevents:</span> {service.prevents}
                    </p>
                  </div>
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
            eyebrow="Note"
            title="Coordination is not a substitute for licensed professionals"
            description="We work alongside your lawyer, architect, engineer, contractor, and vendors—keeping you informed and aligned, with fewer unknowns." 
          />
        </Container>
      </Section>
    </>
  );
}
