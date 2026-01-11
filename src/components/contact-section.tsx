import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Clock, ListChecks, Loader2, ShieldCheck } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactIntakeSchema, type ContactIntakeValues } from "@/lib/contact-intake";
import { submitContactIntake } from "@/lib/formsubmit";

type FormValues = ContactIntakeValues;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeyPot, setHoneyPot] = useState("");
  const mountedAtRef = useRef<number>(Date.now());

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

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  return (
    <Section>
      <Container className="py-14 sm:py-18">
        <SectionHeader
          eyebrow="Contact"
          title="Contact"
          description="Share a few details. We’ll reply with a clear next step and a suggested scope."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
              {submitted ? (
                <div className="space-y-3">
                  <p className="text-sm font-medium">Message received</p>
                  <p className="text-sm text-muted-foreground">
                    Thank you. We’ll respond with a short set of next steps.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">Send an inquiry</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      The message can be brief. If it helps, include the stage, location, timeline, and what you want verified.
                    </p>
                  </div>

                  {submitError ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                      <p className="text-sm text-destructive">{submitError}</p>
                    </div>
                  ) : null}

                  <Form {...form}>
                    <form
                      className="space-y-6"
                      onSubmit={form.handleSubmit(async (values) => {
                        setSubmitError(null);

                        // Lightweight spam protection:
                        // 1) Honeypot field (should stay empty)
                        // 2) Minimum time on page before submit
                        if (honeyPot.trim().length > 0) {
                          setSubmitError("We could not send your message right now. Please try again.");
                          return;
                        }
                        if (Date.now() - mountedAtRef.current < 1500) {
                          setSubmitError("Please wait a moment and try again.");
                          return;
                        }

                        try {
                          await submitContactIntake(values, {
                            subject: "Contact form — Real Israel",
                            source: "contact_form",
                          });
                          setSubmitted(true);
                        } catch (err) {
                          console.error("[Contact] Submission failed", err);
                          setSubmitError("We could not send your message right now. Please try again.");
                        }
                      })}
                    >
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="company">Company</label>
                        <input
                          id="company"
                          name="company"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeyPot}
                          onChange={(e) => setHoneyPot(e.target.value)}
                        />
                      </div>

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
                                rows={7}
                                placeholder="Stage, location, timeline, and what you want verified."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Typical reply time: 1 business day.
                        </p>
                        <Button
                          type="submit"
                          className="sm:min-w-[160px]"
                          disabled={form.formState.isSubmitting}
                          aria-busy={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending
                            </>
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">What happens next</p>
              </div>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>We read your message and confirm what you want protected.</li>
                <li>We respond with a clear next step and suggested scope.</li>
                <li>If it’s a fit, we set cadence and decision points.</li>
              </ol>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Helpful to include</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Stage: purchase, renovation, or active build</li>
                <li>Location and timeline</li>
                <li>What needs to be verified</li>
              </ul>
              <div className="mt-5 rounded-xl border border-border/70 bg-background/50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    We aim for calm, client-aligned reporting. No commissions, no inflated claims.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
