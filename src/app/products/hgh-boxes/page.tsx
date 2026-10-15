import { CategoryPage } from "@/components/products/CategoryPage";
import { categories } from "@/data/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: categories["hgh-boxes"].seoTitle,
  description: categories["hgh-boxes"].seoDescription,
  path: categories["hgh-boxes"].href,
});

export default function HghBoxesPage() {
  return <CategoryPage category="hgh-boxes" />;
}
