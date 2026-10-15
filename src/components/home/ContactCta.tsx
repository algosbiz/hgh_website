import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

export function ContactCta() {
  return (
    <section id="Contact" aria-labelledby="contact-cta-title" className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-14 sm:px-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -top-40 -right-40 size-[32rem] rounded-full border border-gold/25"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-[24rem] rounded-full border border-gold/15"
          />

          <div className="relative max-w-2xl">
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] text-gold-bright uppercase">
              <span aria-hidden="true" className="h-px w-6 bg-gold-bright" />
              Enquiries
            </p>
            <h2
              id="contact-cta-title"
              className="mt-5 font-display text-[2.25rem] leading-[1.08] font-normal tracking-[-0.015em] text-cream sm:text-5xl"
            >
              Ask about authorised availability
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-cream/75">
              Tell us which catalogue option you are interested in and where you
              are located. The Atlas Longevity team will confirm current
              availability, any applicable requirements and delivery options.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact/" variant="light" size="lg">
                Send an enquiry
              </ButtonLink>
              <ButtonLink
                href={whatsappLink()}
                external
                size="lg"
                variant="outline-light"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
              </ButtonLink>
            </div>
            <p className="mt-10 text-sm tracking-wide text-cream/60">
              Discreet delivery · Batch documentation · Customer support
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
