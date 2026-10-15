import type { CatalogueItem } from "@/types/product";
import { CatalogueFilter } from "./CatalogueFilter";
import { ProductCard } from "./ProductCard";

interface FilterableCatalogueProps {
  items: CatalogueItem[];
  listId: string;
  headingLevel?: "h2" | "h3";
}

/** Server-rendered product cards wrapped in the client-side category filter. */
export function FilterableCatalogue({
  items,
  listId,
  headingLevel = "h3",
}: FilterableCatalogueProps) {
  return (
    <CatalogueFilter
      listId={listId}
      entries={items.map(({ product, number }) => ({
        id: product.id,
        category: product.category,
        card: <ProductCard product={product} number={number} headingLevel={headingLevel} />,
      }))}
    />
  );
}
