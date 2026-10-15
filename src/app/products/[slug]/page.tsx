import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, FileText, Info, Truck } from "lucide-react";
import { TrackEvent } from "@/components/analytics/TrackEvent";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ProductPurchase } from "@/components/cart/ProductPurchase";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductGrid } from "@/components/products/ProductGrid";
import { RegulatoryNotice } from "@/components/products/RegulatoryNotice";
import { SpecList } from "@/components/products/SpecList";
import { StatusBadge } from "@/components/products/StatusBadge";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { productPageFaqs } from "@/data/faqs";
import { products } from "@/data/products";
import { getProductAction } from "@/lib/commerce";
import { peptidesBali } from "@/lib/commerce/peptides-bali";
import { statusInfo } from "@/lib/product-status";
import {
  getCatalogueNumber,
  getProductBySlug,
  getProductOptions,
  getRelatedProducts,
  isIndexableProduct,
  toCatalogueItems,
} from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import type { DocumentType } from "@/types/product";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const metadata = buildMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}/`,
    index: isIndexableProduct(product),
  });
  const image = product.images[0];
  if (image) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    };
  }
  return metadata;
}

const documentTypeLabels: Record<DocumentType, string> = {
  "certificate-of-analysis": "Certificate of Analysis",
  "laboratory-report": "Laboratory report",
  manufacturer: "Manufacturer",
  regulatory: "Regulatory",
  other: "Document",
};

const sections = [
  { id: "description", label: "Description" },
  { id: "specifications", label: "Specifications" },
  { id: "packaging", label: "Packaging" },
  { id: "manufacturer", label: "Manufacturer" },
  { id: "documentation", label: "Documentation" },
  { id: "medical-information", label: "Medical information" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

function DetailRow({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-10"
    >
      <h2
        id={`${id}-title`}
        className="font-display text-[1.75rem] leading-tight font-normal lg:col-span-4"
      >
        {title}
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categories[product.category];
  const action = getProductAction(product);
  const related = getRelatedProducts(product);
  const faqs = [...product.faqs, ...productPageFaqs];
  const showPrice = product.price?.approvedForDisplay === true;

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products/" },
            { label: category.name, href: category.href },
            { label: product.name, href: `/products/${product.slug}/` },
          ]}
        />
      </Container>

      <section aria-labelledby="product-title" className="pt-8 pb-16 sm:pt-12 sm:pb-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-28">
              <ProductMedia product={product} />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Eyebrow>
              {category.name} · No. {getCatalogueNumber(product)}
            </Eyebrow>
            <h1
              id="product-title"
              className="mt-5 font-display text-[2.5rem] leading-[1.05] font-normal tracking-[-0.02em] sm:text-5xl"
            >
              {product.name}
            </h1>

            <div className="mt-6 flex flex-col items-start gap-2">
              <StatusBadge status={product.status} />
              <p className="text-sm leading-relaxed text-muted">
                {statusInfo[product.status].description}
              </p>
            </div>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-body">
              {product.shortDescription}
            </p>

            <h2 className="sr-only">Key specifications</h2>
            <SpecList specs={product.specifications.slice(0, 4)} className="mt-8" />

            {showPrice && product.price ? (
              <p className="mt-6 font-display text-3xl text-ink tabular-nums">
                {new Intl.NumberFormat("en-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(product.price.amount)}
              </p>
            ) : null}

            {action.kind === "cart" ? (
              <div className="mt-8">
                <ProductPurchase productId={product.id} />
              </div>
            ) : (
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <ButtonLink href={action.href} size="lg">
                  {action.label}
                </ButtonLink>
                <ButtonLink href="#documentation" variant="secondary" size="lg">
                  View documentation
                </ButtonLink>
              </div>
            )}

            <div className="mt-6 flex gap-3 rounded-2xl bg-sand p-5 text-sm leading-relaxed text-body">
              <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-deep" />
              {action.kind === "cart" ? (
                <p>
                  Orders are completed on {peptidesBali.name} ({peptidesBali.domain}),
                  where prices, payment and delivery are confirmed. Questions
                  before ordering? <a href="#enquire" className="underline underline-offset-4">Send an enquiry</a>.
                </p>
              ) : (
                <p>
                  This product is not available to order online. Availability
                  and any applicable requirements are confirmed by the Atlas
                  Longevity team in response to your enquiry.
                </p>
              )}
            </div>

            <ul className="mt-6 grid gap-1 text-sm">
              <li>
                <Link
                  href="/testing/"
                  className="inline-flex min-h-10 items-center gap-2 text-ink underline-offset-4 hover:underline"
                >
                  <FileText aria-hidden="true" className="size-4 text-gold" />
                  Batch testing records
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery/"
                  className="inline-flex min-h-10 items-center gap-2 text-ink underline-offset-4 hover:underline"
                >
                  <Truck aria-hidden="true" className="size-4 text-gold" />
                  Delivery areas and fees
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <Container>
        <nav aria-label="On this page" className="border-t border-line py-5">
          <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 text-sm">
            {sections.map((section) => (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-10 items-center rounded-full px-3.5 text-muted transition-colors hover:bg-sand hover:text-ink"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <DetailRow id="description" title="Description">
          <div className="max-w-2xl space-y-4 text-[1.0625rem] leading-relaxed text-body">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </DetailRow>

        <DetailRow id="specifications" title="Product specifications">
          <SpecList specs={product.specifications} />
          <p className="mt-4 text-sm text-muted">
            Values are taken from the product label or supporting
            documentation. “To be confirmed” means the value has not yet
            been verified.
          </p>
        </DetailRow>

        <DetailRow id="packaging" title="Packaging details">
          <SpecList specs={product.packaging} />
          <p className="mt-4 text-sm text-muted">
            Storage must follow the manufacturer’s instructions supplied with
            the exact product.
          </p>
        </DetailRow>

        <DetailRow id="manufacturer" title="Manufacturer information">
          {product.manufacturer.name ? (
            <div className="max-w-2xl">
              <p className="font-display text-xl text-ink">{product.manufacturer.name}</p>
              {product.manufacturer.details ? (
                <p className="mt-3 leading-relaxed text-body">{product.manufacturer.details}</p>
              ) : null}
            </div>
          ) : (
            <p className="max-w-2xl leading-relaxed text-muted">
              Manufacturer information will be published once supporting
              documentation for this product has been provided and checked.
            </p>
          )}
        </DetailRow>

        <DetailRow id="documentation" title="Documentation">
          <ul className="divide-y divide-line border-y border-line">
            {product.documents.map((document) => (
              <li
                key={document.id}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">{document.title}</p>
                  <p className="mt-1 text-sm text-muted">
                    {documentTypeLabels[document.type]}
                    {document.batch ? ` · Batch ${document.batch}` : ""}
                  </p>
                </div>
                {document.status === "available" && document.href ? (
                  <TrackedLink
                    href={document.href}
                    event="testing_document_view"
                    params={{ product_id: product.id, document: document.type }}
                    className="inline-flex min-h-11 items-center gap-2 font-medium text-ink underline underline-offset-4"
                  >
                    View document
                  </TrackedLink>
                ) : (
                  <span className="inline-flex w-fit items-center rounded-full border border-dashed border-gold-deep/60 px-3 py-1 text-xs font-medium text-gold-deep">
                    Pending
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/testing/"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium text-ink underline-offset-4 hover:underline"
          >
            All batch testing records
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </DetailRow>

        <DetailRow id="medical-information" title="Medical & regulatory information">
          <RegulatoryNotice />
        </DetailRow>

        <DetailRow id="faqs" title="Questions about this product">
          <Accordion items={faqs} />
        </DetailRow>

        <DetailRow id="enquire" title="Enquire about availability">
          <p className="mb-8 max-w-2xl leading-relaxed text-muted">
            Ask about {product.name}. The team will confirm current
            availability, any applicable requirements and delivery options for
            your location.
          </p>
          <div className="rounded-[1.75rem] border border-line bg-paper p-6 sm:p-9">
            <EnquiryForm products={getProductOptions()} defaultProductId={product.id} />
          </div>
        </DetailRow>
      </Container>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-title"
          className="mt-8 border-t border-line bg-sand/60 py-16 sm:py-20"
        >
          <Container>
            <h2 id="related-title" className="font-display text-[2rem] leading-tight font-normal">
              Other {category.optionLabel}
            </h2>
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
              Listed for catalogue navigation only. Different products are not
              medically interchangeable.
            </p>
            <div className="mt-10">
              <ProductGrid items={toCatalogueItems(related)} />
            </div>
          </Container>
        </section>
      ) : null}

      <TrackEvent
        name="product_detail_view"
        params={{
          product_id: product.id,
          product_category: product.category,
          product_status: product.status,
        }}
      />
    </>
  );
}
