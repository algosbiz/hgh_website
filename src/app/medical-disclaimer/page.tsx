import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Medical Disclaimer",
  description:
    "HGH Bali provides general product information only. It is not medical advice and does not replace consultation with a qualified healthcare professional.",
  path: "/medical-disclaimer/",
});

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage
      title="Medical Disclaimer"
      path="/medical-disclaimer/"
      lastUpdated="14 October 2026"
      intro="Important information about the limits of the content on this website."
    >
      <h2>General information only</h2>
      <p>
        Information on HGH Bali is provided for general informational purposes.
        It is not medical advice and does not replace professional medical
        advice, diagnosis or treatment.
      </p>

      <h2>About somatropin</h2>
      <p>
        Somatropin is a manufactured form of human growth hormone and a
        pharmacologically active hormone. Prescription somatropin is used
        medically for specific approved indications, depending on the product
        and jurisdiction.
      </p>
      <p>
        Somatropin is not appropriate for everyone. Its use can require medical
        assessment and monitoring, and risks, contraindications and
        interactions depend on the individual and the particular product.
        Potential adverse effects can include fluid retention, joint or muscle
        discomfort, altered glucose metabolism, headache and injection-site
        reactions. More serious risks are possible in some people.
      </p>

      <h2>What we do not provide</h2>
      <ul>
        <li>dosing instructions, “cycles” or treatment protocols;</li>
        <li>claims that HGH is an anti-ageing, fat-loss or muscle-building treatment;</li>
        <li>individual medical advice or consultations.</li>
      </ul>

      <h2>Speak with a professional</h2>
      <p>
        Decisions about suitability, dosing and monitoring should be made with
        an appropriately qualified healthcare professional. In an emergency,
        contact local emergency services immediately (112 in Indonesia).
      </p>

      <h2>Product statuses and testing records</h2>
      <p>
        Product statuses describe the publication and compliance state of a
        listing — not product quality. Only completed testing records for the
        corresponding batch should be treated as verified. See{" "}
        <Link href="/testing/">Testing</Link>.
      </p>

      <h2>Regulatory requirements</h2>
      <p>
        Availability of any product is subject to applicable regulatory
        requirements. This disclaimer is not a substitute for those
        requirements.
      </p>
    </LegalPage>
  );
}
