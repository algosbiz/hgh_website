# HGH Bali — Phase 1 Audit & Design Notes

**Date:** 14 October 2026
**Scope:** existing website audit, reference design analysis, asset review, content migration
decisions, missing client information, and QA results for the rebuilt site.

---

## 1. Existing website — hghbali.com

### 1.1 Platform

| Item          | Finding                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| CMS           | WordPress 7.1.3 (the brief describes the site as WordPress-independent; it is in fact WordPress) |
| Page builder  | Elementor 4.3.2 + Pro Elements, Hello Elementor theme                  |
| SEO plugin    | Rank Math (sitemaps at `/sitemap_index.xml`)                            |
| Other plugins | Chaty (chat widget), Hostinger Reach                                    |
| Fonts         | Cormorant Garamond + Inter (+ Inter Tight, Roboto, Roboto Slab loaded but largely unused) |
| Colours       | Black/charcoal text, gold `#C9A227` / `#876F16`, white                  |

### 1.2 URLs

The site is a single long page. Indexed/known URLs and how the new site handles them:

| Old URL                     | New behaviour                         |
| --------------------------- | ------------------------------------- |
| `/`                         | New homepage                          |
| `/home/` (logo link)        | 308 → `/`                             |
| `/hello-world/` (default WP post) | 308 → `/`                       |
| `/category/…`               | 308 → `/`                             |
| `/feed/`, `/comments/feed/` | 308 → `/`                             |
| `#Product`, `#Testing`, `#About`, `#Delivery`, `#FAQs`, `#Contact` | Same anchor IDs kept on the new homepage sections |

### 1.3 SEO metadata (preserved/improved)

- Title: `HGH Bali | Somatropin 10 IU / 3.33 mg | HGH Indonesia` → new: `HGH Bali | Somatropin
  Product Information & Specifications` (the strength is no longer in the site-wide title
  because it is not confirmed for all eight new options).
- The old page printed **two conflicting sets** of `<title>`/description/OpenGraph tags
  (theme + Rank Math). The new site outputs one set per page.
- The old `og:image` was a third-party clinic photo (see §3). Replaced with a branded
  OpenGraph image.
- Keywords "Somatropin", "HGH Bali", "HGH Indonesia", "Bali & Indonesia" retained in copy.

### 1.4 Defects found on the old site

