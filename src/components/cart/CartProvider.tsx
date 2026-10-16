"use client";

import { createContext, use, useMemo, useState, useSyncExternalStore } from "react";
import type { CartCatalogueItem } from "@/types/cart";
import { getCartSnapshot, getServerCartSnapshot, subscribeCart } from "@/lib/cart-store";

interface ResolvedLine {
  item: CartCatalogueItem;
  quantity: number;
}

interface CartContextValue {
  /** Everything that can be added to the cart, by cart item ID. */
  catalogue: Map<string, CartCatalogueItem>;
  /** The same items grouped by HGH Bali product ID (several for variants). */
  productItems: Map<string, CartCatalogueItem[]>;
  lines: ResolvedLine[];
  /** Total number of units in the cart. */
  count: number;
  /** Increases on every openCart() call; the drawer opens when it changes. */
  openSignal: number;
  openCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const value = use(CartContext);
  if (!value) throw new Error("useCart must be used inside <CartProvider>");
  return value;
}

export function CartProvider({
  catalogue: items,
  children,
}: {
  catalogue: CartCatalogueItem[];
  children: React.ReactNode;
}) {
  const [openSignal, setOpenSignal] = useState(0);
  const saved = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);

  const value = useMemo<CartContextValue>(() => {
    const catalogue = new Map(items.map((item) => [item.id, item]));
    const productItems = new Map<string, CartCatalogueItem[]>();
    for (const item of items) {
      productItems.set(item.productId, [...(productItems.get(item.productId) ?? []), item]);
    }
    // Lines for products that are no longer sold online are ignored.
    const lines = saved.flatMap((line) => {
      const item = catalogue.get(line.id);
      return item ? [{ item, quantity: line.quantity }] : [];
    });
    return {
      catalogue,
      productItems,
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      openSignal,
      openCart: () => setOpenSignal((signal) => signal + 1),
    };
  }, [items, saved, openSignal]);

  return <CartContext value={value}>{children}</CartContext>;
}
