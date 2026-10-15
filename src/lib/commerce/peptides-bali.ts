import type { Product } from "@/types/product";

/**
 * Peptides Bali (https://peptidesbali.online) — the WooCommerce store where
 * HGH Bali orders are completed.
 *
 * This module has no server-only imports, so the cart (client components)
 * can use it to build the checkout URL.
 */
export const peptidesBali = {
  id: "peptides-bali",
  name: "Peptides Bali",
  domain: "peptidesbali.online",
  baseUrl: "https://peptidesbali.online",
  platform: "WooCommerce (WordPress)",
} as const;

/** Highest quantity of one product the cart accepts. */
export const MAX_CART_QUANTITY = 10;

/**
 * The WooCommerce ID that goes into the destination cart: the variation ID
 * for variable products, otherwise the product ID. `null` = not sold online.
 */
export function getCheckoutId(product: Product): number | null {
  return product.commerce.variationId ?? product.commerce.productId;
}

export interface CheckoutLine {
  checkoutId: number;
  quantity: number;
}

/**
 * WooCommerce "checkout link": opening this URL fills the Peptides Bali cart
 * with every line (e.g. `?products=5708:2,9984:1`) and shows its checkout.
 * Unknown or out-of-stock IDs are rejected by WooCommerce itself.
 */
export function buildCheckoutUrl(lines: CheckoutLine[]): string {
  const products = lines
    .filter((line) => line.quantity > 0)
    .map(
      (line) =>
        `${line.checkoutId}:${Math.min(Math.floor(line.quantity), MAX_CART_QUANTITY)}`,
    )
    .join(",");
  return `${peptidesBali.baseUrl}/checkout-link/?products=${products}`;
}
