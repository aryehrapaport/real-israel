import { useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/seo";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactIntakeSchema, type ContactIntakeValues } from "@/lib/contact-intake";
import { submitContactIntake } from "@/lib/formsubmit";

const PDF_PATH = "/resources/what-international-buyers-miss.pdf";

type FormValues = ContactIntakeValues;

export function ResourcesPage() {
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(contactIntakeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      timeline: "",
      message: "",
    },
    mode: "onTouched",
  });

  const downloadName = useMemo(
    () => "What International Buyers Miss When They’re Not on the Ground in Israel.pdf",
    [],
  );

  return (
    <>
      <Seo
        title="Real Israel | Resources"
        description="A short PDF briefing for international buyers and families: what gets missed when no one is on the ground in Israel." 
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Resources"
            title="A short briefing for international buyers"
            description="One practical PDF designed to help you spot preventable risk before it becomes costly." 
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-border/70">
              <CardContent className="p-6">
                <p className="text-sm font-medium">
                  What International Buyers Miss When They’re Not on the Ground in Israel
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A concise checklist of the small, common misses that create disproportionate friction.
                </p>

                <div className="mt-6">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="group">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Request the briefing PDF</DialogTitle>
                        <DialogDescription>
                          Leave your details so we can follow up if you want to continue. Then download.
                        </DialogDescription>
                      </DialogHeader>

                      {error ? (
                        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                          <p className="text-sm text-destructive">{error}</p>
                        </div>
                      ) : null}

                      <Form {...form}>
                        <form
                          className="space-y-6"
                          onSubmit={form.handleSubmit(async (values) => {
                            setError(null);
                            try {
                              await submitContactIntake(values, {
                                subject: "Briefing PDF request — Real Israel",
                                source: "briefing_pdf",
                              });

                              const a = document.createElement("a");
                              a.href = PDF_PATH;
                              a.download = downloadName;
                              document.body.appendChild(a);
                              a.click();
                              a.remove();

                              setOpen(false);
                              form.reset();
                            } catch (err) {
                              console.error("[Resources] Briefing submission failed", err);
                              setError("We could not submit this request right now. Please try again.");
                            }
                          })}
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input autoComplete="name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" autoComplete="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                  <FormLabel>Phone (optional)</FormLabel>
                                  <FormControl>
                                    <Input autoComplete="tel" inputMode="tel" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                  <FormLabel>Location (optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="City or neighborhood" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="timeline"
                              render={({ field }) => (
                                <FormItem className="md:col-span-1">
                                  <FormLabel>Timeline (optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Weeks or months" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={6}
                                    placeholder="Stage, location, timeline, and what you want verified."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => setOpen(false)}
                              disabled={form.formState.isSubmitting}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              disabled={form.formState.isSubmitting}
                              aria-busy={form.formState.isSubmitting}
                            >
                              {form.formState.isSubmitting ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  Sending
                                </>
                              ) : (
                                "Download briefing PDF"
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  This PDF is a starting point, not legal or engineering advice.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <NewsletterSignup />
              <div className="rounded-xl border border-border/70 bg-card p-5">
                <p className="text-sm font-medium">Prefer a private conversation?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  If you’re already mid-process, a short call can clarify what presence would change.
                </p>
                <div className="mt-4">
                  <Button asChild variant="secondary">
                      <Link to="/contact">Request a Consultation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Quality"
            title="Lead magnet, kept calm"
            description="The goal is to help qualified clients make better decisions, not to flood your inbox." 
          />
        </Container>
      </Section>
    </>
  );
}