- Chaty WhatsApp widget configured with phone number **"92"** — not a valid number.
- Most CTA buttons ("Enquire about HGH", "View certificate", "Verify with lab", "Check
  availability") have empty links.
- Footer links (Privacy, Terms, Medical Disclaimer) are empty — those pages do not exist.
- Footer typo "Conct".
- Several "principle" links point to the Peptides Bali product page, which makes different
  claims (see the commerce feasibility document).

### 1.5 Content migration decisions

| Existing content                                         | Decision |
| -------------------------------------------------------- | -------- |
| Somatropin 10 IU / 3.33 mg per vial, 10 vials, 100 IU, white lyophilised cake, 2 ml vial | **Migrated as a reference** ("previously listed product", `src/data/listed-product.ts`). **Not** applied to any of the eight new options. |
| "Consistent with Cooper Pharma's current catalogue"      | **Not migrated.** It does not confirm the manufacturer; manufacturer is left "to be confirmed". |
| Testing table (batch, lab, date, ID, testing, result — all "Pending") | **Migrated as pending.** Clearly labelled "Pending — not yet verified". |
| Quality principles, "More than just the product"         | **Partially migrated.** "Premium Quality" marketing claim dropped; traceability, support, aftercare kept. |
| What is Somatropin / Important information / risks       | **Migrated** (About HGH page, product pages, Medical Disclaimer). |
| Delivery areas, fees (IDR 50,000 Canggu / IDR 100,000 other), delivery-only, Indonesia-wide enquiries, 4-step process | **Migrated.** |
| Payment options (bank transfer, crypto, 6% payment link, COD) | **Not migrated** pending compliance review — publishing payment methods for a prescription-category product promotes a purchase pathway that has not been approved. |
| FAQs                                                     | **Migrated and updated** for eight options and the enquiry-only model. |

---

## 2. Reference designs

| Reference | Palette | Fonts | Used for |
| --- | --- | --- | --- |
| balipeptidesonline.vercel.app (≈60%) | Ink `#101A21`, cream `#FFF9F1`, line `#ECDFD2`, copper `#CF9672` | Fraunces + Inter (+ Urbanist) | Overall art direction: cream canvas, ink headings, Fraunces display type, numbered product cards ("001"), hairline borders, calm section rhythm |
| peptidepensbali.vercel.app (≈40%) | Gold `#BC8222`, button `#A0691A`, accent `#F4F1E8`, line `#E7E0D0` | Poppins + Inter | Catalogue interaction: category grouping, product grid, gold accents, category-level browsing |

Both references include add-to-cart / WhatsApp ordering and urgency-style badges; these were
**not** carried over (out of scope / regulatory gate; PRD bans fake urgency).

### Resulting design system

- **Palette** (tokens in `src/styles/globals.css`): ink `#101A21`, cream `#FBF8F2`, sand
  `#F4EEE4`, line `#E7DFD2`, gold `#B8862B` (between the HGH logo gold and Peptide Pens gold),
  gold-deep `#8A5F14` for small accent text (≈5.2:1 contrast on cream), six status colour pairs.
- **Type:** Fraunces (display, optical sizing) + Inter (text), self-hosted via `next/font`.
- **Signature elements:** catalogue index numbers, "specimen record" hero card, hairline spec
  sheets, clearly labelled illustrative renders in place of unapproved photography, dashed "pending" badges that
  make unverified information visually distinct.

---

## 3. Assets

| Asset | Finding | Decision |
| --- | --- | --- |
| Logo (`WhatsApp-Image-…png`, transparent) | Approved brand mark | **Reused**, trimmed of empty padding → `public/images/brand/hgh-bali-logo.png` |
| Favicon (cropped logo, letters cut off) | Poor crop | Regenerated from the logo letters (`src/app/icon.png`, `apple-icon.png`) |
| `4.jpg` (hero background) | Clinic lobby interior, no visible brand | **Reused (15 Oct 2026)** as the homepage hero background → `public/images/site/hero-clinic-lobby.jpg` |
| `1.jpg` (used as product image and og:image) | Photo of a third-party clinic reception showing the **"AOBA CLINIC"** brand | Initially not reused (implies an affiliation and may infringe copyright/trademark). **Reused at the client's request (15 Oct 2026)** beside the Somatropin specifications on the homepage → `public/images/site/clinic-reception.jpg`. Not used as a product photo or og:image. |
| `0.jpg` ("100 IU complete box" image) | Photo of a third-party clinic showing **"longevity CENTER SWITZERLAND"** | Initially not reused (same reasons). **Reused at the client's request (15 Oct 2026)** beside the 100 IU complete box details on the homepage → `public/images/site/clinic-reception-hallway.jpg` |
| `2.jpg` (Delivery section) | Clinic treatment room interior, no visible brand | **Reused (15 Oct 2026)** in the homepage Delivery section → `public/images/site/clinic-treatment-room.jpg` |
| `Gemini_Generated_Image_…jpg` | AI-generated dark logo banner | **Reused (15 Oct 2026)** in the footer, as on the old site → `public/images/brand/hgh-banner.jpg` |
| Peptides Bali product images | Rendered images labelled "Research use only / not for human consumption" | Not used (conflicting labelling, not supplied for HGH Bali) |

**No authentic product photography exists.** Free stock libraries (Unsplash, Pexels,
Pixabay) were not reachable from the build environment, and openly licensed Wikimedia
images of vials and pens all show other companies' branded medicines. The site therefore
uses **generic 3D renders** (three.js, source in `docs/illustrations/scene.html`):
unlabelled glass vials with white powder (matching the "white lyophilised cake" wording
on the old site), a plain carton, and white-and-gold pen injectors. They carry no brand,
label text or strength, are always marked "Illustrative image", and are replaced
automatically when approved product photos are added (see README §4).

---

## 4. Required skills check

The PRD asks for the **Impeccable**, **Ninjutsu** and **Taste** skills. None of them is
installed in this development environment (only the `opencode` and `report` skills are
available), so **they were not used**. Design refinement was done manually against the
PRD's visual direction, with screenshot review at 390 px, 1024 px and 1440 px.

---

## 5. Client information still required (PRD §25)

| # | Item | Status |
| - | ---- | ------ |
| 1 | Names of the three HGH box options | Missing — placeholders used |
| 2 | Names of the five pen options | Missing — placeholders used |
| 3 | Product images | Missing — illustrations used |
| 4 | Verified specifications | Missing — "To be confirmed" |
| 5 | Manufacturer and packaging details | Missing |
| 6 | Prices (where permitted) | Not shown; field ready (`approvedForDisplay`) |
| 7 | Availability information | Missing — all products `draft` |
| 8 | Testing documentation | Pending (as on old site) |
| 9 | Regulatory status / authorisations | Missing — **blocking for any commerce** |
| 10 | Confirmation of matching products on Peptides Bali | Missing — candidates listed in `commerce-feasibility.md` |
| 11 | Approval of lawful transaction pathway | Missing — **blocking** |
| 12 | Final content and design approval | Pending |
| — | Official HGH Bali WhatsApp number and email | WhatsApp borrowed from sister sites; email empty |
| — | Which delivery fees are correct (HGH Bali vs Peptides Bali differ) | Needs confirmation |
| — | Legal review of Privacy Policy, Terms, Medical Disclaimer | Drafts provided, marked as drafts |

---

## 6. QA summary

- `npm run lint`, `npx tsc --noEmit`, `npm run build`: pass, no errors or warnings.
- All 12 required routes + 8 product pages statically prerendered.
- No horizontal overflow at 390 px, 1024 px or 1440 px on any page tested.
- Verified interactions: products dropdown (click, Escape returns focus), mobile menu
  (native dialog, closes on navigation), category filter (aria-pressed + live count),
  card navigation, FAQ accordion via keyboard, enquiry form validation and error/retry flow,
  gallery thumbnails, missing-image fallback.
- Redirects, canonical URLs, sitemap (draft products excluded), robots (blocked unless
  `SITE_INDEXING=enabled`), `X-Robots-Tag` on non-production.

### Lighthouse (local production build, Microsoft Edge headless)

| Page | Desktop perf | Mobile perf* | Accessibility | Best practices | SEO** |
| --- | --- | --- | --- | --- | --- |
| Home | 99 | 71–82 | 100 | 100 | 100 |
| Product catalogue | 98 | 73 | 100 | 100 | 100 |
| Product detail | 100 | 74–77 | 100 | 100 | 100 |
| Contact | 100 | 77–84 | 100 | 100 | 100 |

CLS is 0 on every page tested. Desktop LCP ≈ 0.7–0.8 s.

\* Mobile uses Lighthouse's simulated slow-4G + 4× CPU throttling on a local Windows
machine, and varied by ±10 points between identical runs. This headless browser also showed
a ~1.4 s first-paint delay even without throttling, which inflates simulated LCP (≈4.2 s).
Real-browser measurements on the same build showed FCP/LCP of 0.3–0.7 s. **The PRD mobile
target (90+, LCP ≤ 2.5 s) has not been demonstrated locally** — re-test on the deployed Vercel
URL with PageSpeed Insights before sign-off. Optimisations already applied: static
prerendering, server-rendered product cards (only the filter state ships as JavaScript),
self-hosted fonts with the italic face not preloaded, no images above the fold, client
gallery only when a product has several photos.
\*\* SEO is 69 while indexing is intentionally disabled (staging); 100 with
`SITE_INDEXING=enabled`.

The homepage photos carried over from the old site on 15 Oct 2026 (hero background,
Somatropin section, Delivery, footer banner — see §3) were added after these Lighthouse runs
and have not been re-measured.
