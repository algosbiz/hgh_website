"use client";

import { useEffect, useId, useState } from "react";
import type { ProductCategory } from "@/types/product";
import { categories, categoryOrder } from "@/data/categories";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type Filter = "all" | ProductCategory;

export interface FilterEntry {
  id: string;
  category: ProductCategory;
  /** The product card, rendered on the server. */
  card: React.ReactNode;
}

interface CatalogueFilterProps {
  entries: FilterEntry[];
  /** Identifies the list in analytics, e.g. "home" or "catalogue". */
  listId: string;
}

const filterLabels: Record<Filter, string> = {
  all: "All products",
  "hgh-boxes": categories["hgh-boxes"].name,
  pens: categories.pens.name,
};

/**
 * Category filter with accessible toggle buttons and a live result count.
 * Cards are rendered on the server; this component only chooses which to show.
 */
export function CatalogueFilter({ entries, listId }: CatalogueFilterProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const gridId = useId();

  const visible =
    filter === "all" ? entries : entries.filter((entry) => entry.category === filter);

  useEffect(() => {
    trackEvent("product_list_view", { list_id: listId, item_count: entries.length });
  }, [listId, entries.length]);

  function selectFilter(next: Filter) {
    if (next === filter) return;
    setFilter(next);
    trackEvent("product_category_filter", { list_id: listId, category: next });
  }

  const filters: Filter[] = ["all", ...categoryOrder];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter products by category"
          className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 sm:pb-0"
        >
          {filters.map((value) => {
            const count =
              value === "all"
                ? entries.length
                : entries.filter((entry) => entry.category === value).length;
            const pressed = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={pressed}
                aria-controls={gridId}
                onClick={() => selectFilter(value)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-200",
                  pressed
                    ? "border-ink bg-ink text-cream"
                    : "border-line-strong bg-paper/60 text-body hover:border-ink hover:text-ink",
                )}
              >
                {filterLabels[value]}
                <span
                  className={cn("text-xs tabular-nums", pressed ? "text-cream/70" : "text-muted")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-sm text-muted">
          Showing {visible.length} of {entries.length} products
        </p>
      </div>

      <ul id={gridId} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((entry) => (
          <li key={entry.id}>{entry.card}</li>
        ))}
      </ul>
    </div>
  );
}
