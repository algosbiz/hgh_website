import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { getDestinationProducts } from "@/lib/commerce/stock";
import { getCartCatalogue } from "@/lib/products";
import { isIndexingAllowed, siteUrl } from "@/lib/seo";
import "@/styles/globals.css";

// Fonts are downloaded at build time and served from this website (self-hosted).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

// Italic is only used for small accents, so it is not preloaded.
const frauncesItalic = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces-italic",
  display: "swap",
  style: "italic",
  axes: ["opsz"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HGH Bali | Somatropin Product Information & Specifications",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: `${site.name} by ${site.legalName}`,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexingAllowed
    ? { index: true, follow: true }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  url: siteUrl,
  logo: `${siteUrl}${site.logo.src}`,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const cartCatalogue = getCartCatalogue(await getDestinationProducts());
  const productNames = Object.fromEntries(
    products.map((product) => [`/products/${product.slug}/`, product.name]),
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${frauncesItalic.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <CartProvider catalogue={cartCatalogue}>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <WhatsAppButton productNames={productNames} />
        {gaId ? <Analytics gaId={gaId} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
