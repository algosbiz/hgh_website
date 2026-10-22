import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { legalNav, site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

const productLinks = [
  { label: "All products", href: "/products/" },
  { label: "HGH Boxes", href: "/products/hgh-boxes/" },
  { label: "Single Vials", href: "/products/single-vials/" },
  { label: "Pens", href: "/products/pens/" },
];

const infoLinks = [
  { label: "Testing", href: "/testing/" },
  { label: "About HGH", href: "/about-hgh/" },
  { label: "Delivery", href: "/delivery/" },
  { label: "FAQs", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-9 items-center text-[0.95rem] text-body transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-sand">
      {/* Extra bottom space so the floating WhatsApp button never covers links. */}
      <Container className="pt-16 pb-28 sm:pt-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex transition-opacity hover:opacity-90">
              <Image
                src={site.logo.src}
                alt={site.logo.alt}
                width={site.logo.width}
                height={site.logo.height}
                sizes="16rem"
                className="h-14 w-auto sm:h-16"
              />
              <span className="sr-only">{site.name} — home</span>
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Product information and enquiries for Somatropin HGH in Bali and
              Indonesia, provided by{" "}
              <span className="text-ink">{site.legalName}</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterColumn title="Products" links={productLinks} />
            <FooterColumn title="Information" links={infoLinks} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
                Contact
              </h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 flex-col justify-center py-1 text-[0.95rem] text-body transition-colors hover:text-ink"
                  >
                    WhatsApp
                    <span className="text-sm whitespace-nowrap text-muted">
                      {site.contact.whatsappDisplay}
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                {site.contact.email ? (
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="inline-flex min-h-9 items-center text-[0.95rem] text-body transition-colors hover:text-ink"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                ) : null}
                <li>
                  <Link
                    href="/contact/"
                    className="inline-flex min-h-9 items-center text-[0.95rem] text-body transition-colors hover:text-ink"
                  >
                    Enquiry form
                  </Link>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Delivery only — no walk-in store or collection point.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line-strong/60 pt-8">
          <p className="max-w-4xl text-sm leading-relaxed text-muted">
            Information on this website is provided for general informational
            purposes and does not replace professional medical advice,
            diagnosis or treatment. Product availability and applicable
            requirements may vary by location. Orders are completed on Peptides
            Bali (peptidesbali.online).
          </p>
          <div className="mt-6 flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © <CopyrightYear /> {site.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 items-center underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
