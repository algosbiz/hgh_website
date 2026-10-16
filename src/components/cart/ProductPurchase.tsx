"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { addToCart } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { buildCheckoutUrl, peptidesBali } from "@/lib/commerce/peptides-bali";
import { formatPrice } from "@/lib/price";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";

/**
 * Product page purchase box: option picker and price (products with
 * variants), quantity, "Add to cart" (opens the cart) and "Buy now" (goes
 * straight to the Peptides Bali checkout with this product).
 */
export function ProductPurchase({
  productId,
  optionLabel = "Option",
}: {
  productId: string;
  /** Name of the variant choice, e.g. "Pen type". */
  optionLabel?: string;
}) {
  const { productItems, openCart } = useCart();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const items = productItems.get(productId);
  if (!items) return null;

  // Until the visitor chooses, the first option in stock is selected.
  const item =
    items.find((option) => option.id === selectedId) ??
    items.find((option) => option.inStock !== false) ??
    items[0];
  const hasOptions = items.length > 1;

  return (
    <div>
      {hasOptions ? (
        <>
          {item.price !== null ? (
            <p className="font-display text-4xl text-ink tabular-nums">
              {formatPrice(item.price)}
            </p>
          ) : null}

          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-ink">{optionLabel}</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {items.map((option) => {
                const selected = option.id === item.id;
                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer flex-col rounded-2xl border px-4 py-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold-deep",
                      selected
                        ? "border-ink bg-paper shadow-[inset_0_0_0_1px_var(--color-ink)]"
                        : "border-line-strong hover:border-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name={`${productId}-option`}
                      value={option.id}
                      checked={selected}
                      onChange={() => setSelectedId(option.id)}
                      className="sr-only"
                    />
                    <span className="text-[0.95rem] font-medium text-ink">{option.label}</span>
                    {option.price !== null ? (
                      <span className="mt-0.5 text-sm text-body tabular-nums">
                        {formatPrice(option.price)}
                      </span>
                    ) : null}
                    {option.inStock === false ? (
                      <span className="mt-0.5 text-xs text-muted">Out of stock</span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>
        </>
      ) : null}

      {item.inStock === false ? (
        <div
          className={cn(
            "rounded-2xl border border-dashed border-line-strong p-5",
            hasOptions && "mt-6",
          )}
        >
          <p className="font-medium text-ink">Currently out of stock</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {hasOptions
              ? `${item.label} cannot be ordered online right now.`
              : "This product cannot be ordered online right now."}
          </p>
          <Link href="#enquire" className={buttonClasses("secondary", "md", "mt-4")}>
            Ask about availability
          </Link>
        </div>
      ) : (
        <div className={cn(hasOptions && "mt-6")}>
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
      )}
    </div>
  );
}
