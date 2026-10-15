import type { Metadata } from "next";
import { site } from "@/data/site";

/** Public site URL without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || site.defaultUrl
).replace(/\/$/, "");

/**
 * Search engines may only index the site when explicitly enabled, and never
 * on Vercel preview/development deployments.
 */
export const isIndexingAllowed =
  process.env.SITE_INDEXING === "enabled" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

export function absoluteUrl(pathname: string): string {
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

interface PageMetadataInput {
  title: string;
  description: string;
  /** Path with trailing slash, e.g. "/testing/" */
  path: string;
  /** Set to false to keep a page out of search results. */
  index?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  index = true,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}
