/**
 * Delivery information migrated from the previous HGH Bali website.
 * Confirm fees with the operations team before changing them.
 */

export const delivery = {
  serviceType:
    "Delivery only. Atlas Longevity does not operate a walk-in store or customer collection point.",
  baliAreas: [
    "Canggu",
    "Berawa",
    "Pererenan",
    "Seminyak",
    "Umalas",
    "Denpasar",
    "Sanur",
    "Ubud",
    "Jimbaran",
    "Nusa Dua",
    "Uluwatu",
    "Kuta",
  ],
  fees: [
    { area: "Around Canggu", amount: "IDR 50,000" },
    { area: "Other areas of Bali", amount: "IDR 100,000" },
  ],
  feeNote:
    "Fees depend on location and availability and are confirmed with your enquiry. For locations outside the standard delivery areas, contact the team before ordering.",
  indonesiaCities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Lombok"],
  indonesiaNote:
    "Enquiries are welcome from across Indonesia, subject to current service availability and applicable requirements. Share your location and the team will confirm whether fulfilment is currently available.",
  steps: [
    {
      title: "Send your enquiry",
      body: "Tell us which catalogue option you are asking about and where you are located.",
    },
    {
      title: "Confirm availability",
      body: "The team confirms current availability, applicable requirements and delivery options for your location.",
    },
    {
      title: "Arrange delivery",
      body: "Provide your complete address, receiver name, telephone number, available time and a location pin.",
    },
    {
      title: "Discreet delivery",
      body: "Your order is delivered discreetly to the confirmed destination.",
    },
  ],
} as const;
