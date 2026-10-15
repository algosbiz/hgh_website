import { ArrowRight } from "lucide-react";
import type { TestingRecord } from "@/data/testing";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestingRecordCard } from "@/components/testing/TestingRecordCard";
import { VerifySteps } from "@/components/testing/VerifySteps";

export function TestingSection({ record }: { record?: TestingRecord }) {
  return (
    <section
      id="Testing"
      aria-labelledby="testing-title"
      className="border-y border-line bg-sand/60 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="testing-title"
          eyebrow="Independent testing"
          title="Don’t rely on packaging alone"
          description="Atlas Longevity commissions independent testing so you can review documentation for the batch you receive. Only completed results for the corresponding batch should be treated as verified."
          action={
            <ButtonLink href="/testing/" variant="secondary">
              All testing records
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          }
        />

        <div className="mt-12">{record ? <TestingRecordCard record={record} /> : null}</div>

        <h3 className="mt-14 font-display text-2xl font-normal">Know what you’re receiving</h3>
        <VerifySteps className="mt-6" />
      </Container>
    </section>
  );
}
