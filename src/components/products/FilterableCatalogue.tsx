import type { CatalogueItem } from "@/types/product";
import { CatalogueFilter } from "./CatalogueFilter";
import { ProductCard } from "./ProductCard";

interface FilterableCatalogueProps {
  items: CatalogueItem[];
  listId: string;
  headingLevel?: "h2" | "h3";
  /** Set when the catalogue starts above the fold, so its first photo is the LCP. */
  eagerFirst?: boolean;
}

/** Server-rendered product cards wrapped in the client-side category filter. */
export function FilterableCatalogue({
  items,
  listId,
  headingLevel = "h3",
  eagerFirst = false,
}: FilterableCatalogueProps) {
  return (
    <CatalogueFilter
      listId={listId}
      entries={items.map(({ product, number }, index) => ({
        id: product.id,
        category: product.category,
        card: (
          <ProductCard
            product={product}
            number={number}
            headingLevel={headingLevel}
            eager={eagerFirst && index === 0}
          />
        ),
      }))}
    />
  );
}
