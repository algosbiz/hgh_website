import { enquiryOnlyProvider } from "./enquiry-only";
import { getCheckoutId } from "./peptides-bali";
import type { CommerceProvider } from "./types";

/**
 * Products with a Peptides Bali ID can be added to the cart; checkout
 * continues on peptidesbali.online. Products without an ID, or marked
 * `unavailable`, fall back to the enquiry form.
 */
export const peptidesBaliCartProvider: CommerceProvider = {
  id: "peptides-bali-cart",
  getProductAction(product) {
    const checkoutId = getCheckoutId(product);
    if (checkoutId === null || product.status === "unavailable") {
      return enquiryOnlyProvider.getProductAction(product);
    }
    return { kind: "cart", checkoutId };
  },
};
