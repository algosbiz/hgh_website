import fs from "node:fs";
import path from "node:path";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/data/site";
import { getProductAction } from "@/lib/commerce";
import { getCheckoutOptions } from "@/lib/commerce/peptides-bali";
import type { DestinationMap } from "@/lib/commerce/stock";
import { absoluteUrl } from "@/lib/seo";
import type { CartCatalogueItem } from "@/types/cart";
import type {
  CatalogueItem,
  Product,
  ProductCategory,
  ProductImage,
  ProductPrice,
} from "@/types/product";

/**
 * Removes images whose file does not exist in /public, so a typo in
 * `products.ts` shows the fallback illustration instead of a broken image.
 */
function withExistingImages(product: Product): Product {
  const images = product.images.filter((image: ProductImage) => {
    const filePath = path.join(process.cwd(), "public", image.src);
    const exists = fs.existsSync(filePath);
    if (!exists && process.env.NODE_ENV !== "production") {
      console.warn(
        `[products] Image not found for "${product.slug}": public${image.src}`,
      );
    }
    return exists;
  });
  return { ...product, images };
}

export function getAllProducts(): Product[] {
  return products.map(withExistingImages);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return getAllProducts().filter((product) => product.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  const product = products.find((item) => item.slug === slug);
  return product ? withExistingImages(product) : undefined;
}

/** Other products in the same category (for catalogue navigation only). */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, limit);
}

/** Minimal product list for the enquiry form's product selector. */
export function getProductOptions() {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    categoryName: categories[product.category].name,
  }));
}

function approvedAmount(price: ProductPrice | null): number | null {
  return price?.approvedForDisplay ? price.amount : null;
}

/**
 * The price shown on the website before live prices apply — the lowest
 * variant price for products with variants — or `null`.
 */
export function getDisplayPrice(product: Product): number | null {
  if (!product.variants) return approvedAmount(product.price);
  const amounts = product.variants.options.flatMap((variant) => {
    const amount = approvedAmount(variant.price);
    return amount === null ? [] : [amount];
  });
  return amounts.length > 0 ? Math.min(...amounts) : null;
}

/**
 * Everything that can be added to the cart (one item per product, or per
 * variant), with its Peptides Bali stock and price. The live price is only
 * used where a price may be shown.
 */
export function getCartCatalogue(destination: DestinationMap): CartCatalogueItem[] {
  return getAllProducts().flatMap((product) => {
    if (getProductAction(product).kind !== "cart") return [];
    const category = categories[product.category];
    const image = product.images[0] ?? category.illustration.square;
    return getCheckoutOptions(product).map(({ variant, checkoutId }) => {
      const live = destination[checkoutId];
      const fallbackPrice = approvedAmount(variant ? variant.price : product.price);
      return {
        id: variant ? `${product.id}:${variant.id}` : product.id,
        productId: product.id,
        name: product.name,
        label: variant?.label ?? category.itemLabel,
        href: `/products/${product.slug}/`,
        image: { src: image.src, alt: image.alt },
        checkoutId,
        inStock: live?.inStock ?? null,
        price: fallbackPrice === null ? null : (live?.price ?? fallbackPrice),
      };
    });
  });
}

const availability = (inStock: boolean) =>
  inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";

/**
 * schema.org Product data for a product page, with the prices shown on the
 * page: the live Peptides Bali price per variant when the product is sold
 * through the cart, otherwise the approved display price.
 */
export function getProductJsonLd(product: Product, destination: DestinationMap) {
  const url = absoluteUrl(`/products/${product.slug}/`);
  const image = product.images[0] ?? categories[product.category].illustration.square;
  const options = getCartCatalogue(destination).flatMap((item) =>
    item.productId === product.id && item.price !== null
      ? [{ price: item.price, inStock: item.inStock }]
      : [],
  );
  const displayPrice = getDisplayPrice(product);
  if (options.length === 0 && displayPrice !== null) {
    options.push({ price: displayPrice, inStock: null });
  }

  const known = options.flatMap(({ inStock }) => (inStock === null ? [] : [inStock]));
  const stock = known.length > 0 ? { availability: availability(known.some(Boolean)) } : {};
  const prices = options.map(({ price }) => price);
  const offers =
    options.length === 0
      ? undefined
      : options.length === 1
        ? { "@type": "Offer", price: prices[0], priceCurrency: "IDR", url, ...stock }
        : {
            "@type": "AggregateOffer",
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: options.length,
            priceCurrency: "IDR",
            ...stock,
          };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: absoluteUrl(image.src),
    sku: product.id,
    category: categories[product.category].name,
    brand: { "@type": "Brand", name: site.legalName },
    url,
    ...(offers ? { offers } : {}),
  };
}

/** Draft products are visible in the catalogue but are not indexed. */
export function isIndexableProduct(product: Product): boolean {
  return product.status !== "draft";
}

/** The catalogue index number shown on cards, e.g. "001". */
export function getCatalogueNumber(product: Product): string {
  const index = products.findIndex((item) => item.id === product.id);
  return String(index + 1).padStart(3, "0");
}

/** Products paired with their catalogue numbers, ready for product grids. */
export function toCatalogueItems(list: Product[]): CatalogueItem[] {
  return list.map((product) => ({
    product,
    number: getCatalogueNumber(product),
  }));
}
