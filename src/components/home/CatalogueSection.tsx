import { ArrowRight } from "lucide-react";
import type { CatalogueItem } from "@/types/product";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterableCatalogue } from "@/components/products/FilterableCatalogue";

export function CatalogueSection({ items }: { items: CatalogueItem[] }) {
  return (
    <section
      id="Product"
      aria-labelledby="catalogue-title"
      className="border-y border-line bg-sand/60 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="catalogue-title"
          eyebrow="Catalogue"
          title="Product catalogue"
          description={
            <>
              Every option in one place. Specifications marked{" "}
              <em className="text-ink">To be confirmed</em> are still being
              verified against the product label and are never estimated.
            </>
          }
          action={
            <ButtonLink href="/products/" variant="secondary">
              Full catalogue
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          }
        />
        <div className="mt-10">
          <FilterableCatalogue items={items} listId="home" />
        </div>
      </Container>
    </section>
  );
}
