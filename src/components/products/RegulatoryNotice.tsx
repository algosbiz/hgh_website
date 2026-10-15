import Link from "next/link";
import { ShieldAlert } from "lucide-react";

const points = [
  "Somatropin is not appropriate for everyone. Its use can require medical assessment and monitoring, and risks, contraindications and interactions depend on the individual and the particular product.",
  "Potential adverse effects associated with somatropin can include fluid retention, joint or muscle discomfort, altered glucose metabolism, headache and injection-site reactions. More serious risks are possible in some people.",
  "Availability is subject to applicable regulatory requirements, which may include a valid prescription, and may vary by location.",
  "This website does not provide dosing instructions, treatment protocols or medical advice, and does not promote HGH as an anti-ageing, fat-loss or muscle-building treatment.",
];

/** Standard medical and regulatory information block. */
export function RegulatoryNotice() {
  return (
    <div className="rounded-card border border-line bg-paper p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <ShieldAlert aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-gold" strokeWidth={1.4} />
        <div>
          <p className="font-medium text-ink">
            Important information about HGH (somatropin)
          </p>
          <ul className="mt-4 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-ink">
            Do not use this website as a substitute for individual medical
            advice. Speak with an appropriately qualified healthcare
            professional.{" "}
            <Link href="/medical-disclaimer/" className="underline underline-offset-4">
              Medical disclaimer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
