import type { CommerceProvider } from "./types";

/**
 * Phase 1 provider: every product leads to the enquiry form on its own
 * product page. No cart, checkout or payment action is ever produced.
 */
export const enquiryOnlyProvider: CommerceProvider = {
  id: "enquiry-only",
  getProductAction(product) {
    return {
      kind: "enquire",
      label:
        product.status === "unavailable"
          ? "Ask about future availability"
          : "Enquire about availability",
      href: `/products/${product.slug}/#enquire`,
    };
  },
};
