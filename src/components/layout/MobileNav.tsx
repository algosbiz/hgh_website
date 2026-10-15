"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import type { NavItem } from "@/data/site";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { isActive, isCurrent } from "@/lib/nav";

interface MobileNavProps {
  items: NavItem[];
  whatsappHref: string;
}

/**
 * Mobile menu using the native <dialog> element, which provides focus
 * trapping, Escape-to-close and an accessible modal role.
 */
export function MobileNav({ items, whatsappHref }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-sm bg-cream p-0 text-body shadow-lift backdrop:bg-ink/45"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <span className="font-display text-xl text-ink">Menu</span>
            <button
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.75} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.href} className="py-1">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={
                      isCurrent(pathname, item.href) ? "page" : undefined
                    }
                    className={cn(
                      "flex min-h-12 items-center font-display text-[1.375rem] text-ink",
                      isActive(pathname, item.href) && "text-gold-deep",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <ul className="mb-2 ml-1 border-l border-line pl-4">
                      {item.children
                        .filter((child) => child.href !== item.href)
                        .map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={close}
                              aria-current={
                                isCurrent(pathname, child.href)
                                  ? "page"
                                  : undefined
                              }
                              className="flex min-h-11 items-center text-[0.95rem] text-body aria-[current=page]:text-gold-deep"
                            >
                              {child.label}
                              {child.description ? (
                                <span className="ml-2 text-sm text-muted">
                                  · {child.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 border-t border-line px-5 py-5">
            <Link
              href="/contact/"
              onClick={close}
              className={buttonClasses("primary", "lg", "w-full")}
            >
              Send an enquiry
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("secondary", "lg", "w-full")}
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </dialog>
    </div>
  );
}
