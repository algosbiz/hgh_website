"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

/** Header button that opens the cart and shows how many units it holds. */
export function CartButton() {
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-haspopup="dialog"
      className="relative inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
    >
      <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.75} />
      <span className="sr-only">Open cart, {count} {count === 1 ? "item" : "items"}</span>
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-gold-deep px-1.5 text-[0.7rem] leading-5 font-semibold text-paper tabular-nums"
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
