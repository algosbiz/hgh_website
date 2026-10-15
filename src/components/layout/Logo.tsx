import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  preload = false,
}: {
  className?: string;
  preload?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={site.logo.width}
        height={site.logo.height}
        sizes="160px"
        preload={preload}
        className="h-full w-auto"
      />
      <span className="sr-only">{site.name} — home</span>
    </Link>
  );
}
