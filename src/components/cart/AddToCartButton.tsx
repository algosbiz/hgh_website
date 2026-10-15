"use client";

import { ShoppingBag } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { addToCart } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { useCart } from "./CartProvider";

/**
 * Compact "Add to cart" for product cards: adds one unit and opens the cart.
 * Renders nothing for products that are not sold online.
 */
export function AddToCartButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const { catalogue, openCart } = useCart();
  const item = catalogue.get(productId);
  if (!item) return null;

  if (item.inStock === false) {
    return (
      <span
        className={cn(
          "inline-flex min-h-11 items-center rounded-full border border-dashed border-line-strong px-5 text-sm font-medium text-muted",
          className,
        )}
      >
        Out of stock
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(item.id);
        trackEvent("add_to_cart", { product_id: item.id, quantity: 1 });
        openCart();
      }}
      className={buttonClasses("primary", "md", className)}
    >
      <ShoppingBag aria-hidden="true" className="size-4" strokeWidth={1.75} />
      Add to cart
      <span className="sr-only">: {item.name}</span>
    </button>
  );
}
