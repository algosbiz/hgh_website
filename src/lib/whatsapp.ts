import { site } from "@/data/site";

/** Builds a WhatsApp link with a pre-filled, non-sensitive message. */
export function whatsappLink(message?: string): string {
  const text =
    message ??
    "Hi Atlas Longevity, I'm contacting you from HGH Bali. I'd like to ask about product availability.";
  return `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
