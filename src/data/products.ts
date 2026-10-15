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
 */
export const products: Product[] = [
  // ---------------------------------------------------------------------------
  // HGH BOXES (3)
  // ---------------------------------------------------------------------------
  {
    id: "hgh-box-1",
    slug: "hgh-box-option-1",
    name: "HGH Box Option 1",
    category: "hgh-boxes",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the first HGH box option. Name, labelled strength and packaging will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the first HGH box option. The final product name, labelled strength, packaging and supporting documentation are being confirmed and will only be published once verified.",
      "Specifications of the Somatropin 10 IU / 3.33 mg product previously listed on HGH Bali are not assumed to apply to this option.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Vials per box", value: null },
      { label: "Total per box", value: null },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Box contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "hgh-box-1-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "hgh-box-1-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH 10 IU on peptidesbali.online — confirm with the client.
      productId: 1217,
      variationId: 5708,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Box Option 1 — Product Information",
      description:
        "Product information listing for HGH Box Option 1 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
  {
    id: "hgh-box-2",
    slug: "hgh-box-option-2",
    name: "HGH Box Option 2",
    category: "hgh-boxes",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the second HGH box option. Name, labelled strength and packaging will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the second HGH box option. The final product name, labelled strength, packaging and supporting documentation are being confirmed and will only be published once verified.",
      "Specifications of the Somatropin 10 IU / 3.33 mg product previously listed on HGH Bali are not assumed to apply to this option.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Vials per box", value: null },
      { label: "Total per box", value: null },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Box contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "hgh-box-2-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "hgh-box-2-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH 24 IU on peptidesbali.online — confirm with the client.
      productId: 1217,
      variationId: 10062,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Box Option 2 — Product Information",
      description:
        "Product information listing for HGH Box Option 2 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
  {
    id: "hgh-box-3",
    slug: "hgh-box-option-3",
    name: "HGH Box Option 3",
    category: "hgh-boxes",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the third HGH box option. Name, labelled strength and packaging will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the third HGH box option. The final product name, labelled strength, packaging and supporting documentation are being confirmed and will only be published once verified.",
      "Specifications of the Somatropin 10 IU / 3.33 mg product previously listed on HGH Bali are not assumed to apply to this option.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Vials per box", value: null },
      { label: "Total per box", value: null },
      { label: "Presentation", value: null },
      { label: "Vial size", value: null },
    ],
    packaging: [
      { label: "Outer packaging", value: null },
      { label: "Box contents", value: null },
      { label: "Batch & expiry labelling", value: null },
      { label: "Storage instructions", value: null },
    ],
    manufacturer: { name: null, details: null },
    documents: [
      {
        id: "hgh-box-3-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "hgh-box-3-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH 36 IU on peptidesbali.online — confirm with the client.
      productId: 1217,
      variationId: 5709,
      mappingConfirmed: false,
    },
    seo: {
      title: "HGH Box Option 3 — Product Information",
      description:
        "Product information listing for HGH Box Option 3 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },

  // ---------------------------------------------------------------------------
  // PENS (5)
  // ---------------------------------------------------------------------------
  {
    id: "pen-1",
    slug: "pen-option-1",
    name: "Pen Option 1",
    category: "pens",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the first pen option. Pen type, labelled strength and contents will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the first pen option. The final product name, pen type, labelled strength, contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Pen type", value: null },
      { label: "Total content", value: null },
      { label: "Pens per pack", value: null },
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
        id: "pen-1-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-1-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH Somatropin, disposable pen, 10 IU on peptidesbali.online — confirm with the client.
      productId: 9981,
      variationId: 9984,
      mappingConfirmed: false,
    },
    seo: {
      title: "Pen Option 1 — Product Information",
      description:
        "Product information listing for Pen Option 1 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
  {
    id: "pen-2",
    slug: "pen-option-2",
    name: "Pen Option 2",
    category: "pens",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the second pen option. Pen type, labelled strength and contents will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the second pen option. The final product name, pen type, labelled strength, contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Pen type", value: null },
      { label: "Total content", value: null },
      { label: "Pens per pack", value: null },
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
        id: "pen-2-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-2-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH Somatropin, disposable pen, 24 IU on peptidesbali.online — confirm with the client.
      productId: 9981,
      variationId: 10064,
      mappingConfirmed: false,
    },
    seo: {
      title: "Pen Option 2 — Product Information",
      description:
        "Product information listing for Pen Option 2 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
  {
    id: "pen-3",
    slug: "pen-option-3",
    name: "Pen Option 3",
    category: "pens",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the third pen option. Pen type, labelled strength and contents will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the third pen option. The final product name, pen type, labelled strength, contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Pen type", value: null },
      { label: "Total content", value: null },
      { label: "Pens per pack", value: null },
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
        id: "pen-3-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-3-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH Somatropin, disposable pen, 36 IU on peptidesbali.online — confirm with the client.
      productId: 9981,
      variationId: 9985,
      mappingConfirmed: false,
    },
    seo: {
      title: "Pen Option 3 — Product Information",
      description:
        "Product information listing for Pen Option 3 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
  {
    id: "pen-4",
    slug: "pen-option-4",
    name: "Pen Option 4",
    category: "pens",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the fourth pen option. Pen type, labelled strength and contents will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the fourth pen option. The final product name, pen type, labelled strength, contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Pen type", value: null },
      { label: "Total content", value: null },
      { label: "Pens per pack", value: null },
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
        id: "pen-4-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-4-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH Somatropin, disposable pen, 72 IU on peptidesbali.online — confirm with the client.
      productId: 9981,
      variationId: 10065,
      mappingConfirmed: false,
    },
    seo: {
      title: "Pen Option 4 — Product Information",
      description:
        "Product information listing for Pen Option 4 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
  {
    id: "pen-5",
    slug: "pen-option-5",
    name: "Pen Option 5",
    category: "pens",
    status: "draft",
    shortDescription:
      "Catalogue placeholder for the fifth pen option. Pen type, labelled strength and contents will be published once confirmed.",
    description: [
      "This listing reserves a place in the catalogue for the fifth pen option. The final product name, pen type, labelled strength, contents and supporting documentation are being confirmed and will only be published once verified.",
    ],
    images: [],
    specifications: [
      { label: "Active ingredient", value: null },
      { label: "Labelled strength", value: null },
      { label: "Pen type", value: null },
      { label: "Total content", value: null },
      { label: "Pens per pack", value: null },
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
        id: "pen-5-coa",
        title: "Certificate of Analysis",
        type: "certificate-of-analysis",
        status: "pending",
      },
      {
        id: "pen-5-manufacturer",
        title: "Manufacturer documentation",
        type: "manufacturer",
        status: "pending",
      },
    ],
    faqs: [],
    price: null,
    commerce: {
      destination: "peptides-bali",
      // Provisional: HGH Somatropin, disposable pen, 108 IU on peptidesbali.online — confirm with the client.
      productId: 9981,
      variationId: 10066,
      mappingConfirmed: false,
    },
    seo: {
      title: "Pen Option 5 — Product Information",
      description:
        "Product information listing for Pen Option 5 in the HGH Bali catalogue by Atlas Longevity. Specifications are pending confirmation.",
    },
  },
];
