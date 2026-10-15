import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for the HGH Bali product information website by Atlas Longevity.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms/"
      lastUpdated="15 October 2026"
      intro="Please read these terms before using HGH Bali."
    >
      <h2>About this website</h2>
      <p>
        HGH Bali is a product information and enquiry website operated by{" "}
        {site.legalName}. Products can be added to a cart on this website;
        checkout, payment and order confirmation take place on Peptides Bali
        (peptidesbali.online) under that store’s own terms. HGH Bali does not
        take payment.
      </p>

      <h2>No offer to sell</h2>
      <p>
        Information on this website does not constitute an offer to sell or
        supply any product. Availability is confirmed individually and is
        subject to applicable legal and regulatory requirements, which may
        include a valid prescription and may vary by location.
      </p>

      <h2>Accuracy of information</h2>
      <ul>
        <li>
          Product specifications are taken from product labels or supporting
          documentation. Values marked “To be confirmed” have not yet been
          verified.
        </li>
        <li>
          Testing records marked “Pending” are not verified and must not be
          relied on as evidence of testing.
        </li>
        <li>
          Product statuses describe the publication and compliance state of a
          listing. They are not quality certifications.
        </li>
        <li>Illustrations are shown where approved product photography is not yet available.</li>
      </ul>

      <h2>Not medical advice</h2>
      <p>
        Nothing on this website is medical advice. Please read the{" "}
        <Link href="/medical-disclaimer/">Medical Disclaimer</Link>.
      </p>

      <h2>Lawful use</h2>
      <p>
        You are responsible for ensuring that any enquiry you make complies
        with the laws that apply to you.
      </p>

      <h2>External links</h2>
      <p>
        This website links to third-party services such as WhatsApp and
        laboratory websites. We are not responsible for their content or
        practices.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The HGH Bali name, logo, text and design belong to {site.legalName} or
        its licensors and may not be reused without permission.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, {site.legalName} is not liable for loss
        arising from reliance on information on this website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Indonesia.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? <Link href="/contact/">Contact us</Link>.
      </p>
    </LegalPage>
  );
}
