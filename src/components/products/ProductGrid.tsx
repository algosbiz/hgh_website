import type { CatalogueItem } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  items: CatalogueItem[];
  headingLevel?: "h2" | "h3";
  id?: string;
  /** Set when the grid starts above the fold, so its first photo is the LCP. */
  eagerFirst?: boolean;
}

export function ProductGrid({
  items,
  headingLevel = "h3",
  id,
  eagerFirst = false,
}: ProductGridProps) {
  return (
    <ul id={id} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.map(({ product, number }, index) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            number={number}
            headingLevel={headingLevel}
            eager={eagerFirst && index === 0}
          />
        </li>
      ))}
    </ul>
  );
}
