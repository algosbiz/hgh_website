# HGH Bali → Peptides Bali — Commerce Integration Feasibility

**Date:** 14 October 2026 (updated 15 October 2026)
**Status:** **Cart hand-off enabled at the client's request (15 October 2026)** — see
§9. The compliance findings in §3 and the conditions in §7 were not resolved by this
change; they remain the client's responsibility.

> This document records technical findings and risks. It is **not legal advice**. All
> regulatory points must be confirmed by qualified Indonesian legal/regulatory counsel.

---

## 1. Summary

| Question | Finding |
| --- | --- |
| Destination platform | WordPress + **WooCommerce** (Elementor, AffiliateWP, Creame WhatsApp Me, GTranslate) |
| Public product data | WooCommerce Store API is readable (`/wp-json/wc/store/v1/products`) |
| Do all eight HGH Bali products exist? | **Not confirmed.** Three HGH-related listings exist (one with 15 pen variations); no 1:1 mapping to "3 boxes + 5 pens" has been confirmed |
| Native cart hand-off possible? | Technically yes (WooCommerce `?add-to-cart=` URL), but **must not be enabled** yet |
| Prescription / eligibility check on destination | None observed in the public storefront flow |
| Blocking issues | Regulatory approval; destination labels products "research use only"; destination makes claims HGH Bali deliberately avoids |

**Recommendation:** keep HGH Bali enquiry-only. Revisit integration only after the
conditions in §7 are signed off.

---

## 2. HGH-related products on peptidesbali.online

Read from the public Store API on 14 October 2026 (prices in IDR; stock as reported):

| WooCommerce ID | Name / slug | Type | Variations (ID: attributes — price — in stock) |
| --- | --- | --- | --- |
| 1252 | Somatropin HGH 191aa 36iu, 72iu, 100iu, 198iu — `hgh-somatropin-bali` (the page the old HGH Bali site linked to) | simple | — Rp 5,500,000 — in stock. Description lists "100iu – IDR 5,500,000" and "198iu – IDR 10,000,000" but there are no variations to select them |
| 1217 | HGH — `hgh-10iu-bali` | variable | 5708: 10 IU — 1,100,000 — yes · 10062: 24 IU — 1,500,000 — no · 5709: 36 IU — 2,000,000 — no |
| 9981 | HGH Somatropin — `hgh-somatropin` (pen category) | variable | Disposable pen: 9984 10 IU 1,800,000 yes · 10064 24 IU 2,200,000 no · 9985 36 IU 2,800,000 no · 10065 72 IU 6,000,000 no · 10066 108 IU 7,000,000 yes. Reusable pen: 9986 10 IU 2,100,000 yes · 10067 24 IU 2,500,000 no · 9987 36 IU 3,100,000 no · 10068 72 IU 6,300,000 no · 10069 108 IU 7,300,000 no. Cartridge: 9988 10 IU 1,500,000 yes · 10070 24 IU 1,900,000 no · 9989 36 IU 2,500,000 yes · 10071 72 IU 5,700,000 no · 10072 108 IU 6,700,000 no |

Observations:

- A plausible interpretation is **3 boxes = product 1217's three IU variations** and
  **5 pens = the five IU sizes of product 9981** (with pen type as a further choice) — but
  the old HGH Bali product (10 IU × 10 vials = 100 IU) matches neither cleanly. **The client
  must confirm the mapping.**
- Several variations are marked purchasable while out of stock.
- None of these prices are shown on HGH Bali (no approval).

---

## 3. Compliance findings (blocking)

1. **"Research use only" positioning.** The destination footer states products are "intended
   for lawful research use only… not intended for human… consumption, diagnosis, treatment…
   injection, or personal use", and its HGH vial image is labelled "Research use only / Not for
   human consumption". HGH Bali presents somatropin in a human medical context with
   prescription-style safety information. Sending HGH Bali visitors into a "research use"
   checkout would be contradictory and potentially misleading.
