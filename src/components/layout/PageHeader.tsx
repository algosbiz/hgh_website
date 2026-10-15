import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeaderProps {
  title: React.ReactNode;
  eyebrow?: string;
  intro?: React.ReactNode;
  breadcrumbs: Crumb[];
  children?: React.ReactNode;
}

/** Standard heading block for inner pages. */
export function PageHeader({
  title,
  eyebrow,
  intro,
  breadcrumbs,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-sand/60">
      <Container className="pt-8 pb-14 sm:pt-10 sm:pb-20">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-10 max-w-3xl sm:mt-14">
          {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
          <h1 className="font-display text-[2.375rem] leading-[1.05] font-normal tracking-[-0.02em] sm:text-[3.25rem]">
            {title}
          </h1>
          {intro ? (
            <div className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
              {intro}
            </div>
          ) : null}
          {children}
        </div>
      </Container>
    </header>
  );
}
