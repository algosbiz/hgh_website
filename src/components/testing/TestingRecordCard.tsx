import { FileCheck2, FileClock } from "lucide-react";
import { testingFields, type TestingRecord } from "@/data/testing";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** One batch testing record. Pending values are shown as "Pending". */
export function TestingRecordCard({
  record,
  headingLevel: Heading = "h3",
}: {
  record: TestingRecord;
  headingLevel?: "h2" | "h3";
}) {
  const completed = record.status === "completed";

  return (
    <article className="rounded-card border border-line bg-paper p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
            Batch documentation
          </p>
          <Heading className="mt-2 font-display text-2xl font-normal">
            {record.productLabel}
          </Heading>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
            completed
              ? "bg-status-success-bg text-status-success"
              : "border border-dashed border-gold-deep/60 text-gold-deep",
          )}
        >
          {completed ? (
            <FileCheck2 aria-hidden="true" className="size-3.5" />
          ) : (
            <FileClock aria-hidden="true" className="size-3.5" />
          )}
          {completed ? "Completed" : "Pending — not yet verified"}
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {testingFields.map((field) => {
          const value = record[field.key] as string | null;
          return (
            <div key={field.key} className="bg-paper px-4 py-4">
              <dt className="text-xs tracking-wide text-muted uppercase">
                {field.label}
              </dt>
              <dd className={cn("mt-1.5 text-[0.95rem]", value ? "text-ink" : "text-muted italic")}>
                {value ?? "Pending"}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {record.certificateUrl ? (
          <TrackedLink
            href={record.certificateUrl}
            event="testing_document_view"
            params={{ record_id: record.id, document: "certificate" }}
            className={buttonClasses("primary", "md")}
          >
            View full certificate
          </TrackedLink>
        ) : null}
        {record.verifyUrl ? (
          <TrackedLink
            href={record.verifyUrl}
            event="testing_document_view"
            params={{ record_id: record.id, document: "lab-verification" }}
            className={buttonClasses("secondary", "md")}
          >
            Verify with laboratory
          </TrackedLink>
        ) : null}
        {!record.certificateUrl && !record.verifyUrl ? (
          <p className="text-sm leading-relaxed text-muted">
            The certificate will be published here when testing for this batch
            is complete. Until then, this record must not be treated as
            verified.
          </p>
        ) : null}
      </div>
    </article>
  );
}
