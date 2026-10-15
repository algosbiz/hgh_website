import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "gold" | "light" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-200 ease-soft disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-cream hover:bg-ink-soft",
  secondary:
    "border border-line-strong bg-paper/60 text-ink hover:border-ink hover:bg-paper",
  // Checkout / buy actions.
  gold: "bg-linear-to-b from-gold to-gold-deep to-70% font-semibold text-paper shadow-[0_14px_28px_-14px_rgb(138_95_20/0.7)] hover:from-gold-deep",
  light: "bg-cream text-ink hover:bg-paper",
  "outline-light":
    "border border-cream/30 text-cream hover:border-cream hover:bg-cream/10",
  ghost: "text-ink underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-7 text-[0.95rem]",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens external links in a new tab with safe rel attributes. */
  external?: boolean;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external = false,
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
