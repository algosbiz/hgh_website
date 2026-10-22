/**
 * The Somatropin product described on the previous HGH Bali website.
 *
 * Kept as a factual reference. The current "HGH Somatropin 100 IU Box" in
 * `products.ts` also holds 10 vials of 10 IU.
 */
export const listedProduct = {
  name: "Somatropin",
  labelledStrength: "10 IU / 3.33 mg per vial",
  perVial: "10 IU",
  vialsPerBox: "10",
  totalPerBox: "100 IU",
  specifications: [
    { label: "Active ingredient", value: "Somatropin" },
    { label: "Strength", value: "10 IU / 3.33 mg per vial" },
    { label: "Presentation", value: "White lyophilised cake" },
    { label: "Vial size", value: "2 ml vial" },
    { label: "Box contents", value: "10 vials" },
    { label: "Total somatropin", value: "100 IU per box" },
  ],
  source: "Previous HGH Bali product listing",
  /** The catalogue product with the same vial count and strength. */
  catalogueHref: "/products/hgh-somatropin-100iu-box/",
  // Photos of current catalogue products (the client asked for the clinic
  // photos from the old website to be replaced on 18 October 2026).
  images: {
    specifications: {
      src: "/images/products/hgh-10iu-vial/main.webp",
      alt: "Atlas Longevity HGH vial labelled 10 IU, from the current catalogue",
      width: 1050,
      height: 1400,
    },
    box: {
      src: "/images/products/hgh-somatropin-100iu-box/main.webp",
      alt: "Atlas Longevity HGH Somatropin 100 IU box with 10 × 10 IU vials, from the current catalogue",
      width: 1400,
      height: 933,
    },
  },
} as const;
