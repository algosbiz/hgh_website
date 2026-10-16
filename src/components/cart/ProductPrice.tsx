"use client";

import { formatPrice } from "@/lib/price";
import { useCart } from "./CartProvider";

/**
 * A product's price: the live Peptides Bali price for products sold through
 * the cart ("From …" when its variants have different prices), otherwise
 * `fallback` (the approved price from `products.ts`). Renders nothing when
 * there is no price to show.
 */
export function ProductPrice({
  productId,
  fallback,
  className,
}: {
  productId: string;
  fallback: number | null;
  className?: string;
}) {
  const { productItems } = useCart();
  const items = productItems.get(productId);
  const amounts = items
    ? items.flatMap((item) => (item.price === null ? [] : [item.price]))
    : fallback === null
      ? []
      : [fallback];
  if (amounts.length === 0) return null;

  const lowest = Math.min(...amounts);
  const varies = amounts.some((amount) => amount !== lowest);

  return (
    <p className={className}>
      {varies ? <span className="mr-1.5 font-sans text-sm text-muted">From</span> : null}
      {formatPrice(lowest)}
    </p>
  );
}
