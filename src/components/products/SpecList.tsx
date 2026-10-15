import type { ProductSpec } from "@/types/product";
import { cn } from "@/lib/cn";

export function SpecValue({ value }: { value: string | null }) {
  if (value === null) {
    return <span className="text-muted italic">To be confirmed</span>;
  }
  return <span className="text-ink">{value}</span>;
}

interface SpecListProps {
  specs: ProductSpec[];
  className?: string;
  size?: "sm" | "md";
}

/** Two-column specification list (label / value) with hairline dividers. */
export function SpecList({ specs, className, size = "md" }: SpecListProps) {
  return (
    <dl
      className={cn(
        "divide-y divide-line border-y border-line",
        size === "sm" ? "text-sm" : "text-[0.95rem]",
        className,
      )}
    >
      {specs.map((spec) => (
        <div
          key={spec.label}
          className={cn(
            "grid grid-cols-[minmax(6rem,1fr)_minmax(0,max-content)] gap-4",
            size === "sm" ? "py-2.5" : "py-3.5",
          )}
        >
          <dt className="text-muted">{spec.label}</dt>
          <dd className="text-right tabular-nums">
            <SpecValue value={spec.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
