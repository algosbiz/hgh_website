import { cn } from "@/lib/cn";

const steps = [
  {
    title: "Check the product",
    body: "Confirm the product name and labelled strength on your packaging.",
  },
  {
    title: "Check the batch",
    body: "Match the batch number on your packaging with the batch on the published record.",
  },
  {
    title: "Check the testing",
    body: "Review the independent laboratory documentation for that batch once it is published.",
  },
];

export function VerifySteps({ className }: { className?: string }) {
  return (
    <ol
      className={cn(
        "grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li key={step.title} className="bg-paper p-6">
          <span className="font-display text-sm text-gold-deep tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 font-display text-xl text-ink">{step.title}</p>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
