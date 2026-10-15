import type { NextConfig } from "next";

const indexingAllowed =
  process.env.SITE_INDEXING === "enabled" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.VERCEL_ENV !== "development";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Keep the WordPress-style URLs with a trailing slash (e.g. /products/).
  trailingSlash: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Old WordPress URLs from the previous hghbali.com website.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/hello-world", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },
      { source: "/product", destination: "/products/", permanent: true },
      { source: "/products/hgh-somatropin", destination: "/products/", permanent: true },
    ];
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
    ];

    // Extra protection: preview/staging deployments are never indexed.
    if (!indexingAllowed) {
      securityHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }

    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
