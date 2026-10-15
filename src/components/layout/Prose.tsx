import { cn } from "@/lib/cn";

/** Typography for long-form text (legal pages, articles). */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-[1.0625rem] leading-[1.75] text-body",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-[1.625rem] [&_h2]:leading-tight [&_h2]:font-normal [&_h2]:text-ink [&>h2:first-child]:mt-0",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-ink",
        "[&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-gold",
        "[&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-ink",
        className,
      )}
    >
      {children}
    </div>
  );
}
