import { FileClock } from "lucide-react";
import { listedProduct } from "@/data/listed-product";
import { site } from "@/data/site";

/**
 * Hero visual: a "specimen record" card of the previously listed product,
 * floating over the hero background photo.
 */
export function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-md rounded-[1.5rem] border border-line bg-paper/95 p-6 shadow-lift backdrop-blur-sm sm:p-7 lg:mr-0 lg:ml-auto lg:max-w-[27rem]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
          Currently listed product
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold-deep/60 px-2.5 py-1 text-xs font-medium text-gold-deep">
          <FileClock aria-hidden="true" className="size-3.5" />
          Testing pending
        </span>
      </div>

      <p className="mt-5 font-display text-[2.25rem] leading-none tracking-[-0.02em] text-ink sm:text-[2.5rem]">
        {listedProduct.name}
      </p>
      <p className="mt-2 text-sm text-muted">{listedProduct.labelledStrength}</p>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line">
        <div className="py-4 pr-3">
          <dt className="text-xs tracking-wide text-muted uppercase">Per vial</dt>
          <dd className="mt-1 font-display text-xl text-ink tabular-nums sm:text-2xl">
            {listedProduct.perVial}
          </dd>
        </div>
        <div className="px-3 py-4">
          <dt className="text-xs tracking-wide text-muted uppercase">Vials</dt>
          <dd className="mt-1 font-display text-xl text-ink tabular-nums sm:text-2xl">
            × {listedProduct.vialsPerBox}
          </dd>
        </div>
        <div className="py-4 pl-3">
          <dt className="text-xs tracking-wide text-muted uppercase">Per box</dt>
          <dd className="mt-1 font-display text-xl text-gold-deep tabular-nums sm:text-2xl">
            {listedProduct.totalPerBox}
          </dd>
        </div>
      </dl>

      <figcaption className="mt-4 text-xs leading-relaxed text-muted">
        Source: the previous HGH Bali product listing by {site.legalName}.
        Each new catalogue option is confirmed separately.
      </figcaption>
    </figure>
  );
}
