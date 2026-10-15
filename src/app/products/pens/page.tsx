import { CategoryPage } from "@/components/products/CategoryPage";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: categories.pens.seoTitle,
  description: categories.pens.seoDescription,
  path: categories.pens.href,
});

export default function PensPage() {
  return <CategoryPage category="pens" />;
}
