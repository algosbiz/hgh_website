import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Optional element shown to the right of the heading on large screens. */
  action?: React.ReactNode;
  id?: string;
  className?: string;
  /** Use "h1" only for page-level headings. */
  as?: "h1" | "h2";
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-6 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  id,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        Boolean(action) && !centered && "lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <Heading
          id={id}
          className="font-display text-[2rem] leading-[1.1] font-normal tracking-[-0.015em] sm:text-[2.5rem]"
        >
          {title}
        </Heading>
        {description ? (
          <div className="mt-4 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
            {description}
          </div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
