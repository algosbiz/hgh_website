/**
 * Product types for the HGH Bali catalogue.
 * Product content lives in `src/data/products.ts`.
 */

export type ProductCategory = "hgh-boxes" | "pens";

/**
 * Publication/compliance state of a product.
 * These are NOT quality certifications or marketing claims.
 */
export type ProductStatus =
  | "draft"
  | "information-only"
  | "verification-required"
  | "unavailable"
  | "documentation-pending"
  | "approved";

/** A single specification row. `value: null` renders as "To be confirmed". */
export interface ProductSpec {
  label: string;
  value: string | null;
}

export interface ProductImage {
  /** Path inside `/public`, e.g. "/images/products/hgh-box-option-1/main.jpg" */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type DocumentType =
  | "certificate-of-analysis"
  | "laboratory-report"
  | "manufacturer"
  | "regulatory"
  | "other";

export interface ProductDocument {
  id: string;
  title: string;
  type: DocumentType;
  /** Only "available" documents with an `href` are linked. */
  status: "available" | "pending";
  href?: string;
  batch?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

/**
 * Optional price. Only shown when `approvedForDisplay` is true
 * (requires legal/regulatory approval).
 */
export interface ProductPrice {
  amount: number;
  currency: "IDR";
  approvedForDisplay: boolean;
}

/**
 * The matching product on Peptides Bali (WooCommerce), used by the cart
 * checkout. Both IDs `null` = not sold online (enquiry only).
 * See README.md section 17.
 */
export interface ProductCommerceMapping {
  destination: "peptides-bali";
  productId: number | null;
  /** Required for variable products (e.g. one IU size). */
  variationId: number | null;
  /** Set to true once the client has confirmed this mapping. */
  mappingConfirmed: boolean;
}

export interface Product {
  /** Unique internal ID, never shown to visitors. */
  id: string;
  /** URL segment: /products/[slug]/ */
  slug: string;
  name: string;
  category: ProductCategory;
  status: ProductStatus;
  shortDescription: string;
  /** Each string is one paragraph. */
  description: string[];
  images: ProductImage[];
  /** The first three rows are shown on product cards. */
  specifications: ProductSpec[];
  packaging: ProductSpec[];
  manufacturer: {
    name: string | null;
    details: string | null;
  };
  documents: ProductDocument[];
  faqs: ProductFaq[];
  price: ProductPrice | null;
  commerce: ProductCommerceMapping;
  seo: {
    title: string;
    description: string;
  };
}

/** A product plus its catalogue index number (e.g. "001"). */
export interface CatalogueItem {
  product: Product;
  number: string;
}

