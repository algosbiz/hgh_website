import { Container } from "@/components/ui/Container";
import { PageHeader } from "./PageHeader";
import { Prose } from "./Prose";

interface LegalPageProps {
  title: string;
  path: string;
  lastUpdated: string;
  intro?: string;
  children: React.ReactNode;
}

export function LegalPage({ title, path, lastUpdated, intro, children }: LegalPageProps) {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: title, href: path }]}
        eyebrow="Legal"
        title={title}
        intro={intro}
      >
        <p className="mt-6 text-sm text-muted">Last updated: {lastUpdated}</p>
      </PageHeader>
      <Container size="narrow" className="py-14 sm:py-20">
        <p className="mb-10 rounded-2xl border border-dashed border-gold-deep/50 bg-gold-soft/40 px-5 py-4 text-sm leading-relaxed text-body">
          This document is provided as a working draft and is pending review by
          a qualified legal adviser before publication.
        </p>
        <Prose>{children}</Prose>
      </Container>
    </>
  );
}
