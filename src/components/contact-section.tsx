import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Clock, Download, ListChecks, Loader2, ShieldCheck } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Container, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { contactIntakeSchema, type ContactIntakeValues } from "@/lib/contact-intake";
import { submitContactIntake } from "@/lib/formsubmit";

const PDF_PATH = "/resources/what-international-buyers-miss.pdf";

type FormValues = ContactIntakeValues;

export function ContactSection() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pdfSubmitError, setPdfSubmitError] = useState<string | null>(null);
  const [didAutoOpenBriefing, setDidAutoOpenBriefing] = useState(false);

  const downloadName = useMemo(
    () => "What International Buyers Miss When They’re Not on the Ground in Israel.pdf",
    [],
  );

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

  const pdfForm = useForm<FormValues>({
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
    if (didAutoOpenBriefing) return;
    const params = new URLSearchParams(location.search);
    if (params.get("briefing") === "1") {
      setPdfOpen(true);
      setDidAutoOpenBriefing(true);
    }
  }, [didAutoOpenBriefing, location.search]);

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

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
              <p className="text-sm font-medium">Briefing PDF</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A short checklist for international buyers: what gets missed when no one is on the ground.
              </p>

              {pdfSubmitError ? (
                <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                  <p className="text-sm text-destructive">{pdfSubmitError}</p>
                </div>
              ) : null}

              <div className="mt-5">
                <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="w-full">
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

                    {pdfSubmitError ? (
                      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                        <p className="text-sm text-destructive">{pdfSubmitError}</p>
                      </div>
                    ) : null}

                    <Form {...pdfForm}>
                      <form
                        className="space-y-6"
                        onSubmit={pdfForm.handleSubmit(async (values) => {
                          setPdfSubmitError(null);
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

                            setPdfOpen(false);
                            pdfForm.reset();
                          } catch (err) {
                            console.error("[Contact] Briefing submission failed", err);
                            setPdfSubmitError("We could not submit this request right now. Please try again.");
                          }
                        })}
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <FormField
                            control={pdfForm.control}
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
                            control={pdfForm.control}
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
                            control={pdfForm.control}
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
                            control={pdfForm.control}
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
                            control={pdfForm.control}
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
                          control={pdfForm.control}
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
                            onClick={() => setPdfOpen(false)}
                            disabled={pdfForm.formState.isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={pdfForm.formState.isSubmitting}
                            aria-busy={pdfForm.formState.isSubmitting}
                          >
                            {pdfForm.formState.isSubmitting ? (
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
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
