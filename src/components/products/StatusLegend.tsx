import type { ProductStatus } from "@/types/product";
import { statusInfo } from "@/lib/product-status";
import { StatusBadge } from "./StatusBadge";

const order: ProductStatus[] = [
  "draft",
  "information-only",
  "verification-required",
  "documentation-pending",
  "unavailable",
  "approved",
];

/**
 * Explains the statuses shown on the listed products (pass only statuses with
 * a badge). Statuses are not quality claims.
 */
export function StatusLegend({ statuses }: { statuses: ProductStatus[] }) {
  return (
    <div className="rounded-[1.75rem] border border-line bg-paper p-7 sm:p-10">
      <h2 className="font-display text-2xl font-normal">Understanding product status</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Some listings show where they are in our publication and compliance
        review. A status describes the listing — it is not a quality
        certification or a recommendation.
      </p>
      <dl className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
        {order.filter((status) => statuses.includes(status)).map((status) => (
          <div key={status} className="flex flex-col items-start gap-2 border-t border-line pt-5">
            <dt>
              <StatusBadge status={status} />
            </dt>
            <dd className="text-[0.95rem] leading-relaxed text-muted">
              {statusInfo[status].description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
