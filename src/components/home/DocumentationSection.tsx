import { Barcode, Boxes, Factory, FileBadge2, FlaskConical, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface DocumentationSectionProps {
  publishedCertificates: number;
}

export function DocumentationSection({ publishedCertificates }: DocumentationSectionProps) {
  const items = [
    {
      icon: Tag,
      title: "Product identification",
      body: "Each listing states the product name and presentation exactly as printed on the label.",
      status: "Per product page",
    },
    {
      icon: FlaskConical,
      title: "Labelled strength",
      body: "Strength is recorded per unit and per pack as printed — never rounded or estimated.",
      status: "Being confirmed",
    },
    {
      icon: Boxes,
      title: "Packaging",
      body: "Outer packaging, contents and batch and expiry labelling are described for each option.",
      status: "Being confirmed",
    },
    {
      icon: Factory,
      title: "Manufacturer documentation",
      body: "Manufacturer details are shown only where supporting documents have been provided.",
      status: "Pending",
    },
    {
      icon: Barcode,
      title: "Batch traceability",
      body: "Published records name the batch they relate to, so you can match them to your packaging.",
      status: "Per batch",
    },
    {
      icon: FileBadge2,
      title: "Available certificates",
      body: "Certificates of Analysis appear on the Testing page once laboratory testing is complete.",
      status:
        publishedCertificates === 0
          ? "None published yet"
          : `${publishedCertificates} published`,
    },
  ];

  return (
    <section id="About" aria-labelledby="documentation-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="documentation-title"
              eyebrow="Documentation"
              title="Quality you can verify"
              description="Packaging is only one part of the picture. Atlas Longevity focuses on product traceability, batch documentation and clear labelling — and shows exactly what is still pending."
            />
          </div>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {items.map(({ icon: Icon, title, body, status }) => (
            <li key={title} className="flex flex-col bg-paper p-7">
              <Icon aria-hidden="true" className="size-6 text-gold" strokeWidth={1.4} />
              <h3 className="mt-5 font-display text-xl font-normal">{title}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{body}</p>
              <p className="mt-5 text-xs font-medium tracking-wide text-gold-deep uppercase">
                {status}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
