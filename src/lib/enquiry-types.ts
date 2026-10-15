export type EnquiryField =
  | "name"
  | "email"
  | "phone"
  | "location"
  | "product"
  | "message"
  | "consent";

export interface EnquiryState {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<EnquiryField, string>>;
  /** Submitted values, used to refill the form after a validation error. */
  values: Partial<Record<Exclude<EnquiryField, "consent">, string>>;
  /** Changes on every successful submission (used for analytics). */
  submissionId?: string;
  /** Non-sensitive details for analytics after a successful submission. */
  analytics?: {
    productId?: string;
    productCategory?: string;
  };
}

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
};

export const ENQUIRY_LIMITS = {
  name: 100,
  email: 160,
  phone: 24,
  location: 120,
  message: 1500,
} as const;
