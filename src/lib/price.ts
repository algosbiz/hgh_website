/**
 * Formats an IDR amount the way Indonesian shops show it: "Rp 1.500.000".
 * Written by hand (not Intl) so the server and every browser render exactly
 * the same text.
 */
export function formatPrice(amount: number): string {
  const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${digits}`;
}
