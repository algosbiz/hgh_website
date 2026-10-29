import type { ProductCategory, ProductImage } from "@/types/product";

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  /** Used in sentences, e.g. "3 HGH box options" */
  optionLabel: string;
  /** One item of this category, e.g. in the cart: "HGH box" */
  itemLabel: string;
  href: string;
  /** The category page's H1 (more descriptive than `name`). */
  heading: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  /** Product photo on the homepage category card (shown on white). */
  photo: ProductImage;
  /**
   * Generic, unbranded renders, used only for a product that has no photo.
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
    heading: "HGH Somatropin Boxes",
    description:
      "Boxed HGH presentations. Each option lists its labelled strength, vial count and packaging once confirmed against the product label.",
    seoTitle: "HGH Somatropin Boxes — 100 IU & 180 IU",
    seoDescription:
      "HGH Somatropin boxes by Atlas Longevity: 100 IU (10 × 10 IU vials) and 180 IU (5 × 36 IU vials), with labelled specifications, prices and delivery in Bali.",
    photo: {
      src: "/images/products/hgh-somatropin-100iu-box/main.webp",
      alt: "Atlas Longevity HGH Somatropin 100 IU box with 10 HGH vials and 10 vials of bacteriostatic water",
      width: 1400,
      height: 933,
    },
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
  "single-vials": {
    slug: "single-vials",
    name: "Single Vials",
    optionLabel: "single vial options",
    itemLabel: "HGH vial",
    href: "/products/single-vials/",
    heading: "Single HGH Vials",
    description:
      "Single HGH vials. Each option lists its labelled strength and contents once confirmed against the product label.",
    seoTitle: "Single HGH Vials — 10 IU, 24 IU & 36 IU",
    seoDescription:
      "Single HGH Somatropin vials by Atlas Longevity labelled 10 IU, 24 IU and 36 IU, with specifications, packaging details, prices and delivery in Bali.",
    photo: {
      src: "/images/categories/single-vials.webp",
      alt: "Atlas Longevity HGH vials labelled 10 IU, 24 IU and 36 IU",
      width: 1600,
      height: 1000,
    },
    illustration: {
      wide: {
        src: "/images/illustrative/single-vials-wide.jpg",
        alt: "Illustrative render of a single unlabelled glass vial with white powder — not the actual product",
        width: 1600,
        height: 1000,
      },
      square: {
        src: "/images/illustrative/single-vials-square.jpg",
        alt: "Illustrative render of a single unlabelled glass vial with white powder — not the actual product",
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
    heading: "HGH Somatropin Pens",
    description:
      "HGH Somatropin pens in five strengths, each available as a disposable pen, a reusable pen or a replacement cartridge.",
    seoTitle: "HGH Somatropin Pens — 10 IU to 108 IU",
    seoDescription:
      "HGH Somatropin pens by Atlas Longevity from 10 IU to 108 IU, as a disposable pen, reusable pen or cartridge, with specifications, prices and Bali delivery.",
    photo: {
      src: "/images/products/hgh-somatropin-pen-10iu/main.webp",
      alt: "Atlas Longevity HGH Somatropin 10 IU prefilled pen with its kit box",
      width: 1254,
      height: 1254,
    },
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

export const categoryOrder: ProductCategory[] = ["hgh-boxes", "single-vials", "pens"];
