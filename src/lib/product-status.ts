import type { ProductStatus } from "@/types/product";

/**
 * Visitor-facing wording for each product status.
 * Statuses describe publication/compliance state only — never quality.
 */
export const statusInfo: Record<
  ProductStatus,
  { label: string; description: string }
> = {
  draft: {
    label: "Details pending",
    description:
      "Product information is incomplete and is being confirmed before publication.",
  },
  "information-only": {
    label: "Information only",
    description: "This listing is published for catalogue information.",
  },
  "verification-required": {
    label: "Verification required",
    description:
      "Further eligibility or authorisation checks are required before availability can be confirmed.",
  },
  unavailable: {
    label: "Unavailable",
    description: "This product is not currently available.",
  },
  "documentation-pending": {
    label: "Documentation pending",
    description:
      "Testing or regulatory documentation for this product is not yet complete.",
  },
  approved: {
    label: "Approved listing",
    description:
      "This listing has passed the publication and compliance review for its permitted functionality.",
  },
};
