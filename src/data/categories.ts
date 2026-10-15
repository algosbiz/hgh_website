import type { ProductCategory, ProductImage } from "@/types/product";

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  /** Used in sentences, e.g. "3 HGH box options" */
  optionLabel: string;
  /** One item of this category, e.g. in the cart: "HGH box" */
  itemLabel: string;
  href: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  /**
   * Generic, unbranded renders used until approved product photos exist.
   * Always shown with an "Illustrative image" label.
   */
  illustration: {
    wide: ProductImage;
    square: ProductImage;
  };
}

export const categories: Record<ProductCategory, CategoryInfo> = {
  "hgh-boxes": {
    slug: "hgh-boxes",
    name: "HGH Boxes",
    optionLabel: "HGH box options",
    itemLabel: "HGH box",
    href: "/products/hgh-boxes/",
    description:
      "Boxed HGH presentations. Each option lists its labelled strength, vial count and packaging once confirmed against the product label.",
    seoTitle: "HGH Boxes — Product Catalogue",
    seoDescription:
      "Browse the HGH box options in the HGH Bali catalogue by Atlas Longevity, with labelled specifications, packaging details and batch documentation.",
    illustration: {
      wide: {
        src: "/images/illustrative/hgh-boxes-wide.jpg",
        alt: "Illustrative render of unlabelled glass vials with white powder beside a plain carton — not the actual product",
        width: 1600,
        height: 1000,
      },
      square: {
        src: "/images/illustrative/hgh-boxes-square.jpg",
        alt: "Illustrative render of unlabelled glass vials with white powder beside a plain carton — not the actual product",
        width: 1400,
        height: 1400,
      },
    },
  },
  pens: {
    slug: "pens",
    name: "Pens",
    optionLabel: "pen options",
    itemLabel: "HGH pen",
    href: "/products/pens/",
    description:
      "Pen presentations. Each option lists its pen type, labelled strength and contents once confirmed against the product label.",
    seoTitle: "Pens — Product Catalogue",
    seoDescription:
      "Browse the pen options in the HGH Bali catalogue by Atlas Longevity, with labelled specifications, packaging details and batch documentation.",
    illustration: {
      wide: {
        src: "/images/illustrative/pens-wide.jpg",
        alt: "Illustrative render of two unlabelled white and gold pen injectors — not the actual product",
        width: 1600,
        height: 1000,
      },
      square: {
        src: "/images/illustrative/pens-square.jpg",
        alt: "Illustrative render of two unlabelled white and gold pen injectors — not the actual product",
        width: 1400,
        height: 1400,
      },
    },
  },
};

export const categoryOrder: ProductCategory[] = ["hgh-boxes", "pens"];
