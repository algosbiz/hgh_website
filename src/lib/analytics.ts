/**
 * Privacy-appropriate GA4 event helper.
 *
 * - Events are only sent if the visitor accepted analytics (gtag is only
 *   loaded after consent — see components/analytics/Analytics.tsx).
 * - Never send names, emails, phone numbers, messages or health information.
 */

export type AnalyticsEvent =
  | "product_list_view"
  | "product_detail_view"
  | "product_category_filter"
  | "testing_document_view"
  | "availability_enquiry"
  | "contact_form_submit"
  | "add_to_cart"
  | "begin_checkout"
  | "whatsapp_click";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: AnalyticsEvent, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}

export const CONSENT_STORAGE_KEY = "hghbali-analytics-consent";
export const CONSENT_EVENT = "hghbali:consent-change";
