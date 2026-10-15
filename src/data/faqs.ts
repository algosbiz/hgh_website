/**
 * Frequently asked questions, migrated and updated from the previous
 * HGH Bali website. `featured: true` questions also appear on the homepage.
 */

export interface Faq {
  question: string;
  answer: string;
  featured?: boolean;
  /** Also shown in the FAQ section of every product page. */
  onProductPages?: boolean;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "products",
    title: "Products",
    items: [
      {
        question: "What products does HGH Bali list?",
        answer:
          "The catalogue lists three HGH box options and five pen options. Final names, labelled strengths and packaging details for each option are published once they have been confirmed against the product label and supporting documentation.",
        featured: true,
      },
      {
        question: "What was the previously listed HGH product?",
        answer:
          "The previous HGH Bali website described Somatropin labelled at 10 IU / 3.33 mg per vial, with 10 vials per box (100 IU in total). These details are not assumed to apply to every new catalogue option — check each product's own specifications.",
      },
      {
        question: "How many IU are in one box?",
        answer:
          "It depends on the option. Each product page lists the labelled strength per unit and the total per pack once confirmed. Until then, the specification is marked “To be confirmed”.",
        featured: true,
      },
      {
        question: "Is this Somatropin?",
        answer:
          "Somatropin is the manufactured form of human growth hormone. The active ingredient for each catalogue option is shown on its product page once confirmed against the product label.",
      },
      {
        onProductPages: true,
        question: "Are the pens interchangeable with the HGH boxes?",
        answer:
          "No. Products are grouped by presentation for easier browsing only. Different products should not be treated as medically interchangeable — suitability is a matter for a qualified healthcare professional.",
      },
      {
        onProductPages: true,
        question: "How should the products be stored?",
        answer:
          "Storage requirements must follow the manufacturer’s instructions supplied with the exact product. We do not publish a generic storage rule unless it is supported by the product’s official documentation.",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing & documentation",
    items: [
      {
        question: "Is the HGH tested?",
        answer:
          "Atlas Longevity plans independent testing and publishes batch documentation on the Testing page when it is complete. Only completed results for the corresponding batch should be treated as verified.",
        featured: true,
      },
      {
        onProductPages: true,
        question: "Can I view the certificate before ordering?",
        answer:
          "Yes, once the certificate for the current batch has been completed and published. Records that are still pending are clearly marked as pending.",
      },
      {
        question: "How do I check that documentation matches my product?",
        answer:
          "Confirm the product name and labelled strength, then match the batch number on your packaging with the batch shown on the published certificate.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      {
        question: "Do you deliver in Bali?",
        answer:
          "Delivery is available across Bali subject to current availability, including Canggu, Berawa, Pererenan, Seminyak, Umalas, Denpasar, Sanur, Ubud, Jimbaran, Nusa Dua, Uluwatu and Kuta.",
        featured: true,
      },
      {
        question: "Can I collect my order?",
        answer:
          "No. Atlas Longevity operates a delivery-only service and does not offer customer collection or a public retail store.",
      },
      {
        question: "How much is delivery in Bali?",
        answer:
          "Delivery around Canggu is IDR 50,000 and delivery to other areas of Bali is IDR 100,000, subject to location and availability. Fees are confirmed with your enquiry.",
      },
      {
        question: "Do you deliver elsewhere in Indonesia?",
        answer:
          "Enquiries are welcome from across Indonesia, including Jakarta, Surabaya, Bandung, Medan and Lombok. The team will confirm whether fulfilment is currently available for your location.",
      },
    ],
  },
  {
    id: "enquiries",
    title: "Enquiries & medical questions",
    items: [
      {
        onProductPages: true,
        question: "Can I order directly on this website?",
        answer:
          "You can add products to your cart here. When you proceed to checkout, your cart is transferred to Peptides Bali (peptidesbali.online), where prices, payment and delivery are confirmed. For questions before ordering, send an enquiry and the Atlas Longevity team will reply.",
        featured: true,
      },
      {
        onProductPages: true,
        question: "Does HGH require medical supervision?",
        answer:
          "Somatropin is a pharmacologically active hormone. Suitability, dosing and monitoring should be determined with an appropriately qualified healthcare professional. This website does not provide dosing advice.",
        featured: true,
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((group) => group.items);
export const featuredFaqs: Faq[] = allFaqs.filter((faq) => faq.featured);
export const productPageFaqs: Faq[] = allFaqs.filter((faq) => faq.onProductPages);
