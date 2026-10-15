import { ContactCta } from "@/components/home/ContactCta";
import { PageHeader } from "@/components/layout/PageHeader";
import { TestingRecordCard } from "@/components/testing/TestingRecordCard";
import { VerifySteps } from "@/components/testing/VerifySteps";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testingRecords } from "@/data/testing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Independent HGH Testing & Batch Documentation",
  description:
    "Batch testing records for HGH Bali products by Atlas Longevity. Pending records are clearly marked and are only treated as verified once complete.",
  path: "/testing/",
});

const principles = [
  {
    title: "Batch-specific",
    body: "Each record names the batch it relates to. A certificate only applies to the batch shown on it.",
  },
  {
    title: "Pending means pending",
    body: "Fields awaiting laboratory results are shown as “Pending”. Pending records are never presented as completed or verified.",
  },
  {
    title: "Full records",
    body: "When testing is complete, the full certificate and, where available, a laboratory verification link are published here.",
  },
];

export default function TestingPage() {
  const completed = testingRecords.filter((record) => record.status === "completed").length;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Testing", href: "/testing/" }]}
        eyebrow="Testing"
        title="Independent testing & batch documentation"
        intro="Don’t rely on packaging alone. Atlas Longevity invests in independent product testing so customers can review documentation associated with the batch they receive."
      >
        <p className="mt-6 text-sm text-muted">
          {testingRecords.length} record{testingRecords.length === 1 ? "" : "s"} ·{" "}
          {completed} completed
        </p>
      </PageHeader>

      <section aria-labelledby="records-title" className="py-14 sm:py-20">
        <Container>
          <h2 id="records-title" className="sr-only">
            Testing records
          </h2>
          <div className="grid gap-6">
            {testingRecords.map((record) => (
              <TestingRecordCard key={record.id} record={record} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="verify-title" className="border-y border-line bg-sand/60 py-16 sm:py-24">
        <Container>
          <SectionHeading
            id="verify-title"
            eyebrow="Verification"
            title="Know what you’re receiving"
            description="Three checks to match the product in your hands with its published documentation."
          />
          <VerifySteps className="mt-10" />
        </Container>
      </section>

      <section aria-labelledby="approach-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeading id="approach-title" eyebrow="Approach" title="How testing records are published" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {principles.map((item) => (
              <li key={item.title} className="border-t border-line-strong pt-6">
                <h3 className="font-display text-xl font-normal">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
