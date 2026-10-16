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
 * Names, photos and prices match peptidesbali.online (16 October 2026).
 * The price shown on the website is read live from Peptides Bali when the
 * store can be reached; `price.amount` is the fallback.
 */
export const products: Product[] = [
  // ---------------------------------------------------------------------------
  // HGH BOXES (2)
  // ---------------------------------------------------------------------------
  {
    id: "box-191aa-100iu",
    slug: "somatropin-hgh-191aa-100iu",
    name: "Somatropin HGH 191aa 100 IU",
    category: "hgh-boxes",
    status: "draft",
    shortDescription:
      "Box of 10 Somatropin vials labelled 10 IU / 3.33 mg each — 100 IU in total.",
    description: [
      "A box of 10 Somatropin vials, each labelled 10 IU / 3.33 mg, for 100 IU in total. The box also contains 10 ampoules of bacteriostatic water (2 ml each), as printed on the packaging.",
      "Supporting documentation is being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/somatropin-hgh-191aa-100iu/main.webp",
        alt: "Somatropin HGH 191aa box, front and back — 10 IU / 3.33 mg, 10 vials pack",
        width: 1266,
        height: 486,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "10 IU / 3.33 mg per vial" },
      { label: "Vials per box", value: "10" },
      { label: "Total per box", value: "100 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Box contents", value: "10 vials, 10 × 2 ml ampoules of bacteriostatic water" },
      { label: "Batch & expiry labelling", value: "Printed on the box" },
      { label: "Storage instructions", value: "2–8 °C, protect from light (as printed on the box)" },
    ],
    manufacturer: { name: "Cooper Pharma Limited", details: "As printed on the box." },
    documents: [
      {
        id: "box-191aa-100iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "box-191aa-100iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 5_500_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      // Somatropin HGH 191aa (`hgh-somatropin-bali`), a simple product.
      productId: 1252,
      variationId: null,
      mappingConfirmed: true,
    },
    seo: {
      title: "Somatropin HGH 191aa 100 IU — Product Information",
      description:
        "Somatropin HGH 191aa, 10 vials × 10 IU (100 IU), in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "box-180iu",
    slug: "hgh-somatropin-180iu-box",
    name: "HGH Somatropin 180 IU Box",
    category: "hgh-boxes",
    status: "draft",
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
      // HGH Somatropin Bali & Indonesia (`hgh-somatropin-bali-indonesia`) — 180 IU.
      productId: 10304,
      variationId: 10306,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH Somatropin 180 IU Box — Product Information",
      description:
        "HGH Somatropin 180 IU box (5 vials × 36 IU) in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },

  // ---------------------------------------------------------------------------
  // SINGLE VIALS (3)
  // ---------------------------------------------------------------------------
  {
    id: "vial-24iu",
    slug: "hgh-24iu-vial",
    name: "HGH 24 IU Vial",
    category: "single-vials",
    status: "draft",
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
      // HGH (`hgh-10iu-bali`) — 24 IU.
      productId: 1217,
      variationId: 10062,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH 24 IU Vial — Product Information",
      description:
        "Single HGH vial labelled 24 IU in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "vial-36iu",
    slug: "hgh-36iu-vial",
    name: "HGH 36 IU Vial",
    category: "single-vials",
    status: "draft",
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
      // HGH (`hgh-10iu-bali`) — 36 IU.
      productId: 1217,
      variationId: 5709,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH 36 IU Vial — Product Information",
      description:
        "Single HGH vial labelled 36 IU in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "vial-100iu",
    slug: "hgh-somatropin-100iu",
    name: "HGH Somatropin 100 IU",
    category: "single-vials",
    status: "draft",
    shortDescription:
      "Atlas Longevity set of 10 HGH vials of 10 IU each — 100 IU in total.",
    description: [
      "An Atlas Longevity presentation box with 10 HGH Somatropin vials labelled 10 IU each, for 100 IU in total, together with 10 vials of bacteriostatic water (3 ml each).",
      "Supporting documentation is being confirmed and will only be published once verified.",
    ],
    images: [
      {
        src: "/images/products/hgh-somatropin-100iu/main.webp",
        alt: "Atlas Longevity HGH Somatropin 100 IU box with 10 × 10 IU HGH vials and 10 × 3 ml bacteriostatic water",
        width: 1400,
        height: 933,
      },
    ],
    specifications: [
      { label: "Active ingredient", value: "Somatropin (HGH)" },
      { label: "Labelled strength", value: "10 IU per vial" },
      { label: "Vials per pack", value: "10" },
      { label: "Total per pack", value: "100 IU" },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity presentation box" },
      { label: "Pack contents", value: "10 × 10 IU HGH vials, 10 × 3 ml bacteriostatic water" },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "vial-100iu-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "vial-100iu-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: { amount: 4_000_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      // HGH Somatropin Bali & Indonesia (`hgh-somatropin-bali-indonesia`) — 100 IU.
      productId: 10304,
      variationId: 10305,
      mappingConfirmed: true,
    },
    seo: {
      title: "HGH Somatropin 100 IU — Product Information",
      description:
        "HGH Somatropin 100 IU (10 vials × 10 IU) in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },

  // ---------------------------------------------------------------------------
  // PENS (5) — HGH Somatropin (`hgh-somatropin`), disposable pen variations.
  // Reusable pen and cartridge variations also exist on Peptides Bali; the
  // disposable pen is assumed until the client confirms (mappingConfirmed).
  // ---------------------------------------------------------------------------
  {
    id: "pen-10iu",
    slug: "hgh-somatropin-pen-10iu",
    name: "HGH Somatropin Pen 10 IU",
    category: "pens",
    status: "draft",
    shortDescription: "Atlas Longevity prefilled disposable HGH Somatropin pen, 10 IU.",
    description: [
      "A prefilled, disposable HGH Somatropin pen labelled 10 IU, supplied as an Atlas Longevity pen kit.",
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
      { label: "Labelled strength", value: "10 IU per pen" },
      { label: "Pen type", value: "Prefilled, disposable" },
      { label: "Total content", value: "10 IU" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box" },
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
    price: { amount: 1_800_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: 9984,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Somatropin Pen 10 IU — Product Information",
      description:
        "Prefilled HGH Somatropin pen, 10 IU, in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "pen-24iu",
    slug: "hgh-somatropin-pen-24iu",
    name: "HGH Somatropin Pen 24 IU",
    category: "pens",
    status: "draft",
    shortDescription: "Atlas Longevity prefilled disposable HGH Somatropin pen, 24 IU.",
    description: [
      "A prefilled, disposable HGH Somatropin pen labelled 24 IU, supplied as an Atlas Longevity pen kit.",
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
      { label: "Labelled strength", value: "24 IU per pen" },
      { label: "Pen type", value: "Prefilled, disposable" },
      { label: "Total content", value: "24 IU" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box" },
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
    price: { amount: 2_200_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: 10064,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Somatropin Pen 24 IU — Product Information",
      description:
        "Prefilled HGH Somatropin pen, 24 IU, in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "pen-36iu",
    slug: "hgh-somatropin-pen-36iu",
    name: "HGH Somatropin Pen 36 IU",
    category: "pens",
    status: "draft",
    shortDescription: "Atlas Longevity prefilled disposable HGH Somatropin pen, 36 IU.",
    description: [
      "A prefilled, disposable HGH Somatropin pen labelled 36 IU, supplied as an Atlas Longevity pen kit.",
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
      { label: "Labelled strength", value: "36 IU per pen" },
      { label: "Pen type", value: "Prefilled, disposable" },
      { label: "Total content", value: "36 IU" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box" },
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
    price: { amount: 2_800_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: 9985,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Somatropin Pen 36 IU — Product Information",
      description:
        "Prefilled HGH Somatropin pen, 36 IU, in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "pen-72iu",
    slug: "hgh-somatropin-pen-72iu",
    name: "HGH Somatropin Pen 72 IU",
    category: "pens",
    status: "draft",
    shortDescription: "Atlas Longevity prefilled disposable HGH Somatropin pen, 72 IU.",
    description: [
      "A prefilled, disposable HGH Somatropin pen labelled 72 IU, supplied as an Atlas Longevity pen kit.",
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
      { label: "Labelled strength", value: "72 IU per pen" },
      { label: "Pen type", value: "Prefilled, disposable" },
      { label: "Total content", value: "72 IU" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box" },
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
    price: { amount: 6_000_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: 10065,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Somatropin Pen 72 IU — Product Information",
      description:
        "Prefilled HGH Somatropin pen, 72 IU, in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
  {
    id: "pen-108iu",
    slug: "hgh-somatropin-pen-108iu",
    name: "HGH Somatropin Pen 108 IU",
    category: "pens",
    status: "draft",
    shortDescription: "Atlas Longevity prefilled disposable HGH Somatropin pen, 108 IU.",
    description: [
      "A prefilled, disposable HGH Somatropin pen labelled 108 IU, supplied as an Atlas Longevity pen kit.",
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
      { label: "Labelled strength", value: "108 IU per pen" },
      { label: "Pen type", value: "Prefilled, disposable" },
      { label: "Total content", value: "108 IU" },
      { label: "Pens per pack", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: "Atlas Longevity pen kit box" },
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
    price: { amount: 7_000_000, currency: "IDR", approvedForDisplay: true },
    commerce: {
      destination: "peptides-bali",
      productId: 9981,
      variationId: 10066,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Somatropin Pen 108 IU — Product Information",
      description:
        "Prefilled HGH Somatropin pen, 108 IU, in the HGH Bali catalogue by Atlas Longevity: labelled specifications, packaging details and price.",
    },
  },
];
