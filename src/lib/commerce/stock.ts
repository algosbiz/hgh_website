import { cacheLife } from "next/cache";
import { products } from "@/data/products";
import { getCheckoutOptions, peptidesBali } from "./peptides-bali";

/** What Peptides Bali reports for one checkout ID. */
export interface DestinationProduct {
  inStock: boolean;
  /** Current price in IDR, or `null` when it could not be read. */
  price: number | null;
}

/** Stock and price per checkout ID. A missing ID means "unknown". */
export type DestinationMap = Record<number, DestinationProduct>;

interface StoreApiProduct {
  id: number;
  is_in_stock: boolean;
  prices?: {
    /** In minor units, e.g. "150000000" with `currency_minor_unit: 2`. */
    price: string;
    currency_code: string;
    currency_minor_unit: number;
  };
}

function toPrice(prices: StoreApiProduct["prices"]): number | null {
  if (!prices || prices.currency_code !== "IDR") return null;
  const amount = Number(prices.price) / 10 ** prices.currency_minor_unit;
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

async function fetchProducts(ids: number[], type?: "variation"): Promise<StoreApiProduct[]> {
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
 * Stock and price of every mapped product on Peptides Bali, read from the
 * public WooCommerce Store API and refreshed hourly. If the store cannot be
 * reached, both are unknown: products stay available to add to the cart
 * (WooCommerce still checks stock at checkout) and the price from
 * `products.ts` is shown.
 */
export async function getDestinationProducts(): Promise<DestinationMap> {
  "use cache";
  cacheLife("hours");

  const variationIds: number[] = [];
  const productIds: number[] = [];
  for (const product of products) {
    for (const { checkoutId } of getCheckoutOptions(product)) {
      // A checkout ID equal to the product ID is a simple (non-variable) product.
      (checkoutId === product.commerce.productId ? productIds : variationIds).push(checkoutId);
    }
  }

  try {
    const results = await Promise.all([
      fetchProducts(variationIds, "variation"),
      fetchProducts(productIds),
    ]);
    const destination: DestinationMap = {};
    for (const item of results.flat()) {
      destination[item.id] = { inStock: item.is_in_stock, price: toPrice(item.prices) };
    }
    return destination;
  } catch (error) {
    console.warn("[commerce] Could not read Peptides Bali stock and prices:", error);
    return {};
  }
}
