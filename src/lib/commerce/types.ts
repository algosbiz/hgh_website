import type { Product } from "@/types/product";

/**
 * What the product page should offer the visitor.
 *
 * - "enquire": link to the enquiry form (products not sold online)
 * - "cart": add to the HGH Bali cart; checkout continues on Peptides Bali
 *   (see docs/commerce-feasibility.md)
 */
export type ProductAction =
  | { kind: "enquire"; label: string; href: string }
  | { kind: "cart"; checkoutId: number };

/**
 * A commerce provider decides which action a product gets.
 * The UI only talks to this interface, so the destination platform can be
 * swapped later without changing components.
 */
export interface CommerceProvider {
  id: string;
  getProductAction(product: Product): ProductAction;
}
