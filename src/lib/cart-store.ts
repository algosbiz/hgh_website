import type { CartLine } from "@/types/cart";
import { MAX_CART_QUANTITY } from "@/lib/commerce/peptides-bali";

/**
 * The cart, saved in the visitor's browser (localStorage) and shared between
 * tabs. Read it in components with `useSyncExternalStore(subscribeCart,
 * getCartSnapshot, getServerCartSnapshot)` — see CartProvider.
 */

const STORAGE_KEY = "hghbali-cart";
const CHANGE_EVENT = "hghbali:cart-change";
const EMPTY: CartLine[] = [];

let cache: { raw: string | null; lines: CartLine[] } | null = null;
// Used instead of localStorage when it is blocked (e.g. some private modes).
let memoryOnly = false;
let memoryRaw: string | null = null;

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return EMPTY;
    return value.flatMap((line) =>
      typeof line?.id === "string" && Number.isInteger(line?.quantity) && line.quantity > 0
        ? [{ id: line.id, quantity: Math.min(line.quantity, MAX_CART_QUANTITY) }]
        : [],
    );
  } catch {
    return EMPTY;
  }
}

function readRaw(): string | null {
  if (memoryOnly) return memoryRaw;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    memoryOnly = true;
    return memoryRaw;
  }
}

export function getCartSnapshot(): CartLine[] {
  const raw = readRaw();
  // Same string → same array, so React does not re-render needlessly.
  if (!cache || cache.raw !== raw) cache = { raw, lines: parse(raw) };
  return cache.lines;
}

export function getServerCartSnapshot(): CartLine[] {
  return EMPTY;
}

export function subscribeCart(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function save(lines: CartLine[]) {
  const raw = lines.length === 0 ? null : JSON.stringify(lines);
  if (!memoryOnly) {
    try {
      if (raw === null) {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, raw);
      }
    } catch {
      // Storage blocked: keep the cart in memory for this page only.
      memoryOnly = true;
    }
  }
  memoryRaw = raw;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const clamp = (quantity: number) =>
  Math.max(1, Math.min(Math.floor(quantity), MAX_CART_QUANTITY));

export function addToCart(id: string, quantity = 1) {
  const lines = getCartSnapshot();
  const existing = lines.find((line) => line.id === id);
  save(
    existing
      ? lines.map((line) =>
          line.id === id ? { ...line, quantity: clamp(line.quantity + quantity) } : line,
        )
      : [...lines, { id, quantity: clamp(quantity) }],
  );
}

export function setCartQuantity(id: string, quantity: number) {
  if (quantity < 1) {
    removeFromCart(id);
    return;
  }
  save(
    getCartSnapshot().map((line) =>
      line.id === id ? { ...line, quantity: clamp(quantity) } : line,
    ),
  );
}

export function removeFromCart(id: string) {
  save(getCartSnapshot().filter((line) => line.id !== id));
}

export function clearCart() {
  save(EMPTY);
}
