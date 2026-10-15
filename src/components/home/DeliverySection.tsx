import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { delivery } from "@/data/delivery";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Delivery details on the left, photo (`site.deliveryImage`) on the right. */
export function DeliverySection() {
  return (
    <section id="Delivery" aria-labelledby="delivery-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            id="delivery-title"
            eyebrow="Delivery"
            title="Discreet delivery across Bali"
            description={delivery.serviceType}
          />

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {delivery.fees.map((fee) => (
              <div key={fee.area} className="rounded-card border border-line bg-paper p-6">
                <dt className="text-sm text-muted">{fee.area}</dt>
                <dd className="mt-2 font-display text-[1.75rem] leading-none text-ink tabular-nums">
                  {fee.amount}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">{delivery.feeNote}</p>

          <div className="mt-10 rounded-[1.75rem] border border-line bg-paper p-7 sm:p-10">
            <h3 className="flex items-center gap-2 font-display text-xl font-normal">
              <MapPin aria-hidden="true" className="size-5 text-gold" strokeWidth={1.5} />
              Standard Bali coverage
            </h3>
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

            <div className="mt-8 rounded-2xl bg-sand p-6">
              <h3 className="font-display text-lg font-normal">Elsewhere in Indonesia</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                Enquiries welcome from {delivery.indonesiaCities.join(", ")} and
                other locations, subject to current service availability and
                applicable requirements.
              </p>
            </div>
          </div>

          <ButtonLink href="/delivery/" variant="secondary" className="mt-8">
            Delivery details
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line bg-sand lg:aspect-[4/5]">
              <Image
                src={site.deliveryImage.src}
                alt={site.deliveryImage.alt}
                fill
                sizes="(min-width: 1280px) 28rem, (min-width: 1024px) 36vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
