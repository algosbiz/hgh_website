import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexingAllowed } from "@/lib/seo";

/** Blocks all crawlers unless indexing is explicitly enabled (see README). */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingAllowed) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
