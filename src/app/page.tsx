import type { Metadata } from "next";
import { CatalogueSection } from "@/components/home/CatalogueSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { ContactCta } from "@/components/home/ContactCta";
import { DeliverySection } from "@/components/home/DeliverySection";
import { DocumentationSection } from "@/components/home/DocumentationSection";
import { FaqSection } from "@/components/home/FaqSection";
import { Hero } from "@/components/home/Hero";
import { ListedProductSection } from "@/components/home/ListedProductSection";
import { TestingSection } from "@/components/home/TestingSection";
import { categoryOrder } from "@/data/categories";
import { featuredFaqs } from "@/data/faqs";
import { site } from "@/data/site";
import { testingRecords } from "@/data/testing";
import { getAllProducts, toCatalogueItems } from "@/lib/products";

const homeTitle = "HGH Bali | Somatropin Product Information & Specifications";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: site.description,
    url: "/",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description },
};

/*
 * Homepage. Sections appear in the order below — reorder or remove a line to
 * change the page (see README.md, "Mengubah bagian homepage").
 */
export default function HomePage() {
  const products = getAllProducts();
  const counts = Object.fromEntries(
    categoryOrder.map((category) => [
      category,
      products.filter((p) => p.category === category).length,
    ]),
  ) as Record<(typeof categoryOrder)[number], number>;
  const publishedCertificates = testingRecords.filter(
    (record) => record.status === "completed" && record.certificateUrl,
  ).length;

  return (
    <>
      <Hero productCount={products.length} />
      <ListedProductSection />
      <CategoryCards counts={counts} />
      <CatalogueSection items={toCatalogueItems(products)} />
      <DocumentationSection publishedCertificates={publishedCertificates} />
      <TestingSection record={testingRecords[0]} />
      <DeliverySection />
      <FaqSection faqs={featuredFaqs} />
      <ContactCta />
    </>
  );
}
