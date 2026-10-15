"use client";

import { Minus, Plus } from "lucide-react";
import { MAX_CART_QUANTITY } from "@/lib/commerce/peptides-bali";
import { cn } from "@/lib/cn";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  /** Used in the button labels, e.g. "Decrease quantity of Pen Option 1". */
  label: string;
  size?: "sm" | "lg";
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  label,
  size = "sm",
  className,
}: QuantityStepperProps) {
  const buttonClasses = cn(
    "inline-flex items-center justify-center rounded-full text-ink transition-colors hover:bg-sand disabled:cursor-not-allowed disabled:text-line-strong disabled:hover:bg-transparent",
    size === "lg" ? "size-12" : "size-10",
  );

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-paper p-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`Decrease quantity of ${label}`}
        className={buttonClasses}
      >
        <Minus aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </button>
      <output
        aria-live="polite"
        aria-label={`Quantity of ${label}`}
        className={cn(
          "text-center font-semibold text-ink tabular-nums",
          size === "lg" ? "w-10 text-lg" : "w-8",
        )}
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_CART_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
        className={buttonClasses}
      >
        <Plus aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </button>
    </div>
  );
}
