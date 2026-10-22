import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductPrice } from "@/components/cart/ProductPrice";
import { getDisplayPrice } from "@/lib/products";

/**
 * Hero visual: the featured product's photo on a white card, with three key
 * specifications and its price.
 */
export function HeroVisual({ product }: { product: Product }) {
  const image = product.images[0];
  const href = `/products/${product.slug}/`;
  const specs = product.specifications.slice(1, 4);

  return (
    <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-[1.5rem] border border-line bg-paper shadow-lift lg:mr-0 lg:ml-auto lg:max-w-[30rem]">
      {image ? (
        <div className="relative aspect-[3/2] border-b border-line">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(min-width: 1024px) 30rem, (min-width: 640px) 28rem, 92vw"
            className="object-contain p-4"
          />
        </div>
      ) : null}

      <figcaption className="p-6 sm:p-7">
        <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
          Featured product
        </p>
        <p className="mt-3 font-display text-[1.75rem] leading-tight tracking-[-0.015em] text-ink">
          <Link href={href} className="underline-offset-4 hover:underline">
            {product.name}
          </Link>
        </p>

        <dl className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={index === 0 ? "py-3.5 pr-3" : index === specs.length - 1 ? "py-3.5 pl-3" : "px-3 py-3.5"}
            >
              <dt className="text-[0.7rem] leading-snug tracking-wide text-muted uppercase">
                {spec.label}
              </dt>
              <dd className="mt-1 font-display text-lg text-ink tabular-nums">
                {spec.value ?? "—"}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4">
          <ProductPrice
            productId={product.id}
            fallback={getDisplayPrice(product)}
            className="font-display text-2xl text-ink tabular-nums"
          />
          <Link
            href={href}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
          >
            View product
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </figcaption>
    </figure>
  );
}
