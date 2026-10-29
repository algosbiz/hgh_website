import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import { getProductOptions } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Contact — Product & Availability Enquiries",
  description:
    "Contact HGH Bali by Atlas Longevity on WhatsApp or by enquiry form about products, availability, batch documentation and delivery in Bali and Indonesia.",
  path: "/contact/",
});

const nextSteps = [
  "The team reviews your enquiry and the product you selected.",
  "We confirm current availability, any applicable requirements and delivery options for your location.",
  "If you choose to proceed, we explain the next steps directly.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Contact", href: "/contact/" }]}
        eyebrow="Contact"
        title="Product & availability enquiries"
        intro="Ask about a catalogue option, batch documentation or delivery to your location. This form does not place an order or take payment."
      />

      <section aria-label="Enquiry form and contact details" className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-line bg-paper p-6 sm:p-9">
              <h2 className="mb-8 font-display text-[1.75rem] leading-tight font-normal">
                Send an enquiry
              </h2>
              <EnquiryForm products={getProductOptions()} />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[1.75rem] bg-ink p-7 text-cream sm:p-9">
              <MessageCircle aria-hidden="true" className="size-6 text-gold-bright" strokeWidth={1.4} />
              <h2 className="mt-5 font-display text-2xl font-normal text-cream">Prefer WhatsApp?</h2>
              <p className="mt-2 leading-relaxed text-cream/75">
                Message the Atlas Longevity team on {site.contact.whatsappDisplay}.
              </p>
              <ButtonLink href={whatsappLink()} external variant="light" className="mt-6">
                Open WhatsApp
              </ButtonLink>
              {site.contact.email ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-6 flex items-center gap-2 text-cream/90 underline-offset-4 hover:underline"
                >
                  <Mail aria-hidden="true" className="size-4" />
                  {site.contact.email}
                </a>
              ) : null}
            </div>

            <div className="rounded-[1.75rem] border border-line bg-paper p-7 sm:p-9">
              <h2 className="font-display text-xl font-normal">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-4 text-[0.95rem] leading-relaxed text-muted">
                    <span className="font-display text-gold-deep tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex gap-4 rounded-[1.75rem] border border-line bg-sand p-7">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold-deep" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed text-body">
                Please do not share medical history or other health information
                through this website. Questions about suitability should be
                discussed with a qualified healthcare professional.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
