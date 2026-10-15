import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/seo";

export interface Crumb {
  label: string;
  href: string;
}

/** Visible breadcrumbs plus BreadcrumbList structured data for search engines. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
        {all.map((crumb, index) => {
          const isLast = index === all.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {crumb.label}
                  </Link>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 text-line-strong"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
