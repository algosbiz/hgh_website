import type { Product, ProductVariant } from "@/types/product";

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

/** One thing a product can put in the Peptides Bali cart. */
export interface CheckoutOption {
  /** `null` for products without variants. */
  variant: ProductVariant | null;
  /**
   * The WooCommerce ID that goes into the destination cart: the variation ID
   * for variable products, otherwise the product ID.
   */
  checkoutId: number;
}

/**
 * Everything a product can put in the Peptides Bali cart: one option per
 * variant (e.g. pen type), or the product itself. Empty = not sold online.
 */
export function getCheckoutOptions(product: Product): CheckoutOption[] {
  if (product.variants) {
    return product.variants.options.map((variant) => ({
      variant,
      checkoutId: variant.variationId,
    }));
  }
  const checkoutId = product.commerce.variationId ?? product.commerce.productId;
  return checkoutId === null ? [] : [{ variant: null, checkoutId }];
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
