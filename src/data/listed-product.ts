/**
 * The Somatropin product described on the previous HGH Bali website.
 *
 * Kept as a factual reference. "Somatropin HGH 191aa 100 IU" in
 * `products.ts` carries the same labelled strength and vial count.
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
  // Photos shown beside this product on the previous hghbali.com website.
  // They show clinic interiors, not the product itself.
  images: {
    specifications: {
      src: "/images/site/clinic-reception.jpg",
      alt: "Clinic reception with a white desk, gold stools and pendant lights",
      width: 939,
      height: 939,
    },
    box: {
      src: "/images/site/clinic-reception-hallway.jpg",
      alt: "Clinic reception desk and hallway with a gold tree wall sculpture",
      width: 1600,
      height: 1067,
    },
  },
} as const;
