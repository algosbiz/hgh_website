import type { MetadataRoute } from "next";
import { getAllProducts, isIndexableProduct } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";

const staticPages = [
  { path: "/", priority: 1 },
  { path: "/products/", priority: 0.9 },
  { path: "/products/hgh-boxes/", priority: 0.8 },
  { path: "/products/pens/", priority: 0.8 },
  { path: "/testing/", priority: 0.8 },
  { path: "/about-hgh/", priority: 0.6 },
  { path: "/delivery/", priority: 0.6 },
  { path: "/faq/", priority: 0.6 },
  { path: "/contact/", priority: 0.5 },
  { path: "/privacy-policy/", priority: 0.2 },
  { path: "/terms/", priority: 0.2 },
  { path: "/medical-disclaimer/", priority: 0.2 },
];

/** Draft product pages are excluded until their information is confirmed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const productPages = getAllProducts()
    .filter(isIndexableProduct)
    .map((product) => ({ path: `/products/${product.slug}/`, priority: 0.7 }));

  return [...staticPages, ...productPages].map((page) => ({
    url: absoluteUrl(page.path),
    priority: page.priority,
  }));
}
