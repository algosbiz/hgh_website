import Link from "next/link";
import { ContactCta } from "@/components/home/ContactCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { allFaqs, faqGroups } from "@/data/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HGH FAQs — Products, Testing & Delivery in Bali",
  description:
    "Answers about HGH Bali: somatropin pens, vials and boxes, batch testing records, delivery fees in Bali and Indonesia, and how ordering works.",
  path: "/faq/",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: allFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "FAQs", href: "/faq/" }]}
        eyebrow="FAQs"
        title="HGH Bali FAQs"
        intro="About the catalogue, testing, delivery and enquiries. Can’t find your answer? Send us an enquiry."
      />

      <section aria-label="Questions" className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm text-body transition-colors hover:border-ink hover:text-ink lg:rounded-none lg:border-0 lg:border-l lg:border-line lg:px-4 lg:hover:border-gold"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16 lg:col-span-9">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`}>
                <h2
                  id={`${group.id}-title`}
                  className="mb-6 font-display text-[1.75rem] leading-tight font-normal"
                >
                  {group.title}
                </h2>
                <Accordion items={group.items} />
              </section>
            ))}
            <p className="text-muted">
              Still have a question?{" "}
              <Link href="/contact/" className="text-ink underline underline-offset-4">
                Contact the team
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <ContactCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
