import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Accessible accordion built on native <details>/<summary>:
 * keyboard support and expanded state come from the browser, no JavaScript.
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 items-start justify-between gap-6 py-5 text-left font-medium text-ink transition-colors hover:text-gold-deep">
            <span className="text-[1.0625rem] leading-snug">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-transform duration-300 ease-soft group-open:rotate-45"
            >
              <Plus className="size-3.5" strokeWidth={1.75} />
            </span>
          </summary>
          <div className="max-w-3xl pr-12 pb-6 leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
