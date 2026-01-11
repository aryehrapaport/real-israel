import { Seo } from "@/components/seo";
import { ContactSection } from "@/components/contact-section";

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Send a message. We’ll reply with a clear next step and suggested scope."
      />
      <ContactSection />
    </>
  );
}