2. **Claims on the destination.** The destination HGH page lists benefits ("supports muscle
   growth", "supports fat metabolism", "associated with anti-aging"), audience guidance
   ("intermediate to advanced users"), size guidance by experience level, a dose calculator
   and "stacking options". HGH Bali deliberately avoids these; a hand-off would expose users to
   them immediately.
3. **Prescription status.** Somatropin is generally a prescription-only medicine. In Indonesia
   this typically implies product registration (marketing authorisation) and dispensing
   through licensed pharmacy channels, with specific rules for online distribution of
   medicines. Counsel must confirm the exact obligations and whether any online pathway is
   permitted.
4. **Eligibility/prescription verification.** No prescription upload or verification step was
   observed in the public WooCommerce flow.
5. **Payments.** The destination advertises Visa, Mastercard, Apple Pay, Google Pay, crypto,
   Wise, Revolut and cash on delivery. Card networks and payment providers generally restrict
   prescription-medicine sales by unlicensed merchants — confirm with each provider.
6. **Promotions.** "20% off — valid for the first 100 orders" is a scarcity-style promotion the
   PRD asks HGH Bali not to use.
7. **Data inconsistencies.** Bali delivery fees differ (HGH Bali: IDR 50,000 / 100,000;
   Peptides Bali: IDR 100,000 / 200,000).

---

## 4. Technical options (for later — only after approval)

| Option | How it works | Cross-domain session | Assessment |
| --- | --- | --- | --- |
| A. Deep link to product page | Link to the destination product URL; customer chooses there | Not needed | Lowest effort, but still sends users to non-compliant content today |
| B. WooCommerce add-to-cart URL | Top-level navigation to `https://peptidesbali.online/?add-to-cart={variationId}&quantity={n}` (variable products need the variation ID; attributes may also be required) | Works — the cart cookie is created on the destination domain during the redirect | Simple; no server work; **no eligibility check** — unsuitable for prescription products as is |
| C. Store API from the browser | `POST /wp-json/wc/store/v1/cart/add-item` from hghbali.com | Fails in practice — third-party cookies/Cart-Token, CORS, nonce | Not recommended |
| D. Signed hand-off (recommended if approved) | HGH Bali server creates a short-lived signed token (product, variation, quantity, verified-eligibility reference); browser navigates to a custom WordPress endpoint that validates the signature, stock and eligibility, then adds to cart and redirects to checkout | Works — top-level navigation | Requires a small WordPress plugin, shared secret, and an approved eligibility/prescription process |

Common requirements for B/D: map every HGH Bali product to a destination product/variation ID;
reject unknown IDs, quantities < 1 or above an agreed maximum, out-of-stock or unpublished
items; show a clear message and fall back to enquiry on any failure; never pass personal or
health data in URLs.

---

## 5. Architecture in the codebase

```text
src/types/product.ts               Product.commerce = { destination, productId, variationId, mappingConfirmed }
src/lib/commerce/types.ts          CommerceProvider interface + ProductAction ("enquire" | "cart")
src/lib/commerce/enquiry-only.ts   Enquiry action only (fallback; use it to switch the cart off)
src/lib/commerce/peptides-bali-cart.ts  Active provider — "cart" when a product has a Peptides Bali ID
src/lib/commerce/peptides-bali.ts  Destination details, getCheckoutId(), buildCheckoutUrl()
src/lib/commerce/stock.ts          Hourly cached stock from the public Store API
src/lib/commerce/index.ts          getProductAction(product) — the only function the UI calls
src/lib/cart-store.ts              Cart lines in localStorage (shared between tabs)
src/components/cart/               CartProvider, CartDrawer, CartButton, AddToCartButton, ProductPurchase
```

- UI components never decide whether a product is sold online; they render whatever
  `getProductAction()` returns. The only destination URL is built by `buildCheckoutUrl()`.
- Products without a Peptides Bali ID, or with status `unavailable`, keep the enquiry action.

---

## 6. Error and unavailable-product handling (design)

| Situation | Behaviour |
| --- | --- |
| Product `unavailable` | Action label "Ask about future availability" (already implemented) |
| Mapping missing/unconfirmed | Enquiry only |
| Destination reports out of stock / unpublished (future) | Return to product page with message; enquiry fallback |
| Token invalid/expired (future) | Destination redirects back with error code; no cart change |
| Destination unreachable (future) | Enquiry fallback; never a broken checkout |

---

## 7. Conditions before any cart/checkout functionality

- [ ] Written legal/regulatory opinion confirming a lawful transaction pathway for each
      product (registration/authorisation, prescription requirement, online-sale rules).
- [ ] Approved eligibility/prescription verification process, including data protection for
      health information (not collected via HGH Bali).
- [ ] Destination product labelling and claims made consistent with HGH Bali (or a separate,
      compliant destination).
- [ ] Payment provider confirmation.
- [ ] Authorised fulfilment confirmed.
- [ ] Confirmed product/variation mapping for all eight products.
- [ ] Agreed delivery fees across both sites.
- [ ] Client sign-off of the end-to-end journey and error handling.

---

## 8. Open questions for the client

1. Which destination products/variations correspond to each of the three HGH boxes and five
   pens? Is the old "10 IU × 10 vials (100 IU)" box one of them?
2. What is the regulatory status of each product in Indonesia, and who holds it?
3. Is there a prescription verification process today? Who performs it?
4. Should HGH Bali link to Peptides Bali at all while the destination uses "research use only"
   labelling?
5. Which delivery fees are correct?

---

## 9. Implemented hand-off (15 October 2026)

The client asked for HGH Bali to work as a store: "add to basket" / "buy it now" should take
the customer to peptidesbali.online with the products already in the cart.

**Mechanism — WooCommerce checkout link (option B, multi-item).** The destination runs
WooCommerce 11.2, whose built-in *checkout link* endpoint fills the cart and redirects to
checkout:

```text
https://peptidesbali.online/checkout-link/?products=5708:2,9984:1
```

Tested on 15 October 2026 (top-level navigation from HGH Bali in a real browser): the
destination cart contained exactly the HGH Bali cart lines and quantities. Unknown IDs are
rejected by WooCommerce (redirect to the cart with an error); out-of-stock variations are not
added. No WordPress plugin or shared secret is needed, and no personal or health data is
passed — only product IDs and quantities.

**Behaviour on HGH Bali**

| Action | Result |
| --- | --- |
| Add to cart (card or product page) | Adds to the local cart and opens the cart drawer |
| Proceed to Checkout (drawer) | Opens the checkout link with every in-stock line |
| Buy now (product page) | Opens the checkout link with that product only |
| Product out of stock on the destination | "Out of stock"; cannot be added; excluded from checkout |
| Destination Store API unreachable | Stock unknown → product can be added; WooCommerce checks stock at checkout |
| No Peptides Bali ID or status `unavailable` | Enquiry action, as before |

**Provisional mapping (must be confirmed by the client — `mappingConfirmed: false`)**

| HGH Bali | Destination product | Variation IDs |
| --- | --- | --- |
| HGH Box Option 1 / 2 / 3 | 1217 `hgh-10iu-bali` — 10 / 24 / 36 IU | 5708 / 10062 / 5709 |
| Pen Option 1 / 2 / 3 / 4 / 5 | 9981 `hgh-somatropin` — disposable pen, 10 / 24 / 36 / 72 / 108 IU | 9984 / 10064 / 9985 / 10065 / 10066 |

On 15 October 2026 only 5708, 9984 and 10066 were in stock.

**Still open:** every compliance finding in §3 and condition in §7 (regulatory status,
prescription/eligibility verification, "research use only" labelling and claims on the
destination, payment provider rules, delivery fee differences). Enabling the cart was the
client's decision; it does not resolve these points.

---

## 10. Single vials, prices and product photos (16 October 2026)

The client asked for three single vial options (HGH 24 IU, HGH 36 IU, HGH Somatropin
100 IU), photos for every product, and prices "same as peptidesbali.online".

- **Catalogue:** 2 HGH boxes, 3 single vials, 5 pens. The §9 box mapping (vials
  5708 / 10062 / 5709) was replaced, because the 24 IU and 36 IU vials are now their own
  products. The current mapping is in README §17. Box and vial mappings were confirmed by the
  project team on 16 October 2026. All 15 pen variations are sold: five pen products (one
  per strength), each with a pen-type choice — disposable pen, reusable pen or cartridge —
  carrying its own variation ID, price and stock. Every pen type uses the disposable pen photo
  of the same strength (the destination's reusable pen and cartridge images are generic
  infographics showing other peptides).
- **New destination product:** 10304 "HGH Somatropin Bali & Indonesia" (100 IU: 10305,
  Rp 4,000,000; 180 IU: 10306, Rp 6,500,000), both "available on backorder" on that date.
- **Prices:** shown on cards, product pages and in the cart (line totals and subtotal).
  They are read hourly from the Store API together with stock, so they match the
  destination; the amount in `products.ts` is only a fallback. Delivery is added at checkout.
- **Photos:** copied from the matching destination product pages. The Atlas Longevity vial
  labels in these photos read "Research use only / Not for human consumption" or "Research
  peptide" — the §3.1 inconsistency is now visible on HGH Bali itself.
- Verified on 16 October 2026: a cart with 10305 × 1 and 10066 × 1 opened the destination
  checkout with both items and a subtotal of Rp 11,000,000, matching HGH Bali; a cart with
  10305 × 1, 9988 (cartridge) × 2 and 9986 (reusable pen) × 1 arrived with the right pen
  types and a subtotal of Rp 9,100,000. The destination adds a 5% payment adjustment for
  some payment methods, which HGH Bali does not show.

---

## 11. Client changes tab (18 October 2026, implemented 22 October 2026)

From the "Changes" tab of the client's "HGH 1 page site new" document and the "HGH New"
Drive folder:

1. **Cart to Peptides Bali** — already live; the client confirmed it works.
2. **Logo** — replaced with the client's Atlas Longevity HGH Bali logo.
3. **Category images** — the illustrative renders on the homepage category cards were
   replaced with product photos.
4. **Box photo** — the client asked for the Atlas 100 IU box photo instead of the black
   "Somatropin HGH 191aa" (Cooper Pharma) box. The catalogue was rearranged with the
   project team to match the Drive folder: HGH Boxes = Atlas 100 IU (10305) and 180 IU
   (10306); Single Vials = HGH 10 / 24 / 36 IU (5708 / 10062 / 5709). Product 1252
   (Somatropin HGH 191aa) is no longer listed.
5. **Clinic photos** — the hero background, the AOBA Clinic and Longevity Center photos and
   the treatment-room photo were removed; the homepage uses product photos instead.

The rest of that document (Tab 1) is a separate plan for a one-page WordPress website with
educational content, a certificate verification system and an SEO strategy. It was not
part of the changes list and has not been implemented.
