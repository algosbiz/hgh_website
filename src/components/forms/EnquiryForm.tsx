"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitEnquiry } from "@/lib/enquiry";
import {
  ENQUIRY_LIMITS,
  initialEnquiryState,
  type EnquiryField,
} from "@/lib/enquiry-types";
import { trackEvent } from "@/lib/analytics";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export interface ProductOption {
  id: string;
  name: string;
  categoryName: string;
}

interface EnquiryFormProps {
  products: ProductOption[];
  /** Pre-selects a product (used on product pages). */
  defaultProductId?: string;
}

const inputClasses =
  "block w-full rounded-xl border border-line-strong bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/80 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep aria-[invalid=true]:border-status-danger";

export function EnquiryForm({ products, defaultProductId }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(
    submitEnquiry,
    initialEnquiryState,
  );
  const baseId = useId();
  const trackedSubmission = useRef<string | undefined>(undefined);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "success" || !state.submissionId) return;
    if (trackedSubmission.current === state.submissionId) return;
    trackedSubmission.current = state.submissionId;

    if (state.analytics?.productId) {
      trackEvent("availability_enquiry", {
        product_id: state.analytics.productId,
        product_category: state.analytics.productCategory,
      });
    } else {
      trackEvent("contact_form_submit", { enquiry_type: "general" });
    }
  }, [state]);

  useEffect(() => {
    if (state.status === "error") errorSummaryRef.current?.focus();
  }, [state]);

  const fieldId = (field: EnquiryField) => `${baseId}-${field}`;
  const errorId = (field: EnquiryField) => `${baseId}-${field}-error`;
  const errorFor = (field: EnquiryField) => state.fieldErrors[field];
  const describedBy = (field: EnquiryField, hintId?: string) =>
    [errorFor(field) ? errorId(field) : null, hintId].filter(Boolean).join(" ") ||
    undefined;

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-line bg-paper p-8 text-center sm:p-10"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto size-10 text-status-success"
          strokeWidth={1.5}
        />
        <p className="mt-4 font-display text-2xl text-ink">Enquiry sent</p>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  const selectedProduct = state.values.product ?? defaultProductId ?? "general";

  return (
    <form action={formAction} noValidate className="relative grid gap-6">
      {state.status === "error" ? (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-status-danger/30 bg-status-danger-bg px-4 py-3 text-sm text-status-danger"
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" id={fieldId("name")} error={errorFor("name")} errorId={errorId("name")} required>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={ENQUIRY_LIMITS.name}
            defaultValue={state.values.name}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={describedBy("name")}
            className={inputClasses}
          />
        </Field>

        <Field
          label="Your location"
          id={fieldId("location")}
          error={errorFor("location")}
          errorId={errorId("location")}
          required
        >
          <input
            id={fieldId("location")}
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Canggu, Bali"
            required
            maxLength={ENQUIRY_LIMITS.location}
            defaultValue={state.values.location}
            aria-invalid={Boolean(errorFor("location"))}
            aria-describedby={describedBy("location")}
            className={inputClasses}
          />
        </Field>

        <Field label="Email" id={fieldId("email")} error={errorFor("email")} errorId={errorId("email")}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={ENQUIRY_LIMITS.email}
            defaultValue={state.values.email}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={describedBy("email", `${baseId}-contact-hint`)}
            className={inputClasses}
          />
        </Field>

        <Field label="WhatsApp / phone" id={fieldId("phone")} error={errorFor("phone")} errorId={errorId("phone")}>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+62"
            maxLength={ENQUIRY_LIMITS.phone}
            defaultValue={state.values.phone}
            aria-invalid={Boolean(errorFor("phone"))}
            aria-describedby={describedBy("phone", `${baseId}-contact-hint`)}
            className={inputClasses}
          />
        </Field>
        <p id={`${baseId}-contact-hint`} className="-mt-3 text-sm text-muted sm:col-span-2">
          Provide an email address, a WhatsApp number, or both.
        </p>
      </div>

      <Field label="Product" id={fieldId("product")} error={errorFor("product")} errorId={errorId("product")}>
        <select
          id={fieldId("product")}
          name="product"
          defaultValue={selectedProduct}
          aria-invalid={Boolean(errorFor("product"))}
          aria-describedby={describedBy("product")}
          className={cn(inputClasses, "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23101a21' stroke-width='1.75'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="general">General enquiry</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} — {product.categoryName}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message"
        optional
        id={fieldId("message")}
        error={errorFor("message")}
        errorId={errorId("message")}
      >
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          maxLength={ENQUIRY_LIMITS.message}
          defaultValue={state.values.message}
          aria-describedby={`${baseId}-message-hint`}
          className={cn(inputClasses, "resize-y")}
        />
        <p id={`${baseId}-message-hint`} className="mt-2 text-sm text-muted">
          Please do not include medical history or other health information.
        </p>
      </Field>

      {/* Honeypot field — hidden from people, filled in by spam bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${baseId}-website`}>Website</label>
        <input id={`${baseId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            value="yes"
            required
            aria-invalid={Boolean(errorFor("consent"))}
            aria-describedby={describedBy("consent")}
            className="mt-1 size-5 shrink-0 rounded border-line-strong accent-ink"
          />
          <label htmlFor={fieldId("consent")} className="text-sm leading-relaxed text-body">
            I agree to Atlas Longevity using these details to respond to my
            enquiry, as described in the{" "}
            <Link href="/privacy-policy/" className="text-ink underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errorFor("consent") ? (
          <p id={errorId("consent")} className="mt-2 text-sm text-status-danger">
            {errorFor("consent")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
        >
          {pending ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
        <p className="text-sm text-muted">
          This form does not place an order or take payment.
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  errorId: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}

function Field({ label, id, error, errorId, required, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-gold-deep">*</span>
        ) : null}
        {optional ? <span className="ml-1.5 font-normal text-muted">(optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-status-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
