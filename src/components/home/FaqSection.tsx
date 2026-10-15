import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section
      id="FAQs"
      aria-labelledby="faq-title"
      className="border-t border-line bg-sand/60 py-20 sm:py-28"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="Answers about the catalogue, testing, delivery and enquiries."
          />
          <Link
            href="/faq/"
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium text-ink underline-offset-4 hover:underline"
          >
            View all questions
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
