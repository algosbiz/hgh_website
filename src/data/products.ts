import type { Product } from "@/types/product";

/**
 * HGH Bali product catalogue — the single source of truth for product data.
 *
 * IMPORTANT
 * - Only enter information that has been confirmed by the client
 *   (product label, manufacturer documents or approved copy).
 * - A specification `value` of `null` is shown as "To be confirmed".
 * - The order of this list is the order shown on the website.
 * - See README.md ("Mengubah detail produk") for step-by-step instructions.
 *
 * Names, photos and prices match peptidesbali.online (22 October 2026).
 * The price shown on the website is read live from Peptides Bali when the
 * store can be reached; `price.amount` is the fallback.
 */
export const products: Product[] = [
  // ---------------------------------------------------------------------------
  // HGH BOXES (2) — HGH Somatropin Bali & Indonesia (`hgh-somatropin-bali-indonesia`, 10304)
  // ---------------------------------------------------------------------------
  {
    id: "box-100iu",
    slug: "hgh-somatropin-100iu-box",
    name: "HGH Somatropin 100 IU Box",
    category: "hgh-boxes",
    status: "documentation-pending",
    shortDescription:
      "Atlas Longevity box with 10 HGH vials of 10 IU each — 100 IU in total.",
    description: [
      "An Atlas Longevity presentation box with 10 HGH Somatropin vials labelled 10 IU each, for 100 IU in total, together with 10 vials of bacteriostatic water (3 ml each).",
      "Supporting documentation is being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-100iu-box/main.webp",
        alt: "Atlas Longevity HGH Somatropin 100 IU box with 10 × 10 IU HGH vials and 10 × 3 ml bacteriostatic water",
        width: 1400,
        height: 933,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "10 IU per vial" },
      { label: "Vials per box", value: "10" },
      { label: "Total per box", value: "100 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity presentation box" },
      { label: "Box contents", value: "10 × 10 IU HGH vials, 10 × 3 ml bacteriostatic water" },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "box-100iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "box-100iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 4_000_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 10304,
      variationId: 10305,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH Somatropin 100 IU Box — Price & Specs",
      description:
        "HGH Somatropin 100 IU box by Atlas Longevity: 10 × 10 IU vials with bacteriostatic water. Price, labelled specifications and delivery in Bali.",
    },
  },
  {
    id: "box-180iu",
    slug: "hgh-somatropin-180iu-box",
    name: "HGH Somatropin 180 IU Box",
    category: "hgh-boxes",
    status: "documentation-pending",
    shortDescription:
      "Atlas Longevity box with 5 HGH vials of 36 IU each — 180 IU in total.",
    description: [
      "An Atlas Longevity presentation box with 5 HGH Somatropin vials labelled 36 IU each, for 180 IU in total, together with 5 vials of bacteriostatic water (3 ml each).",
      "Supporting documentation is being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-180iu-box/main.webp",
        alt: "Atlas Longevity HGH Somatropin 180 IU box with 5 × 36 IU HGH vials and 5 × 3 ml bacteriostatic water",
        width: 1400,
        height: 933,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "36 IU per vial" },
      { label: "Vials per box", value: "5" },
      { label: "Total per box", value: "180 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity presentation box" },
      { label: "Box contents", value: "5 × 36 IU HGH vials, 5 × 3 ml bacteriostatic water" },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "box-180iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "box-180iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 6_500_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 10304,
      variationId: 10306,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH Somatropin 180 IU Box — Price & Specs",
      description:
        "HGH Somatropin 180 IU box by Atlas Longevity: 5 × 36 IU vials with bacteriostatic water. Price, labelled specifications and delivery in Bali.",
    },
  },

  // ---------------------------------------------------------------------------
  // SINGLE VIALS (3) — HGH (`hgh-10iu-bali`, 1217)
  // ---------------------------------------------------------------------------
  {
    id: "vial-10iu",
    slug: "hgh-10iu-vial",
    name: "HGH 10 IU Vial",
    category: "single-vials",
    status: "documentation-pending",
    shortDescription: "A single Atlas Longevity HGH vial labelled 10 IU.",
    description: [
      "A single HGH vial labelled 10 IU, presented under the Atlas Longevity label.",
      "Packaging details and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-10iu-vial/main.webp",
        alt: "Atlas Longevity HGH vial labelled 10 IU",
        width: 1050,
        height: 1400,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "10 IU per vial" },
      { label: "Vials per pack", value: "1" },
      { label: "Total per pack", value: "10 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "vial-10iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "vial-10iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 1_100_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 1217,
      variationId: 5708,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH 10 IU Vial — Price & Specifications",
      description:
        "Single HGH Somatropin vial labelled 10 IU by Atlas Longevity: price, labelled specifications, packaging details and delivery in Bali.",
    },
  },
  {
    id: "vial-24iu",
    slug: "hgh-24iu-vial",
    name: "HGH 24 IU Vial",
    category: "single-vials",
    status: "documentation-pending",
    shortDescription: "A single Atlas Longevity HGH vial labelled 24 IU.",
    description: [
      "A single HGH vial labelled 24 IU, presented under the Atlas Longevity label.",
      "Packaging details and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-24iu-vial/main.webp",
        alt: "Atlas Longevity HGH vial labelled 24 IU",
        width: 1254,
        height: 1254,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "24 IU per vial" },
      { label: "Vials per pack", value: "1" },
      { label: "Total per pack", value: "24 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "vial-24iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "vial-24iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 1_500_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 1217,
      variationId: 10062,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH 24 IU Vial — Price & Specifications",
      description:
        "Single HGH Somatropin vial labelled 24 IU by Atlas Longevity: price, labelled specifications, packaging details and delivery in Bali.",
    },
  },
  {
    id: "vial-36iu",
    slug: "hgh-36iu-vial",
    name: "HGH 36 IU Vial",
    category: "single-vials",
    status: "documentation-pending",
    shortDescription: "A single Atlas Longevity HGH vial labelled 36 IU.",
    description: [
      "A single HGH vial labelled 36 IU, presented under the Atlas Longevity label.",
      "Packaging details and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-36iu-vial/main.webp",
        alt: "Atlas Longevity HGH vial labelled 36 IU",
        width: 1050,
        height: 1400,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "36 IU per vial" },
      { label: "Vials per pack", value: "1" },
      { label: "Total per pack", value: "36 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "vial-36iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "vial-36iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 2_000_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 1217,
      variationId: 5709,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH 36 IU Vial — Price & Specifications",
      description:
        "Single HGH Somatropin vial labelled 36 IU by Atlas Longevity: price, labelled specifications, packaging details and delivery in Bali.",
    },
  },

  // ---------------------------------------------------------------------------
  // PENS (5) — HGH Somatropin (`hgh-somatropin`, 9981). One product per
  // strength; the pen type is chosen on the product page (`variants`).
  // The disposable pen photo is used for every pen type.
  // ---------------------------------------------------------------------------
  {
    id: "pen-10iu",
    slug: "hgh-somatropin-pen-10iu",
    name: "HGH Somatropin Pen 10 IU",
    category: "pens",
    status: "documentation-pending",
    shortDescription:
      "HGH Somatropin 10 IU as a prefilled disposable pen, a reusable pen or a replacement cartridge.",
    description: [
      "HGH Somatropin labelled 10 IU from Atlas Longevity, available in three pen types: a prefilled disposable pen, a reusable pen, or a replacement cartridge for the Atlas Longevity reusable pen. Choose the pen type above; each has its own price.",
      "Pack contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-pen-10iu/main.webp",
        alt: "Atlas Longevity HGH Somatropin 10 IU prefilled pen with its kit box",
        width: 1254,
        height: 1254,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "10 IU" },
      { label: "Pen type", value: "Disposable pen, reusable pen or cartridge" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box (disposable pen)" },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "pen-10iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-10iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: null,
      mappingConfirmed: true,
    },
    variants: {
      label: "Pen type",
      options: [
        {
          id: "disposable",
          label: "Disposable pen",
          price: { amount: 1_800_000, currency: "IDR", approvedForDisplay: true },
          variationId: 9984,
        },
        {
          id: "reusable",
          label: "Reusable pen",
          price: { amount: 2_100_000, currency: "IDR", approvedForDisplay: true },
          variationId: 9986,
        },
        {
          id: "cartridge",
          label: "Cartridge",
          price: { amount: 1_500_000, currency: "IDR", approvedForDisplay: true },
          variationId: 9988,
        },
      ],
    },
    seo: {
      title: "HGH Somatropin Pen 10 IU — Price & Specs",
      description:
        "HGH Somatropin 10 IU by Atlas Longevity as a disposable pen, reusable pen or cartridge: prices, labelled specifications and delivery in Bali.",
    },
  },
  {
    id: "pen-24iu",
    slug: "hgh-somatropin-pen-24iu",
    name: "HGH Somatropin Pen 24 IU",
    category: "pens",
    status: "documentation-pending",
    shortDescription:
      "HGH Somatropin 24 IU as a prefilled disposable pen, a reusable pen or a replacement cartridge.",
    description: [
      "HGH Somatropin labelled 24 IU from Atlas Longevity, available in three pen types: a prefilled disposable pen, a reusable pen, or a replacement cartridge for the Atlas Longevity reusable pen. Choose the pen type above; each has its own price.",
      "Pack contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-pen-24iu/main.webp",
        alt: "Atlas Longevity HGH Somatropin 24 IU prefilled pen with its kit box",
        width: 1254,
        height: 1254,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "24 IU" },
      { label: "Pen type", value: "Disposable pen, reusable pen or cartridge" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box (disposable pen)" },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "pen-24iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-24iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: null,
      mappingConfirmed: true,
    },
    variants: {
      label: "Pen type",
      options: [
        {
          id: "disposable",
          label: "Disposable pen",
          price: { amount: 2_200_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10064,
        },
        {
          id: "reusable",
          label: "Reusable pen",
          price: { amount: 2_500_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10067,
        },
        {
          id: "cartridge",
          label: "Cartridge",
          price: { amount: 1_900_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10070,
        },
      ],
    },
    seo: {
      title: "HGH Somatropin Pen 24 IU — Price & Specs",
      description:
        "HGH Somatropin 24 IU by Atlas Longevity as a disposable pen, reusable pen or cartridge: prices, labelled specifications and delivery in Bali.",
    },
  },
  {
    id: "pen-36iu",
    slug: "hgh-somatropin-pen-36iu",
    name: "HGH Somatropin Pen 36 IU",
    category: "pens",
    status: "documentation-pending",
    shortDescription:
      "HGH Somatropin 36 IU as a prefilled disposable pen, a reusable pen or a replacement cartridge.",
    description: [
      "HGH Somatropin labelled 36 IU from Atlas Longevity, available in three pen types: a prefilled disposable pen, a reusable pen, or a replacement cartridge for the Atlas Longevity reusable pen. Choose the pen type above; each has its own price.",
      "Pack contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-pen-36iu/main.webp",
        alt: "Atlas Longevity HGH Somatropin 36 IU prefilled pen with its kit box",
        width: 1254,
        height: 1254,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "36 IU" },
      { label: "Pen type", value: "Disposable pen, reusable pen or cartridge" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box (disposable pen)" },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "pen-36iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-36iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: null,
      mappingConfirmed: true,
    },
    variants: {
      label: "Pen type",
      options: [
        {
          id: "disposable",
          label: "Disposable pen",
          price: { amount: 2_800_000, currency: "IDR", approvedForDisplay: true },
          variationId: 9985,
        },
        {
          id: "reusable",
          label: "Reusable pen",
          price: { amount: 3_100_000, currency: "IDR", approvedForDisplay: true },
          variationId: 9987,
        },
        {
          id: "cartridge",
          label: "Cartridge",
          price: { amount: 2_500_000, currency: "IDR", approvedForDisplay: true },
          variationId: 9989,
        },
      ],
    },
    seo: {
      title: "HGH Somatropin Pen 36 IU — Price & Specs",
      description:
        "HGH Somatropin 36 IU by Atlas Longevity as a disposable pen, reusable pen or cartridge: prices, labelled specifications and delivery in Bali.",
    },
  },
  {
    id: "pen-72iu",
    slug: "hgh-somatropin-pen-72iu",
    name: "HGH Somatropin Pen 72 IU",
    category: "pens",
    status: "documentation-pending",
    shortDescription:
      "HGH Somatropin 72 IU as a prefilled disposable pen, a reusable pen or a replacement cartridge.",
    description: [
      "HGH Somatropin labelled 72 IU from Atlas Longevity, available in three pen types: a prefilled disposable pen, a reusable pen, or a replacement cartridge for the Atlas Longevity reusable pen. Choose the pen type above; each has its own price.",
      "Pack contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-pen-72iu/main.webp",
        alt: "Atlas Longevity HGH Somatropin 72 IU prefilled pen with its kit box",
        width: 1254,
        height: 1254,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "72 IU" },
      { label: "Pen type", value: "Disposable pen, reusable pen or cartridge" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box (disposable pen)" },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "pen-72iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-72iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: null,
      mappingConfirmed: true,
    },
    variants: {
      label: "Pen type",
      options: [
        {
          id: "disposable",
          label: "Disposable pen",
          price: { amount: 6_000_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10065,
        },
        {
          id: "reusable",
          label: "Reusable pen",
          price: { amount: 6_300_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10068,
        },
        {
          id: "cartridge",
          label: "Cartridge",
          price: { amount: 5_700_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10071,
        },
      ],
    },
    seo: {
      title: "HGH Somatropin Pen 72 IU — Price & Specs",
      description:
        "HGH Somatropin 72 IU by Atlas Longevity as a disposable pen, reusable pen or cartridge: prices, labelled specifications and delivery in Bali.",
    },
  },
  {
    id: "pen-108iu",
    slug: "hgh-somatropin-pen-108iu",
    name: "HGH Somatropin Pen 108 IU",
    category: "pens",
    status: "documentation-pending",
    shortDescription:
      "HGH Somatropin 108 IU as a prefilled disposable pen, a reusable pen or a replacement cartridge.",
    description: [
      "HGH Somatropin labelled 108 IU from Atlas Longevity, available in three pen types: a prefilled disposable pen, a reusable pen, or a replacement cartridge for the Atlas Longevity reusable pen. Choose the pen type above; each has its own price.",
      "Pack contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-pen-108iu/main.webp",
        alt: "Atlas Longevity HGH Somatropin 108 IU prefilled pen with its kit box",
        width: 1254,
        height: 1254,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "108 IU" },
      { label: "Pen type", value: "Disposable pen, reusable pen or cartridge" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box (disposable pen)" },
      { label: "Pack contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "pen-108iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-108iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: null,
      mappingConfirmed: true,
    },
    variants: {
      label: "Pen type",
      options: [
        {
          id: "disposable",
          label: "Disposable pen",
          price: { amount: 7_000_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10066,
        },
        {
          id: "reusable",
          label: "Reusable pen",
          price: { amount: 7_300_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10069,
        },
        {
          id: "cartridge",
          label: "Cartridge",
          price: { amount: 6_700_000, currency: "IDR", approvedForDisplay: true },
          variationId: 10072,
        },
      ],
    },
    seo: {
      title: "HGH Somatropin Pen 108 IU — Price & Specs",
      description:
        "HGH Somatropin 108 IU by Atlas Longevity as a disposable pen, reusable pen or cartridge: prices, labelled specifications and delivery in Bali.",
    },
  },
];
