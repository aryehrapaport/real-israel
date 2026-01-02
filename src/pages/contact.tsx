import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Download } from "lucide-react";
import { Seo } from "@/components/seo";
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
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(20, "A short message helps us prepare."),
});

const gateSchema = z.object({
  email: z.string().email(),
});

const PDF_PATH = "/resources/what-international-buyers-miss.pdf";

type FormValues = z.infer<typeof schema>;

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pdfEmail, setPdfEmail] = useState("");
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);

  const downloadName = useMemo(
    () => "What International Buyers Miss When They’re Not on the Ground in Israel.pdf",
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  return (
    <>
      <Seo
        title="Contact — Real Israel"
        description="Low-pressure outreach for international clients: share a few details and we’ll suggest the right next step." 
      />

      <Section>
        <Container className="py-14 sm:py-18">
          <SectionHeader
            eyebrow="Contact"
            title="Contact"
            description="Share a few details. We’ll reply with a clear next step."
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
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={form.handleSubmit(async () => {
                        // Ready for API integration: replace with POST to your backend.
                        setSubmitted(true);
                      })}
                    >
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

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={6}
                                placeholder="A few details: stage, location, timeline, and what you want protected."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between gap-3">
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
                  <p className="text-sm font-medium">Briefing PDF</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A short PDF on what tends to get missed at a distance.
                  </p>

                  <div className="mt-5">
                    <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
                      <DialogTrigger asChild>
                        <Button className="group">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Before you download</DialogTitle>
                          <DialogDescription>
                            We’ll email you the link if you need it later. No spam.
                          </DialogDescription>
                        </DialogHeader>

                        <form
                          className="space-y-4"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const result = gateSchema.safeParse({
                              email: pdfEmail,
                            });
                            if (!result.success) {
                              setPdfError("Please enter a valid email.");
                              return;
                            }

                            setPdfError(null);

                            const a = document.createElement("a");
                            a.href = PDF_PATH;
                            a.download = downloadName;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();

                            setPdfOpen(false);
                          }}
                        >
                          <div className="space-y-2">
                            <Label htmlFor="pdf-email">Email</Label>
                            <Input
                              id="pdf-email"
                              type="email"
                              value={pdfEmail}
                              onChange={(e) => setPdfEmail(e.target.value)}
                              placeholder="you@example.com"
                              autoComplete="email"
                              required
                            />
                            {pdfError ? <p className="text-xs text-destructive">{pdfError}</p> : null}
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setPdfOpen(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">Download</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
