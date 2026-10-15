import Link from "next/link";
import type { ProductCategory } from "@/types/product";
import { categories, categoryOrder } from "@/data/categories";
import { cn } from "@/lib/cn";

/** Links between the catalogue and category pages. */
export function CategoryNav({ current }: { current: ProductCategory }) {
  const links = [
    { label: "All products", href: "/products/", key: "all" },
    ...categoryOrder.map((slug) => ({
      label: categories[slug].name,
      href: categories[slug].href,
      key: slug,
    })),
  ];

  return (
    <nav aria-label="Product categories" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const active = link.key === current;
          return (
            <li key={link.key}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors",
                  active
                    ? "border-ink bg-ink text-cream"
                    : "border-line-strong bg-paper/60 text-body hover:border-ink hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
