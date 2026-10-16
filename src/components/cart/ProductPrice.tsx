"use client";

import { formatPrice } from "@/lib/price";
import { useCart } from "./CartProvider";

/**
 * A product's price: the live Peptides Bali price for products sold through
 * the cart, otherwise `fallback` (the approved price from `products.ts`).
 * Renders nothing when there is no price to show.
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
  const { catalogue } = useCart();
  const item = catalogue.get(productId);
  const amount = item ? item.price : fallback;
  if (amount === null) return null;

  return <p className={className}>{formatPrice(amount)}</p>;
}
