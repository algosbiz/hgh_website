import { cacheLife } from "next/cache";
import { products } from "@/data/products";
import { getCheckoutId, peptidesBali } from "./peptides-bali";

/** In-stock flag per checkout ID. A missing ID means "unknown". */
export type StockMap = Record<number, boolean>;

interface StoreApiProduct {
  id: number;
  is_in_stock: boolean;
}

async function fetchStock(ids: number[], type?: "variation"): Promise<StoreApiProduct[]> {
  if (ids.length === 0) return [];
  const url = new URL("/wp-json/wc/store/v1/products", peptidesBali.baseUrl);
  url.searchParams.set("include", ids.join(","));
  url.searchParams.set("per_page", "100");
  if (type) url.searchParams.set("type", type);

  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Store API responded ${response.status}`);
  return (await response.json()) as StoreApiProduct[];
}

/**
 * Stock of every mapped product on Peptides Bali, read from the public
 * WooCommerce Store API and refreshed hourly. If the store cannot be
 * reached, stock is unknown and products stay available to add to the cart
 * (WooCommerce still checks stock at checkout).
 */
export async function getDestinationStock(): Promise<StockMap> {
  "use cache";
  cacheLife("hours");

  const variationIds = products.flatMap((product) =>
    product.commerce.variationId === null ? [] : [product.commerce.variationId],
  );
  const productIds = products.flatMap((product) =>
    product.commerce.variationId === null && getCheckoutId(product) !== null
      ? [product.commerce.productId as number]
      : [],
  );

  try {
    const results = await Promise.all([
      fetchStock(variationIds, "variation"),
      fetchStock(productIds),
    ]);
    const stock: StockMap = {};
    for (const item of results.flat()) stock[item.id] = item.is_in_stock;
    return stock;
  } catch (error) {
    console.warn("[commerce] Could not read Peptides Bali stock:", error);
    return {};
  }
}
