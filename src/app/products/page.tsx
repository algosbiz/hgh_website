import { ContactCta } from "@/components/home/ContactCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterableCatalogue } from "@/components/products/FilterableCatalogue";
import { StatusLegend } from "@/components/products/StatusLegend";
import { Container } from "@/components/ui/Container";
import { showsStatusBadge } from "@/lib/product-status";
import { getAllProducts, toCatalogueItems } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HGH Products — Somatropin Pens, Vials & Boxes",
  description:
    "The full HGH Bali catalogue by Atlas Longevity: somatropin pens, single vials and boxes from 10 to 180 IU, with labelled specifications and current prices.",
  path: "/products/",
});

export default function ProductsPage() {
  const products = getAllProducts();
  const badgeStatuses = [...new Set(products.map((product) => product.status))].filter(
    showsStatusBadge,
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Products", href: "/products/" }]}
        eyebrow="Catalogue"
        title="HGH product catalogue"
        intro={`${products.length} options across three categories. Every specification is taken from the product label or supporting documentation — anything not yet confirmed is clearly marked.`}
      />

      <section aria-label="Products" className="py-14 sm:py-20">
        <Container>
          <FilterableCatalogue
            items={toCatalogueItems(products)}
            listId="catalogue"
            headingLevel="h2"
            eagerFirst
          />
        </Container>
      </section>

      {badgeStatuses.length > 0 ? (
        <section aria-label="Product status" className="pb-6">
          <Container>
            <StatusLegend statuses={badgeStatuses} />
          </Container>
        </section>
      ) : null}

      <ContactCta />
    </>
  );
}
