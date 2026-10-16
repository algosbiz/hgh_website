import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/types/product";
import { categories, categoryOrder } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IllustrativeLabel } from "@/components/products/ProductImage";

const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

interface CategoryCardsProps {
  counts: Record<ProductCategory, number>;
}

export function CategoryCards({ counts }: CategoryCardsProps) {
  return (
    <section aria-labelledby="categories-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow="Categories"
          title="Explore our product categories"
          description="Three presentations, each with its own specifications and documentation. Products are grouped for easier browsing only."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categoryOrder.map((slug, index) => {
            const category = categories[slug];
            const count = counts[slug];
            return (
              <article
                key={slug}
                className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper transition-[border-color,box-shadow] duration-300 ease-soft hover:border-line-strong hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-sand">
                  <Image
                    src={category.illustration.wide.src}
                    alt={category.illustration.wide.alt}
                    fill
                    sizes="(min-width: 768px) 38rem, 92vw"
                    className="object-cover transition-transform duration-700 ease-soft motion-safe:group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-5 left-6 font-display text-sm text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <IllustrativeLabel />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="text-sm text-muted">
                    {numberWords[count] ?? count} product option{count === 1 ? "" : "s"}
                  </p>
                  <h3 className="mt-2 font-display text-[2rem] leading-tight font-normal">
                    <Link
                      href={category.href}
                      className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-[1.75rem] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-deep"
                    >
                      {category.name}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-8 inline-flex items-center gap-2 text-[0.95rem] font-medium text-ink"
                  >
                    Explore {category.name}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
