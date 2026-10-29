/**
 * General website settings: brand, contact details and navigation.
 * See README.md ("Mengubah kontak") before changing contact details.
 */

export const site = {
  name: "HGH Bali",
  legalName: "Atlas Longevity",
  tagline: "Somatropin HGH product information & enquiries — Bali & Indonesia",
  description:
    "HGH Bali by Atlas Longevity: somatropin (human growth hormone) pens, vials and boxes with labelled specifications, prices, batch records and Bali delivery.",
  defaultUrl: "https://hghbali.com",
  // Atlas Longevity HGH Bali logo (client, 18 October 2026), white background
  // removed and trimmed. Used in the header and footer; the favicon, Apple
  // icon and share images in `src/app/` are made from it.
  logo: {
    src: "/images/brand/atlas-hgh-bali-logo.png",
    width: 1400,
    height: 344,
    alt: "Atlas Longevity HGH Bali — Human Growth Hormone",
  },
  contact: {
    // Atlas Longevity WhatsApp number used on the sister sites
    // (balipeptides.online / peptidepensbali.com). Confirm before launch.
    whatsappNumber: "6282326300167",
    whatsappDisplay: "+62 823-2630-0167",
    // Set to an approved HGH Bali email address to show it on the site.
    email: null as string | null,
  },
  // Delivery section on the homepage: a product photo, shown on white.
  // (The clinic photos from the old website were removed at the client's
  // request on 18 October 2026.)
  deliveryImage: {
    src: "/images/products/hgh-somatropin-pen-108iu/main.webp",
    alt: "Atlas Longevity HGH Somatropin 108 IU prefilled pen with its kit box",
    width: 1254,
    height: 1254,
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products/",
    children: [
      {
        label: "All products",
        href: "/products/",
        description: "The full catalogue of ten options",
      },
      {
        label: "HGH Boxes",
        href: "/products/hgh-boxes/",
        description: "Two boxed options",
      },
      {
        label: "Single Vials",
        href: "/products/single-vials/",
        description: "Three single vial options",
      },
      {
        label: "Pens",
        href: "/products/pens/",
        description: "Five strengths, three pen types",
      },
    ],
  },
  { label: "Testing", href: "/testing/" },
  { label: "About HGH", href: "/about-hgh/" },
  { label: "Delivery", href: "/delivery/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Medical Disclaimer", href: "/medical-disclaimer/" },
];
