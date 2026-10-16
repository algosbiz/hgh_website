import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductPrice } from "@/components/cart/ProductPrice";
import { categories } from "@/data/categories";
import { getProductAction } from "@/lib/commerce";
import { getDisplayPrice } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { SpecList } from "./SpecList";
import { StatusBadge } from "./StatusBadge";

interface ProductCardProps {
  product: Product;
  /** Catalogue index, e.g. "001". */
  number: string;
  headingLevel?: "h2" | "h3";
}

export function ProductCard({
  product,
  number,
  headingLevel: Heading = "h3",
}: ProductCardProps) {
  const href = `/products/${product.slug}/`;
  const action = getProductAction(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper transition-[border-color,box-shadow,transform] duration-300 ease-soft hover:border-line-strong hover:shadow-lift motion-safe:hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-sand sm:aspect-[4/3]">
        <ProductImage
          image={product.images[0]}
          category={product.category}
          sizes="(min-width: 1280px) 25rem, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
          className="transition-transform duration-500 ease-soft motion-safe:group-hover:scale-[1.03]"
        />
        <div className="absolute top-4 left-4">
          <StatusBadge status={product.status} />
        </div>
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 font-display text-sm text-muted tabular-nums"
        >
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
          {categories[product.category].name}
        </p>
        <Heading className="mt-2 font-display text-[1.375rem] leading-tight font-normal">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:z-10 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-deep"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        <SpecList
          specs={product.specifications.slice(0, 3)}
          size="sm"
          className="mt-5"
        />

        <div className="mt-auto space-y-4 pt-6">
          <ProductPrice
            productId={product.id}
            fallback={getDisplayPrice(product)}
            className="font-display text-2xl text-ink tabular-nums"
          />

          <div className="flex items-center justify-between gap-4">
            {action.kind === "cart" ? (
              // Sits above the card-wide link so it can be clicked.
              <AddToCartButton productId={product.id} className="relative z-20" />
            ) : (
              <span aria-hidden="true" className="text-sm font-medium text-ink">
                View details
              </span>
            )}
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
            >
              <ArrowUpRight className="size-4" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
