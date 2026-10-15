"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/data/site";
import { cn } from "@/lib/cn";
import { isActive, isCurrent } from "@/lib/nav";

const linkClasses =
  "relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.9rem] text-body transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:bottom-2 aria-[current=page]:after:h-px aria-[current=page]:after:bg-gold";

function DropdownItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const active = isActive(pathname, item.href);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          linkClasses,
          "gap-1.5",
          active &&
            "text-ink after:absolute after:inset-x-3.5 after:bottom-2 after:h-px after:bg-gold",
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 w-72 -translate-x-1/2 pt-3"
      >
        <ul className="overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-lift">
          {item.children?.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(pathname, child.href) ? "page" : undefined}
                className="block rounded-xl px-4 py-3 transition-colors hover:bg-sand aria-[current=page]:bg-sand"
              >
                <span className="block text-[0.95rem] font-medium text-ink">
                  {child.label}
                </span>
                {child.description ? (
                  <span className="mt-0.5 block text-sm text-muted">
                    {child.description}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center">
        {items.map((item) =>
          item.children ? (
            <DropdownItem key={item.href} item={item} pathname={pathname} />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={linkClasses}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
