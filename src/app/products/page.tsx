import { ContactCta } from "@/components/home/ContactCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterableCatalogue } from "@/components/products/FilterableCatalogue";
import { StatusLegend } from "@/components/products/StatusLegend";
import { Container } from "@/components/ui/Container";
import { getAllProducts, toCatalogueItems } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Product Catalogue — HGH Boxes & Pens",
  description:
    "The HGH Bali product catalogue by Atlas Longevity: HGH box and pen options with labelled specifications, packaging details and batch documentation.",
  path: "/products/",
});

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Products", href: "/products/" }]}
        eyebrow="Catalogue"
        title="Product catalogue"
        intro={`${products.length} options across two categories. Every specification is taken from the product label or supporting documentation — anything not yet confirmed is clearly marked.`}
      />

      <section aria-label="Products" className="py-14 sm:py-20">
        <Container>
          <FilterableCatalogue
            items={toCatalogueItems(products)}
            listId="catalogue"
            headingLevel="h2"
          />
        </Container>
      </section>

      <section aria-label="Product status" className="pb-6">
        <Container>
          <StatusLegend />
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
