import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <Eyebrow>Error 404</Eyebrow>
      <h1 className="mt-6 font-display text-[2.75rem] leading-tight font-normal sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
        The page you were looking for has moved or no longer exists.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/products/" variant="secondary" size="lg">
          Browse products
        </ButtonLink>
      </div>
    </Container>
  );
}
