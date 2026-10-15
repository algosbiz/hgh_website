import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Narrower width for long-form text pages. */
  size?: "default" | "narrow";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" ? "max-w-3xl" : "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
