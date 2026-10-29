import Image from "next/image";
import type { ProductCategory, ProductImage as ProductImageType } from "@/types/product";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

interface ProductImageProps {
  image?: ProductImageType;
  category: ProductCategory;
  sizes: string;
  /** Which illustrative render to use when there is no product photo. */
  variant?: "wide" | "square";
  /**
   * For the image most likely to be the Largest Contentful Paint (the main
   * product photo, the first catalogue card): load it straight away with high
   * fetch priority instead of lazily.
   */
  eager?: boolean;
  className?: string;
  /** Show the "Illustrative image" label on the fallback render. */
  showIllustrativeLabel?: boolean;
}

/**
 * Fills its (aspect-ratio) parent. Shows the approved product photo when
 * available; otherwise a generic, clearly labelled render for the category.
 */
export function ProductImage({
  image,
  category,
  sizes,
  variant = "wide",
  eager = false,
  className,
  showIllustrativeLabel = true,
}: ProductImageProps) {
  if (image) {
    // Product photos have white backgrounds, so they sit on white.
    return (
      <>
        <span aria-hidden="true" className="absolute inset-0 bg-paper" />
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className={cn("object-contain p-6", className)}
        />
      </>
    );
  }

  const illustration = categories[category].illustration[variant];

  return (
    <>
      <Image
        src={illustration.src}
        alt={illustration.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className={cn("object-cover", className)}
      />
      {showIllustrativeLabel ? <IllustrativeLabel /> : null}
    </>
  );
}

export function IllustrativeLabel({
  position = "bottom-left",
}: {
  position?: "bottom-left" | "top-right";
}) {
  return (
    <span
      className={cn(
        "absolute rounded-full bg-paper/85 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.14em] text-muted uppercase backdrop-blur-sm",
        position === "bottom-left" ? "bottom-3 left-3" : "top-4 right-4",
      )}
    >
      Illustrative image
    </span>
  );
}
