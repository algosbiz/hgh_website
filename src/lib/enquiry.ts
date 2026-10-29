import { whatsappLink } from "./whatsapp";

/*
 * Enquiry form → WhatsApp.
 *
 * Nothing is sent to our server: the form builds a WhatsApp message and opens
 * wa.me with it, and the visitor sends it from their own WhatsApp.
 */

export type EnquiryField = "name" | "location" | "product" | "message";

export type EnquiryValues = Record<EnquiryField, string>;

export const ENQUIRY_LIMITS = {
  name: 100,
  location: 120,
  message: 1500,
} as const;

export interface EnquiryProduct {
  id: string;
  name: string;
  category: string;
  categoryName: string;
}

export function validateEnquiry(
  values: EnquiryValues,
  products: EnquiryProduct[],
): Partial<Record<EnquiryField, string>> {
  const errors: Partial<Record<EnquiryField, string>> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (values.location.length < 2) {
    errors.location = "Please tell us your area or city.";
  }
  if (
    values.product !== "general" &&
    !products.some((product) => product.id === values.product)
  ) {
    errors.product = "Please choose a product from the list.";
  }
  return errors;
}

/** The pre-filled WhatsApp link for a valid enquiry. */
export function enquiryWhatsappLink(
  values: EnquiryValues,
  product: EnquiryProduct | undefined,
): string {
  const lines = [
    product
      ? `Hi Atlas Longevity, I'm contacting you from HGH Bali. I'd like to ask about ${product.name} (${product.categoryName}).`
      : "Hi Atlas Longevity, I'm contacting you from HGH Bali. I'd like to make a general enquiry.",
  ];
  if (values.message) lines.push("", values.message);
  lines.push("", `Name: ${values.name}`, `Location: ${values.location}`);
  return whatsappLink(lines.join("\n"));
}
