"use server";

import { headers } from "next/headers";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import {
  ENQUIRY_LIMITS,
  type EnquiryField,
  type EnquiryState,
} from "./enquiry-types";

/*
 * Server-side enquiry handling.
 *
 * Delivery: set RESEND_API_KEY and ENQUIRY_TO_EMAIL (see .env.example) to
 * receive enquiries by email. In development, enquiries are only logged.
 */

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs,
  );
  timestamps.push(now);
  recentSubmissions.set(key, timestamps);
  return timestamps.length > RATE_LIMIT.max;
}

/** Trims, removes control characters and limits length. */
function clean(value: FormDataEntryValue | null, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9 ()-]{6,24}$/;

async function deliverEnquiry(subject: string, body: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL || "HGH Bali <onboarding@resend.dev>";

  if (apiKey && to) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: body,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!response.ok) {
      console.error("[enquiry] Email delivery failed", response.status);
    }
    return response.ok;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(`[enquiry] Development mode — not sent.\n${subject}\n${body}`);
    return true;
  }

  console.error("[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL are not configured.");
  return false;
}

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values = {
    name: clean(formData.get("name"), ENQUIRY_LIMITS.name),
    email: clean(formData.get("email"), ENQUIRY_LIMITS.email),
    phone: clean(formData.get("phone"), ENQUIRY_LIMITS.phone),
    location: clean(formData.get("location"), ENQUIRY_LIMITS.location),
    product: clean(formData.get("product"), 60),
    message: clean(formData.get("message"), ENQUIRY_LIMITS.message),
  };
  const consent = formData.get("consent") === "yes";

  // Honeypot: real visitors never fill this hidden field.
  if (clean(formData.get("website"), 200)) {
    return {
      status: "success",
      message: "Thank you — your enquiry has been sent.",
      fieldErrors: {},
      values: {},
      submissionId: crypto.randomUUID(),
    };
  }

  const fieldErrors: Partial<Record<EnquiryField, string>> = {};
  if (values.name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!values.email && !values.phone) {
    fieldErrors.email = "Please enter an email address or a WhatsApp number.";
  }
  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (values.phone && !PHONE_PATTERN.test(values.phone)) {
    fieldErrors.phone = "Please enter a valid phone number, e.g. +62 812 3456 7890.";
  }
  if (values.location.length < 2) {
    fieldErrors.location = "Please tell us your area or city.";
  }
  const product = products.find((item) => item.id === values.product);
  if (values.product && values.product !== "general" && !product) {
    fieldErrors.product = "Please choose a product from the list.";
  }
  if (!consent) {
    fieldErrors.consent = "Please confirm you agree to us using your details to reply.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message:
        "Too many enquiries were sent from this connection. Please try again later or contact us on WhatsApp.",
      fieldErrors: {},
      values,
    };
  }

  const productLabel = product
    ? `${product.name} (${categories[product.category].name})`
    : "General enquiry";

  const body = [
    `Product: ${productLabel}`,
    `Name: ${values.name}`,
    `Email: ${values.email || "—"}`,
    `WhatsApp / phone: ${values.phone || "—"}`,
    `Location: ${values.location}`,
    "",
    "Message:",
    values.message || "—",
  ].join("\n");

  const delivered = await deliverEnquiry(
    `HGH Bali enquiry — ${productLabel}`,
    body,
    values.email || undefined,
  );

  if (!delivered) {
    return {
      status: "error",
      message:
        "Sorry, your enquiry could not be sent right now. Please try again or contact us on WhatsApp.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your enquiry has been sent. The Atlas Longevity team will reply using the contact details you provided.",
    fieldErrors: {},
    values: {},
    submissionId: crypto.randomUUID(),
    analytics: product
      ? { productId: product.id, productCategory: product.category }
      : undefined,
  };
}
