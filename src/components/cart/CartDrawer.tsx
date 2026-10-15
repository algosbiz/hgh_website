"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { clearCart, removeFromCart, setCartQuantity } from "@/lib/cart-store";
import { buildCheckoutUrl, peptidesBali } from "@/lib/commerce/peptides-bali";
import { useCart } from "./CartProvider";
import { QuantityStepper } from "./QuantityStepper";

/**
 * Slide-in cart using the native <dialog> element (focus trap, Escape to
 * close). "Proceed to Checkout" opens the Peptides Bali checkout with every
 * in-stock line already in its cart.
 */
export function CartDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { lines, count, openSignal } = useCart();
  const closeCart = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openSignal > 0 && dialog && !dialog.open) dialog.showModal();
  }, [openSignal]);

  const checkoutLines = lines.filter((line) => line.item.inStock !== false);
  const checkoutUrl =
    checkoutLines.length > 0
      ? buildCheckoutUrl(
          checkoutLines.map((line) => ({
            checkoutId: line.item.checkoutId,
            quantity: line.quantity,
          })),
        )
      : null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      onClick={(event) => {
        if (event.target === dialogRef.current) closeCart();
      }}
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-paper p-0 text-body shadow-lift backdrop:bg-ink/45"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-7">
          <h2 id="cart-title" className="font-sans text-2xl font-semibold text-ink">
            Cart <span className="font-normal text-muted">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
          >
            <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
            <span className="sr-only">Close cart</span>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-sand text-gold-deep">
              <ShoppingBag aria-hidden="true" className="size-7" strokeWidth={1.5} />
            </span>
            <p className="mt-5 font-display text-2xl text-ink">Your cart is empty</p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              Add an HGH box or pen to continue to checkout.
            </p>
            <Link
              href="/products/"
              onClick={closeCart}
              className={buttonClasses("secondary", "md", "mt-6")}
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              {lines.map(({ item, quantity }) => (
                <li key={item.id} className="flex gap-4 rounded-2xl bg-sand p-4">
                  <Link
                    href={item.href}
                    onClick={closeCart}
                    className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-line bg-paper"
                  >
                    <Image
                      src={item.image.src}
                      alt=""
                      fill
                      sizes="6rem"
                      className="object-cover"
                    />
                    <span className="sr-only">{item.name}</span>
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[1.05rem] leading-snug font-semibold text-ink">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm text-muted">{item.label}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="-mt-2 -mr-2 inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-status-danger"
                      >
                        <Trash2 aria-hidden="true" className="size-4.5" strokeWidth={1.75} />
                        <span className="sr-only">Remove {item.name}</span>
                      </button>
                    </div>

                    <QuantityStepper
                      value={quantity}
                      onChange={(value) => setCartQuantity(item.id, value)}
                      label={item.name}
                      className="mt-3"
                    />

                    {item.inStock === false ? (
                      <p className="mt-2 text-xs leading-relaxed text-status-danger">
                        Out of stock — not included at checkout.
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-6 sm:px-7">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-ink">Items</span>
                <span className="font-semibold text-ink tabular-nums">{count}</span>
              </div>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                Checkout continues on {peptidesBali.name} ({peptidesBali.domain}),
                where prices, delivery and payment are confirmed.
              </p>

              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  onClick={() =>
                    trackEvent("begin_checkout", {
                      item_count: checkoutLines.length,
                      quantity: checkoutLines.reduce((total, line) => total + line.quantity, 0),
                    })
                  }
                  className={buttonClasses("gold", "lg", "mt-6 min-h-14 w-full text-[1.05rem]")}
                >
                  <ShoppingBag aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  Proceed to Checkout
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <p className="mt-6 rounded-2xl bg-status-danger-bg p-4 text-sm text-status-danger">
                  The items in your cart are out of stock. Remove them or{" "}
                  <Link href="/contact/" onClick={closeCart} className="underline underline-offset-4">
                    ask about availability
                  </Link>
                  .
                </p>
              )}

              <button
                type="button"
                onClick={clearCart}
                className="mx-auto mt-3 flex min-h-11 items-center px-4 text-[0.95rem] text-body underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
