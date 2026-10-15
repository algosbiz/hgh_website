import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { HeroVisual } from "./HeroVisual";

interface HeroProps {
  productCount: number;
}

export function Hero({ productCount }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Background photo (`site.heroImage`), faded to cream behind the text. */}
      <Image
        src={site.heroImage.src}
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-[70%_50%] lg:object-right"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-cream from-55% to-cream/40 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-linear-[72deg,var(--color-cream)_43%,transparent_77%] lg:block"
      />

      <Container className="grid items-center gap-14 pt-10 pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-6">
          <Eyebrow>HGH Bali · Atlas Longevity</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] leading-[1.03] font-normal tracking-[-0.025em] sm:text-[3.5rem] lg:text-[4rem]"
          >
            HGH&nbsp;Bali&nbsp;— Product Information{" "}
            <em className="font-display-italic font-light text-gold-deep italic">
              &amp; Specifications
            </em>
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
            A clear catalogue of HGH boxes and pens from Atlas Longevity, with
            labelled specifications, packaging details and batch testing
            documentation published as each record is confirmed.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products/" size="lg">
              Explore products
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
            <ButtonLink href="/testing/" variant="secondary" size="lg">
              View testing
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="text-xs tracking-wide text-muted uppercase">Catalogue</dt>
              <dd className="mt-1 font-display text-lg text-ink sm:text-2xl">
                {productCount} options
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-muted uppercase">Coverage</dt>
              <dd className="mt-1 font-display text-lg text-ink sm:text-2xl">Bali-wide</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-muted uppercase">Service</dt>
              <dd className="mt-1 font-display text-lg text-ink sm:text-2xl">Delivery only</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
