import type { ProductCategory } from "@/types/product";
import { categories } from "@/data/categories";
import { TrackEvent } from "@/components/analytics/TrackEvent";
import { ContactCta } from "@/components/home/ContactCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getProductsByCategory, toCatalogueItems } from "@/lib/products";
import { CategoryNav } from "./CategoryNav";
import { ProductGrid } from "./ProductGrid";

/** Shared layout for /products/hgh-boxes/, /products/single-vials/ and /products/pens/. */
export function CategoryPage({ category }: { category: ProductCategory }) {
  const info = categories[category];
  const products = getProductsByCategory(category);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Products", href: "/products/" },
          { label: info.name, href: info.href },
        ]}
        eyebrow={`${products.length} ${info.optionLabel}`}
        title={info.heading}
        intro={info.description}
      >
        <CategoryNav current={category} />
      </PageHeader>

      <section aria-label={info.name} className="py-14 sm:py-20">
        <Container>
          <ProductGrid items={toCatalogueItems(products)} headingLevel="h2" eagerFirst />
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
            Products are grouped by presentation for easier browsing. Products
            within a category are not medically interchangeable — suitability
            should be discussed with a qualified healthcare professional.
          </p>
        </Container>
      </section>

      <ContactCta />
      <TrackEvent
        name="product_list_view"
        params={{ list_id: category, item_count: products.length }}
      />
    </>
  );
}
