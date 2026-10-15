"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductCategory, ProductImage as ProductImageType } from "@/types/product";
import { cn } from "@/lib/cn";
import { ProductImage } from "./ProductImage";

interface ProductGalleryProps {
  images: ProductImageType[];
  category: ProductCategory;
  productName: string;
}

/** Main image with selectable thumbnails. Falls back to an illustration. */
export function ProductGallery({ images, category, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-sand">
        <ProductImage
          image={current}
          category={category}
          variant="square"
          sizes="(min-width: 1024px) 40rem, 100vw"
          preload
        />
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-5" aria-label={`${productName} images`}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={index === selected}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-xl border bg-sand transition-colors",
                  index === selected
                    ? "border-ink"
                    : "border-line hover:border-line-strong",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="6rem"
                  className="object-contain p-2"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
