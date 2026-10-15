import type { ProductStatus } from "@/types/product";
import { statusInfo } from "@/lib/product-status";
import { cn } from "@/lib/cn";

const styles: Record<ProductStatus, { badge: string; dot: string }> = {
  draft: {
    badge: "bg-status-neutral-bg text-status-neutral",
    dot: "bg-status-neutral/60",
  },
  "information-only": {
    badge: "bg-status-info-bg text-status-info",
    dot: "bg-status-info",
  },
  "verification-required": {
    badge: "bg-status-warning-bg text-status-warning",
    dot: "bg-status-warning",
  },
  unavailable: {
    badge: "bg-status-danger-bg text-status-danger",
    dot: "bg-status-danger",
  },
  "documentation-pending": {
    badge: "border border-dashed border-gold-deep/60 bg-paper text-gold-deep",
    dot: "bg-gold",
  },
  approved: {
    badge: "bg-status-success-bg text-status-success",
    dot: "bg-status-success",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const style = styles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        style.badge,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", style.dot)} />
      <span className="sr-only">Status: </span>
      {statusInfo[status].label}
    </span>
  );
}
