"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { addToCart } from "@/lib/cart-store";
import { buildCheckoutUrl, peptidesBali } from "@/lib/commerce/peptides-bali";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";

/**
 * Product page purchase box: quantity, "Add to cart" (opens the cart) and
 * "Buy now" (goes straight to the Peptides Bali checkout with this product).
 */
export function ProductPurchase({ productId }: { productId: string }) {
  const { catalogue, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const item = catalogue.get(productId);
  if (!item) return null;

  if (item.inStock === false) {
    return (
      <div className="rounded-2xl border border-dashed border-line-strong p-5">
        <p className="font-medium text-ink">Currently out of stock</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          This product cannot be ordered online right now.
        </p>
        <Link href="#enquire" className={buttonClasses("secondary", "md", "mt-4")}>
          Ask about availability
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-ink">Quantity</span>
        <QuantityStepper value={quantity} onChange={setQuantity} label={item.name} size="lg" />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            addToCart(item.id, quantity);
            trackEvent("add_to_cart", { product_id: item.id, quantity });
            openCart();
          }}
          className={buttonClasses("primary", "lg")}
        >
          <ShoppingBag aria-hidden="true" className="size-4" strokeWidth={1.75} />
          Add to cart
        </button>
        <a
          href={buildCheckoutUrl([{ checkoutId: item.checkoutId, quantity }])}
          onClick={() =>
            trackEvent("begin_checkout", { item_count: 1, quantity, product_id: item.id })
          }
          className={buttonClasses("gold", "lg")}
        >
          Buy now
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        Checkout continues on {peptidesBali.name} ({peptidesBali.domain}).
      </p>
    </div>
  );
}
