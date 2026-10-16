import { CategoryPage } from "@/components/products/CategoryPage";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: categories["single-vials"].seoTitle,
  description: categories["single-vials"].seoDescription,
  path: categories["single-vials"].href,
});

export default function SingleVialsPage() {
  return <CategoryPage category="single-vials" />;
}
