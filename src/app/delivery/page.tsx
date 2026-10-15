import { ClipboardList, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { delivery } from "@/data/delivery";
import { buildMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Delivery in Bali & Indonesia",
  description:
    "Delivery-only service across Bali, including Canggu, Seminyak, Ubud, Sanur, Uluwatu and Nusa Dua, with enquiries welcome from across Indonesia.",
  path: "/delivery/",
});

const requirements = [
  "Complete delivery address",
  "Receiver name",
  "Telephone number",
  "Available time for delivery",
  "Location pin",
];

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Delivery", href: "/delivery/" }]}
        eyebrow="Delivery"
        title="Delivery in Bali & Indonesia"
        intro={delivery.serviceType}
      />

      <section aria-labelledby="fees-title" className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="fees-title" eyebrow="Bali" title="Delivery fees" />
            <dl className="mt-8 grid gap-4">
              {delivery.fees.map((fee) => (
                <div
                  key={fee.area}
                  className="flex items-baseline justify-between gap-4 rounded-card border border-line bg-paper p-6"
                >
                  <dt className="text-body">{fee.area}</dt>
                  <dd className="font-display text-2xl text-ink tabular-nums">{fee.amount}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-muted">{delivery.feeNote}</p>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[1.75rem] border border-line bg-paper p-7 sm:p-10">
              <h2 className="flex items-center gap-2 font-display text-2xl font-normal">
                <MapPin aria-hidden="true" className="size-5 text-gold" strokeWidth={1.5} />
                Standard Bali coverage
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {delivery.baliAreas.map((area) => (
                  <li
                    key={area}
                    className="flex items-center gap-3 border-b border-line py-3 text-[0.95rem] text-ink"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Outside these areas? Contact the team before ordering to
                confirm whether delivery is possible.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="steps-title" className="border-y border-line bg-sand/60 py-16 sm:py-24">
        <Container>
          <SectionHeading id="steps-title" eyebrow="Process" title="Simple, discreet delivery" />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {delivery.steps.map((step, index) => (
              <li key={step.title} className="bg-paper p-7">
                <span className="font-display text-sm text-gold-deep tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-normal">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-label="Requirements and Indonesia-wide enquiries" className="py-16 sm:py-24">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-line bg-paper p-7 sm:p-10">
            <ClipboardList aria-hidden="true" className="size-6 text-gold" strokeWidth={1.4} />
            <h2 className="mt-5 font-display text-2xl font-normal">Delivery requirements</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Once availability and any applicable requirements have been
              confirmed, the team will ask for:
            </p>
            <ul className="mt-5 space-y-2.5">
              {requirements.map((item) => (
                <li key={item} className="flex items-center gap-3 text-ink">
                  <span aria-hidden="true" className="h-px w-3 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-[1.75rem] bg-ink p-7 text-cream sm:p-10">
            <h2 className="font-display text-2xl font-normal text-cream">Elsewhere in Indonesia</h2>
            <p className="mt-3 leading-relaxed text-cream/75">{delivery.indonesiaNote}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {delivery.indonesiaCities.map((city) => (
                <li key={city} className="rounded-full border border-cream/25 px-3.5 py-1.5 text-sm text-cream/90">
                  {city}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
              <ButtonLink href="/contact/" variant="light" size="lg">
                Ask about your location
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(
                  "Hi Atlas Longevity, I'm contacting you from HGH Bali. I'd like to check delivery availability for my location.",
                )}
                external
                variant="outline-light"
                size="lg"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
