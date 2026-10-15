import type { Product } from "@/types/product";
import { peptidesBaliCartProvider } from "./peptides-bali-cart";
import type { CommerceProvider, ProductAction } from "./types";

/**
 * The provider used by the whole website.
 *
 * Cart + checkout on Peptides Bali, enabled at the client's request on
 * 15 October 2026. To return to enquiry-only mode, use
 * `enquiryOnlyProvider` from "./enquiry-only" instead.
 */
const activeProvider: CommerceProvider = peptidesBaliCartProvider;

export function getProductAction(product: Product): ProductAction {
  return activeProvider.getProductAction(product);
}

export type { CommerceProvider, ProductAction } from "./types";
