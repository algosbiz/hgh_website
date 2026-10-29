import type { Product } from "@/types/product";
import { ProductGallery } from "./ProductGallery";
import { ProductImage } from "./ProductImage";

/**
 * Product page media. The interactive gallery (client JavaScript) is only
 * used when there is more than one image to choose from.
 */
export function ProductMedia({ product }: { product: Product }) {
  if (product.images.length > 1) {
    return (
      <ProductGallery
        images={product.images}
        category={product.category}
        productName={product.name}
      />
    );
  }

  const isIllustrative = product.images.length === 0;

  return (
    <figure>
      <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-sand">
        <ProductImage
          image={product.images[0]}
          category={product.category}
          variant="square"
          sizes="(min-width: 1024px) 40rem, 100vw"
          eager
        />
      </div>
      {isIllustrative ? (
        <figcaption className="mt-3 text-sm text-muted">
          Illustrative image only. Photography of this product will be added
          once it has been approved.
        </figcaption>
      ) : null}
    </figure>
  );
}
