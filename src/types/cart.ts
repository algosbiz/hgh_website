/** A product that can be added to the cart (built on the server). */
export interface CartCatalogueItem {
  id: string;
  name: string;
  /** Short line under the name in the cart, e.g. "HGH box". */
  label: string;
  href: string;
  image: { src: string; alt: string };
  /** WooCommerce product/variation ID on Peptides Bali. */
  checkoutId: number;
  /** `null` when the stock could not be read. */
  inStock: boolean | null;
  /** Price in IDR — the live Peptides Bali price when available; `null` = not shown. */
  price: number | null;
}

/** What is saved in the visitor's browser. */
export interface CartLine {
  id: string;
  quantity: number;
}
