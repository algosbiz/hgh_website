/**
 * General website settings: brand, contact details and navigation.
 * See README.md ("Mengubah kontak") before changing contact details.
 */

export const site = {
  name: "HGH Bali",
  legalName: "Atlas Longevity",
  tagline: "Somatropin HGH product information & enquiries — Bali & Indonesia",
  description:
    "HGH Bali by Atlas Longevity: product catalogue, labelled specifications, packaging details and batch testing documentation for HGH boxes, single vials and pens in Bali and Indonesia.",
  defaultUrl: "https://hghbali.com",
  logo: {
    src: "/images/brand/hgh-bali-logo.png",
    width: 1206,
    height: 439,
    alt: "HGH Bali — Human Growth Hormone (Somatropin)",
  },
  contact: {
    // Atlas Longevity WhatsApp number used on the sister sites
    // (balipeptides.online / peptidepensbali.com). Confirm before launch.
    whatsappNumber: "6282326300167",
    whatsappDisplay: "+62 823-2630-0167",
    // Set to an approved HGH Bali email address to show it on the site.
    email: null as string | null,
  },
  // Photos carried over from the previous hghbali.com website, used in the
  // same sections as on that site (see docs/audit.md §3).
  //
  // Homepage hero background (wide, ~1600 × 900). Decorative, so no alt
  // text. The left side is covered by a cream gradient for readability.
  heroImage: {
    src: "/images/site/hero-clinic-lobby.jpg",
  },
  // Delivery section on the homepage.
  deliveryImage: {
    src: "/images/site/clinic-treatment-room.jpg",
    alt: "Bright treatment room with a padded bed, plants and gold accents",
    width: 768,
    height: 768,
  },
  // Footer brand banner.
  footerBanner: {
    src: "/images/brand/hgh-banner.jpg",
    alt: "HGH — Human Growth Hormone (Somatropin) Injection",
    width: 854,
    height: 370,
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
        description: "Five pen options",
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
