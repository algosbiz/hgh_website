import { HeartHandshake, Layers, MessagesSquare, PackageCheck } from "lucide-react";
import { ContactCta } from "@/components/home/ContactCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { RegulatoryNotice } from "@/components/products/RegulatoryNotice";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listedProduct } from "@/data/listed-product";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "What Is HGH? Somatropin & Growth Hormone Basics",
  description:
    "What HGH (somatropin, human growth hormone) is, how it is used medically and key safety information. Factual context from HGH Bali, not medical advice.",
  path: "/about-hgh/",
});

const facts = [
  {
    title: "Human growth hormone",
    body: "Human growth hormone is naturally produced by the pituitary gland and is involved in growth, metabolism and body composition.",
  },
  {
    title: "Medical use",
    body: "Prescription somatropin is used medically for specific approved indications, depending on the product and jurisdiction.",
  },
  {
    title: "What this website does not do",
    body: "HGH Bali does not present HGH as a general anti-ageing, fat-loss or muscle-building treatment, does not promise outcomes and does not publish dosing schedules or treatment protocols.",
  },
  {
    title: "Medical suitability",
    body: "For suitability, contraindications, monitoring or treatment decisions, speak with an appropriately qualified healthcare professional.",
  },
];

const support = [
  {
    icon: Layers,
    title: "Batch transparency",
    body: "Clear identification of the batch associated with published documentation.",
  },
  {
    icon: PackageCheck,
    title: "Discreet delivery",
    body: "Secure and discreet fulfilment across supported locations in Bali and Indonesia.",
  },
  {
    icon: MessagesSquare,
    title: "Customer support",
    body: "Real people available to answer product and order questions.",
  },
  {
    icon: HeartHandshake,
    title: "Aftercare",
    body: "Support does not simply disappear once an order has been delivered.",
  },
];

export default function AboutHghPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "About HGH", href: "/about-hgh/" }]}
        eyebrow="About HGH"
        title="What is HGH (somatropin)?"
        intro="Somatropin is a manufactured form of human growth hormone (HGH). This page explains the basics factually — it is not medical advice."
      />

      <section aria-label="About somatropin" className="py-14 sm:py-20">
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
            {facts.map((fact, index) => (
              <li key={fact.title} className="bg-paper p-7 sm:p-9">
                <span className="font-display text-sm text-gold-deep tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-display text-2xl font-normal">{fact.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{fact.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="safety-title" className="pb-16 sm:pb-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="safety-title"
              eyebrow="Safety"
              title="Important information"
              description="Somatropin is a pharmacologically active hormone."
            />
          </div>
          <div className="lg:col-span-8">
            <RegulatoryNotice />
          </div>
        </Container>
      </section>

      <section aria-labelledby="listed-title" className="border-y border-line bg-sand/60 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="listed-title"
              eyebrow="Previous listing"
              title="The 100 IU complete box"
              description={
                <>
                  The product previously listed on HGH Bali was a box of 10
                  individual vials, each labelled {listedProduct.labelledStrength.replace(" per vial", "")},
                  providing {listedProduct.totalPerBox} in total. These details
                  are kept for reference and are not assumed to apply to the
                  new catalogue options.
                </>
              }
            />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-card border border-line bg-paper p-6 sm:p-8">
              <dl className="divide-y divide-line">
                {listedProduct.specifications.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 py-3.5 text-[0.95rem]">
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="text-right text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-muted">Source: {listedProduct.source}.</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="atlas-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="atlas-title"
            eyebrow="Atlas Longevity"
            title="More than just the product"
            description="Buying a health-related product requires trust. Atlas Longevity focuses on clear product information, accessible testing documentation, discreet fulfilment and ongoing customer support."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {support.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-line-strong pt-6">
                <Icon aria-hidden="true" className="size-6 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 font-display text-xl font-normal">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
