import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { Seo } from "@/components/seo";
import { Container, Divider, Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const projectTypes = ["purchase", "renovation", "new_build", "other"] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  country: z.string().min(2, "Please enter your country."),
  projectType: z.enum(projectTypes, { message: "Please select a project type." }),
  message: z.string().min(20, "A short message helps us prepare."),
});

type FormValues = z.infer<typeof schema>;

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
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
        <Container>
          <SectionHeader
            eyebrow="Contact"
            title="Safe, low-pressure outreach"
            description="Share the basics. If it’s a fit, we’ll propose a calm next step and a clear scope." 
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-border/70">
              <CardContent className="p-6">
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

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input autoComplete="country-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="purchase">Purchase</SelectItem>
                                  <SelectItem value="renovation">Renovation</SelectItem>
                                  <SelectItem value="new_build">New build</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
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
                                placeholder="A few details: stage, location, timeline, and what you want protected."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">
                          Privacy-first. We don’t share details.
                        </p>
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-border/70">
                <CardContent className="p-6">
                  <p className="text-sm font-medium">Optional WhatsApp</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If you prefer WhatsApp, we can continue there after the first reply.
                  </p>
                  <div className="mt-4">
                    <Button asChild variant="secondary">
                      <a href="mailto:hello@example.com?subject=WhatsApp%20request"> 
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Request a WhatsApp link
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70">
                <CardContent className="p-6">
                  <p className="text-sm font-medium">Scheduling</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Calendly-style embed placeholder. Replace with your scheduling tool when ready.
                  </p>
                  <div className="mt-4 rounded-lg border border-border/70 bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">Scheduling embed goes here.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Divider />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Integration"
            title="Ready for API integration"
            description="The form is wired for validation and state. Hook it to an endpoint when you’re ready." 
          />
        </Container>
      </Section>
    </>
  );
}
