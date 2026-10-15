import Link from "next/link";
import { ConsentSettingsButton } from "@/components/analytics/ConsentSettingsButton";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How HGH Bali by Atlas Longevity collects, uses and protects personal information.",
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy/"
      lastUpdated="15 October 2026"
      intro="How we collect, use and protect information when you use HGH Bali."
    >
      <h2>Who we are</h2>
      <p>
        HGH Bali ({site.defaultUrl.replace("https://", "")}) is operated by{" "}
        {site.legalName}. This policy explains how we handle personal
        information in line with applicable data protection laws, including
        Indonesia’s Personal Data Protection Law (Law No. 27 of 2022).
      </p>

      <h2>Information we collect</h2>
      <h3>Enquiry form</h3>
      <p>When you send an enquiry we collect:</p>
      <ul>
        <li>your name;</li>
        <li>your email address and/or WhatsApp number;</li>
        <li>your area or city;</li>
        <li>the product you are asking about, and your message.</li>
      </ul>
      <p>
        <strong>Please do not include medical history or other health information.</strong>{" "}
        The form is not designed to collect it.
      </p>
      <h3>Analytics (only with your consent)</h3>
      <p>
        If you accept analytics, we use Google Analytics 4 to understand how the
        website is used — for example, which pages are viewed and which
        product categories are filtered. We do not send names, contact details,
        messages or health information to Google Analytics, and advertising
        features are disabled.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>to reply to your enquiry and confirm availability and delivery options;</li>
        <li>to keep records of enquiries where required;</li>
        <li>to improve the website (anonymous analytics, if accepted).</li>
      </ul>
      <p>We do not sell personal information.</p>

      <h2>Service providers</h2>
      <p>
        We use trusted providers to run this website: website hosting, an email
        delivery service to forward enquiries to our team, and Google Analytics
        (only if you consent). If you contact us via WhatsApp, WhatsApp’s own
        privacy terms also apply.
      </p>

      <h2>Retention</h2>
      <p>
        We keep enquiry information only for as long as needed to respond to
        you and to meet any legal obligations.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask to access, correct or delete your personal information, or
        withdraw your consent, by <Link href="/contact/">contacting us</Link>.
      </p>

      <h2>Cart and checkout</h2>
      <p>
        Your cart (product and quantity only) is saved in your browser’s
        local storage and is not sent to us. When you proceed to checkout, the
        products and quantities are passed to Peptides Bali
        (peptidesbali.online) in the page address. Any details you enter
        there are handled under that store’s own privacy policy.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        Your analytics choice is saved in your browser’s local storage.
        Analytics cookies are only set if you accept analytics. You can change
        your choice at any time:
      </p>
      <div className="mt-6">
        <ConsentSettingsButton />
      </div>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of
        the page shows when it was last changed.
      </p>
    </LegalPage>
  );
}
