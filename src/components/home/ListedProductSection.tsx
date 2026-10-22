import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { listedProduct } from "@/data/listed-product";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";

/**
 * The Somatropin product from the previous HGH Bali listing (specifications,
 * then the 100 IU box), illustrated with photos of the current catalogue's
 * 10 IU vial and 100 IU box.
 */
export function ListedProductSection() {
  const { images } = listedProduct;

  return (
    <section
      aria-labelledby="listed-product-title"
      className="border-y border-line bg-sand/60 py-20 sm:py-28"
    >
      <Container className="flex flex-col gap-16 sm:gap-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-line bg-paper lg:col-span-5">
            <Image
              src={images.specifications.src}
              alt={images.specifications.alt}
              fill
              sizes="(min-width: 1280px) 31rem, (min-width: 1024px) 40vw, 92vw"
              className="object-contain p-8"
            />
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              id="listed-product-title"
              eyebrow="Previously listed product"
              title={`${listedProduct.name} ${listedProduct.labelledStrength.replace(" per vial", "")}`}
              description="Product specifications from the previous HGH Bali listing, kept for reference. The HGH Somatropin 100 IU Box in the catalogue also holds 10 vials of 10 IU."
            />
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {listedProduct.specifications.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-6 py-3.5 text-[0.95rem]">
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted">Source: {listedProduct.source}.</p>
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Box contents</Eyebrow>
            <h3 className="mt-4 font-display text-[2rem] leading-[1.1] font-normal tracking-[-0.015em] sm:text-[2.5rem]">
              {listedProduct.totalPerBox} complete box
            </h3>
            <dl className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
              <div className="py-4 pr-3">
                <dt className="text-xs tracking-wide text-muted uppercase">Per vial</dt>
                <dd className="mt-1 font-display text-2xl text-ink tabular-nums">
                  {listedProduct.perVial}
                </dd>
              </div>
              <div className="px-3 py-4">
                <dt className="text-xs tracking-wide text-muted uppercase">Vials</dt>
                <dd className="mt-1 font-display text-2xl text-ink tabular-nums">
                  × {listedProduct.vialsPerBox}
                </dd>
              </div>
              <div className="py-4 pl-3">
                <dt className="text-xs tracking-wide text-muted uppercase">Per box</dt>
                <dd className="mt-1 font-display text-2xl text-gold-deep tabular-nums">
                  {listedProduct.totalPerBox}
                </dd>
              </div>
            </dl>
            <p className="mt-6 leading-relaxed text-muted">
              Each complete box contained {listedProduct.vialsPerBox} individual
              vials, each labelled{" "}
              {listedProduct.labelledStrength.replace(" per vial", "")},
              providing {listedProduct.totalPerBox} in total.
            </p>
            <ButtonLink href={listedProduct.catalogueHref} variant="secondary" className="mt-8">
              View the 100 IU box
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] border border-line bg-paper lg:col-span-7">
            <Image
              src={images.box.src}
              alt={images.box.alt}
              fill
              sizes="(min-width: 1280px) 44rem, (min-width: 1024px) 56vw, 92vw"
              className="object-contain p-4"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
