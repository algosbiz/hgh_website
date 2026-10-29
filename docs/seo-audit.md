# HGH Bali — Audit SEO & PageSpeed (before / after)

**Tanggal:** 29 Oktober 2026
**Cakupan:** SEO teknis, title & meta description, heading, keyword per halaman, structured
data, gambar share sosial media, dan PageSpeed (Lighthouse) untuk website Next.js baru.

---

## 1. Ringkasan

| | Before | After |
| --- | --- | --- |
| Halaman dicek | 23 (13 di sitemap + 10 produk) | 23 |
| Title > 60 karakter | 1 (`/faq/`, 63) | **0** |
| Meta description > 155 karakter | 7 | **0** |
| Halaman dengan `og:image` (preview WhatsApp/Facebook/X) | 11 / 23 | **23 / 23** |
| Halaman dengan `Product` schema (harga + stok) | 0 / 10 | **10 / 10** |
| `WebSite` schema (nama situs "HGH Bali" di Google) | tidak ada | **ada di semua halaman** |
| Title/H1 kategori yang menyebut "HGH" + ukuran IU | 1 / 3 | **3 / 3** |
| Audit Lighthouse "LCP request discovery" (katalog, kategori, produk) | ✘ gagal | **✔ lolos** |
| Skor Performance mobile (katalog / pens / produk) | 92 / 92 / 94 | 91 / 91 / 94 (tidak berubah — §4) |
| Halaman produk bisa diindex Google | **0 / 10 (noindex)** | **10 / 10** (status `documentation-pending`, §6.1) |
| URL di sitemap | 13 | **23** |
| Skor Lighthouse SEO halaman produk | 69 | **100** |

Website sudah punya fondasi SEO yang baik (satu H1 per halaman, canonical benar, breadcrumb
schema, FAQ schema, semua gambar punya alt, CLS 0, aksesibilitas 100). Perbaikan terbesar
ada di **metadata** (title/description lebih spesifik dan sesuai kata kunci yang dicari),
**gambar share** yang hilang di 12 halaman, **structured data produk**, dan **prioritas
gambar LCP**. PageSpeed sudah tinggi sejak awal (Perf 91–100, A11y/BP 100); skor
Performance tidak berubah berarti setelah perbaikan (§4).

**Masalah terbesar** — ke-10 halaman produk `noindex` karena berstatus `draft` — sudah
diperbaiki dengan persetujuan: status diganti ke `documentation-pending` (§6.1), sehingga
halaman produk — yang paling mungkin menghasilkan penjualan — bisa diindex dan masuk sitemap.

---

## 2. Metode

- **Build produksi lokal** dengan `SITE_INDEXING=enabled` dan
  `NEXT_PUBLIC_SITE_URL=https://hghbali.com` (meniru kondisi saat launch), dijalankan dengan
  `next start` di port 3006.
- **Crawler** (script Node) membaca semua URL di sitemap + 10 halaman produk: status, title,
  description, canonical, robots, Open Graph, H1/H2, jumlah kata konten utama, alt gambar,
  JSON-LD, link internal, dan jumlah kemunculan kata kunci.
- **Lighthouse 13.6** (Chrome headless, mobile = Moto G Power + 4G lambat simulasi, desktop
  preset) pada 5 halaman: home, `/products/`, `/products/pens/`,
  `/products/hgh-somatropin-pen-10iu/`, `/faq/`.
- **Data kata kunci**: Ahrefs Keywords Explorer, negara Indonesia (Oktober 2026).
- Catatan: **hghbali.com saat ini masih website WordPress lama** — website Next.js ini
  belum live, jadi semua angka di bawah diukur dari build lokal. Ahrefs mencatat hghbali.com
  belum ranking untuk kata kunci apa pun.

---

## 3. Riset kata kunci (Indonesia, volume / bulan)

| Kata kunci | Volume | KD | Intent | Halaman target |
| --- | ---: | ---: | --- | --- |
| hgh | 700 | 16 | informasi / komersial | Home, About HGH |
| growth hormone | 400 | 0 | informasi | About HGH |
| peptides bali | 350 | – | lokal / transaksi | (domain Peptides Bali) |
| somatropin | 250 | 0 | informasi / komersial | Home, About HGH, semua produk |
| human growth hormone | 150 | 53 | informasi | About HGH |
| harga hgh | 80 | – | transaksi | Halaman produk ("Price") |
| hgh bali | 80 | – | lokal | Home (brand) |
| hgh pen | 30 | – | transaksi | `/products/pens/` |
| hgh 10 iu | 20 | – | komersial | Vial 10 IU, Pen 10 IU |
| jual hgh | 20 | – | transaksi | Halaman produk (intent beli) |
| hgh vial / hgh price | 10 | – | komersial | Single vials, produk |
| hgh indonesia, hgh 36 iu, hgh 100 iu, beli hgh | 0 | – | – | tidak diprioritaskan |

Kesimpulan:

- Volume terbesar ada di **"hgh"**, **"growth hormone"** dan **"somatropin"** (informasi),
  lalu **"harga hgh"** dan **"hgh bali"** (siap beli / lokal). Title halaman sekarang
  menyebut "HGH", "Somatropin", ukuran IU dan "Price".
- "HGH Indonesia" yang dulu ada di title lama **volumenya 0**, jadi tidak dipakai di title;
  Indonesia tetap disebut di description dan konten.
- Kata kunci berbasis klaim manfaat ("anti-aging", "muscle", "fat loss") dan penggunaan
  ("injection", "dosage") **sengaja tidak dipakai**, sesuai aturan README §15 (tanpa klaim
  medis, dosis, atau protokol tanpa review medis/hukum).

---

## 4. PageSpeed (Lighthouse, build lokal)

Format: **before → after**. Perf/A11y/BP/SEO = skor 0–100. LCP mobile memakai simulasi
4G lambat + CPU 4× lebih lambat.

| Halaman | Device | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Mobile | 100 → 100 | 100 | 100 | 100 | 1.0 → 0.9 s | 1.0 → 0.9 s | 80 → 60 ms | 0 |
| Home | Desktop | 100 → 100 | 100 | 100 | 100 | 0.3 s | 0.8 s | 20 → 0 ms | 0 |
| `/products/` | Mobile | 92 → 91 | 100 | 100 | 100 | 0.9 s | 3.4 → 3.4 s | 40 → 110 ms | 0 |
| `/products/` | Desktop | 100 → 100 | 100 | 100 | 100 | 0.2 → 0.3 s | 0.8 → 0.7 s | 0 ms | 0 |
| `/products/pens/` | Mobile | 92 → 91 | 100 | 100 | 100 | 0.9 s | 3.4 → 3.5 s | 40 → 50 ms | 0 |
| `/products/pens/` | Desktop | 100 → 100 | 100 | 100 | 100 | 0.2 s | 0.7 s | 0 ms | 0 |
| Produk (Pen 10 IU) | Mobile | 94 → 92 | 100 | 100 | **69 → 100*** | 0.9 s | 3.2 → 3.3 s | 50 ms | 0 |
| Produk (Pen 10 IU) | Desktop | 100 → 100 | 100 | 100 | **69 → 100*** | 0.3 → 0.2 s | 0.7 s | 0 ms | 0 |
| `/faq/` | Mobile | 100 → 100 | 100 | 100 | 100 | 0.9 s | 0.9 s | 40 ms | 0 |
| `/faq/` | Desktop | 100 → 100 | 100 | 100 | 100 | 0.2 s | 0.2 s | 0 ms | 0 |

\* SEO 69 sebelumnya = audit *"Page is blocked from indexing"* gagal karena status `draft`.
Setelah status diganti ke `documentation-pending` (§6.1) menjadi 100. Angka halaman produk
"after" diukur setelah perubahan status.

| Audit "LCP request discovery" | Before | After |
| --- | --- | --- |
| `/products/`, `/products/pens/`, halaman produk | ✘ gagal (gambar LCP `lazy`, tanpa `fetchpriority`) | ✔ lolos |
| Prioritas request gambar LCP di `/products/` | Low, mulai di 91 ms | **High, mulai di 38 ms** |
| Waktu tunggu request gambar LCP (observed) | 82 ms | **28 ms** |

**Catatan jujur soal LCP mobile:** skor simulasi LCP mobile di halaman katalog/kategori/
produk **tidak turun** (3.1–3.5 s, selisih ±0.1 s = variasi antar-run). Gambar LCP sekarang
dimuat lebih awal dengan prioritas tinggi, tetapi model simulasi Lighthouse menghitung semua
request yang dimulai sebelum LCP — termasuk ±180 KB JavaScript Next.js/React — di jaringan
4G lambat. Di trace asli, LCP sudah tampil bersamaan dengan FCP (±150 ms). Angka real-user
baru bisa dipastikan setelah launch lewat PageSpeed Insights (data CrUX).

Situs live hghbali.com (WordPress lama) tidak bisa diukur dari sini: CDN Hostinger membalas
**403** ke Chrome headless, dan kuota harian PageSpeed Insights API publik sedang habis.
Cek manual di <https://pagespeed.web.dev/> bila perlu pembanding.

**Penyebab LCP mobile lambat (before):** di halaman katalog dan kategori, LCP adalah foto
kartu produk pertama yang diberi `loading="lazy"` tanpa `fetchpriority`; di halaman produk
foto utama di-preload tetapi tanpa `fetchpriority="high"`.
**Perbaikan:** foto kartu pertama di `/products/` dan halaman kategori, serta foto utama
halaman produk, sekarang `loading="eager"` + `fetchpriority="high"` (sesuai rekomendasi
dokumentasi Next.js 16 untuk gambar LCP). Kartu lainnya tetap lazy.

Sisa temuan Lighthouse (tidak diubah, dampak kecil):

- *Unused / legacy JavaScript* (~28 KB + 14 KB) — berasal dari runtime Next.js/React.
- *Image delivery* (~20 KB per foto kartu) — foto disajikan di lebar 750 px untuk kartu
  ±370 px di layar 1.75×; sudah WebP/AVIF otomatis.
- *Render-blocking CSS* (~50–80 ms) — satu file CSS Tailwind; normal untuk Next.js.

---

## 5. Title, meta description & H1 — per halaman

Panjang dalam karakter. Akhiran " | HGH Bali" ditambahkan otomatis oleh template.

### Halaman utama & kategori

| Halaman | Before | After |
| --- | --- | --- |
| `/` title | HGH Bali \| Somatropin Product Information & Specifications (58) | **HGH Bali \| Somatropin HGH Pens, Vials & Boxes in Bali** (53) |
| `/` description | HGH Bali by Atlas Longevity: product catalogue, labelled specifications, packaging details and batch testing documentation for HGH boxes, single vials and pens in Bali and Indonesia. (**182 — terpotong di Google**) | HGH Bali by Atlas Longevity: somatropin (human growth hormone) pens, vials and boxes with labelled specifications, prices, batch records and Bali delivery. (155) |
| `/products/` title | Product Catalogue — HGH Boxes, Vials & Pens \| HGH Bali (54) | **HGH Products — Somatropin Pens, Vials & Boxes** \| HGH Bali (56) |
| `/products/` description | The HGH Bali product catalogue by Atlas Longevity: HGH boxes, single vials and pens with labelled specifications, packaging details, prices and batch documentation. (164) | The full HGH Bali catalogue by Atlas Longevity: somatropin pens, single vials and boxes from 10 to 180 IU, with labelled specifications and current prices. (155) |
| `/products/` H1 | Product catalogue | **HGH product catalogue** |
| `/products/hgh-boxes/` title | HGH Boxes — Product Catalogue \| HGH Bali (40) | **HGH Somatropin Boxes — 100 IU & 180 IU** \| HGH Bali (49) |
| `/products/hgh-boxes/` description | Browse the HGH box options in the HGH Bali catalogue by Atlas Longevity, with labelled specifications, packaging details and batch documentation. (145) | HGH Somatropin boxes by Atlas Longevity: 100 IU (10 × 10 IU vials) and 180 IU (5 × 36 IU vials), with labelled specifications, prices and delivery in Bali. (155) |
| `/products/hgh-boxes/` H1 | HGH Boxes | **HGH Somatropin Boxes** |
| `/products/single-vials/` title | Single HGH Vials — Product Catalogue \| HGH Bali (47) | **Single HGH Vials — 10 IU, 24 IU & 36 IU** \| HGH Bali (50) |
| `/products/single-vials/` description | Browse the single HGH vial options in the HGH Bali catalogue by Atlas Longevity, with labelled specifications, packaging details and batch documentation. (153) | Single HGH Somatropin vials by Atlas Longevity labelled 10 IU, 24 IU and 36 IU, with specifications, packaging details, prices and delivery in Bali. (148) |
| `/products/single-vials/` H1 | Single Vials | **Single HGH Vials** |
| `/products/pens/` title | Pens — Product Catalogue \| HGH Bali (35 — **tanpa kata "HGH"**) | **HGH Somatropin Pens — 10 IU to 108 IU** \| HGH Bali (48) |
| `/products/pens/` description | Browse the pen options in the HGH Bali catalogue by Atlas Longevity, with labelled specifications, packaging details and batch documentation. (141) | HGH Somatropin pens by Atlas Longevity from 10 IU to 108 IU, as a disposable pen, reusable pen or cartridge, with specifications, prices and Bali delivery. (155) |
| `/products/pens/` H1 | Pens | **HGH Somatropin Pens** |

### Halaman informasi

| Halaman | Before | After |
| --- | --- | --- |
| `/about-hgh/` title | About HGH — What Is Somatropin? \| HGH Bali (42) | **What Is HGH? Somatropin & Growth Hormone Basics** \| HGH Bali (58) |
| `/about-hgh/` description | Factual information about somatropin (human growth hormone), its medical context and important safety information, from HGH Bali by Atlas Longevity. (148) | What HGH (somatropin, human growth hormone) is, how it is used medically and key safety information. Factual context from HGH Bali, not medical advice. (151) |
| `/about-hgh/` H1 | What is somatropin? | **What is HGH (somatropin)?** (+ intro: "…human growth hormone (HGH)") |
| `/delivery/` title | Delivery in Bali & Indonesia \| HGH Bali (39) | **HGH Delivery in Bali & Indonesia — Areas & Fees** \| HGH Bali (58) |
| `/delivery/` description | Delivery-only service across Bali, including Canggu, Seminyak, Ubud, Sanur, Uluwatu and Nusa Dua, with enquiries welcome from across Indonesia. (143) | Discreet HGH Bali delivery across Canggu, Seminyak, Ubud, Sanur, Uluwatu and Nusa Dua, with fees listed and enquiries welcome from across Indonesia. (148) |
| `/faq/` title | Frequently Asked Questions — HGH in Bali & Indonesia \| HGH Bali (**63 — terlalu panjang**) | **HGH FAQs — Products, Testing & Delivery in Bali** \| HGH Bali (58) |
| `/faq/` description | Answers about the HGH Bali catalogue, batch testing, delivery in Bali and Indonesia, and how enquiries work. (108 — pendek) | Answers about HGH Bali: somatropin pens, vials and boxes, batch testing records, delivery fees in Bali and Indonesia, and how ordering works. (141) |
| `/faq/` H1 | Frequently asked questions | **HGH Bali FAQs** |
| `/contact/` description | Contact Atlas Longevity about HGH Bali products, batch documentation, current availability and delivery in Bali and Indonesia. (126) | Contact HGH Bali by Atlas Longevity on WhatsApp or by enquiry form about products, availability, batch documentation and delivery in Bali and Indonesia. (152) |
| `/testing/`, legal pages | — | tidak diubah (sudah sesuai) |

### Halaman produk (10)

Pola diganti dari "— Product Information" (tidak dicari orang) menjadi "— Price & Specs" /
"— Price & Specifications" (menangkap intent "harga hgh" / "hgh price"). Description pen
dipendekkan dari 168–169 menjadi 141–142 karakter supaya tidak terpotong, dan semua
description sekarang menyebut "Somatropin" dan "delivery in Bali".

| Produk | Title before → after | Description (panjang) |
| --- | --- | --- |
| Box 100 IU | …100 IU Box — Product Information (58) → **…100 IU Box — Price & Specs** (52) | 144 → 142 |
| Box 180 IU | …180 IU Box — Product Information (58) → **…180 IU Box — Price & Specs** (52) | 143 → 141 |
| Vial 10 / 24 / 36 IU | HGH xx IU Vial — Product Information (47) → **HGH xx IU Vial — Price & Specifications** (50) | 130 → 133 |
| Pen 10 / 24 / 36 / 72 IU | …Pen xx IU — Product Information (57) → **…Pen xx IU — Price & Specs** (51) | 168 → 141 |
| Pen 108 IU | …Pen 108 IU — Product Information (58) → **…Pen 108 IU — Price & Specs** (52) | 169 → 142 |

Contoh description produk baru (Pen 10 IU):
> HGH Somatropin 10 IU by Atlas Longevity as a disposable pen, reusable pen or cartridge:
> prices, labelled specifications and delivery in Bali.

**H1 halaman produk** (nama produk, mis. "HGH Somatropin Pen 10 IU") sudah tepat — tidak
diubah. **Isi konten produk** juga tidak diubah: teksnya sudah review kepatuhan dan sudah
menyebut "Somatropin" 15–29 kali per halaman.

---

## 6. SEO teknis

| Pemeriksaan | Before | After |
| --- | --- | --- |
| robots.txt (production) | `Allow: /` + sitemap ✔ | sama |
| Sitemap | 13 URL, 10 produk `draft` dikecualikan | **23 URL** (semua produk masuk) |
| Robots meta halaman produk | `noindex, follow` ✘ | **`index, follow`** |
| Canonical per halaman | ✔ semua halaman | ✔ |
| Canonical di halaman 404 | ikut warisan root layout → `https://hghbali.com/` ✘ | **tidak ada canonical** (404 tetap `noindex`) |
| `og:image` / `twitter:image` | hanya home + produk (11/23); 12 halaman lain **tanpa gambar** karena `openGraph` halaman menimpa milik root | **23/23** — gambar logo untuk halaman umum, foto produk untuk halaman produk |
| JSON-LD | Organization, BreadcrumbList, FAQPage | + **WebSite** (nama situs), Organization + `contactPoint` WhatsApp, **Product** + Offer/AggregateOffer (harga IDR live & stok dari Peptides Bali) |
| H1 per halaman | 1 di semua halaman ✔ | ✔ |
| Gambar tanpa alt | 0 ✔ | 0 ✔ |
| `lang="en"` | ✔ | ✔ |
| Redirect URL WordPress lama (308) | ✔ | ✔ |
| Halaman staging/preview | `noindex` + `X-Robots-Tag` ✔ | ✔ |

Contoh `Product` schema baru (Pen 10 IU):

```json
{
  "@type": "Product",
  "name": "HGH Somatropin Pen 10 IU",
  "sku": "pen-10iu",
  "brand": { "@type": "Brand", "name": "Atlas Longevity" },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": 1500000, "highPrice": 2100000, "offerCount": 3,
    "priceCurrency": "IDR", "availability": "https://schema.org/InStock"
  }
}
```

### 6.1 Status produk: `draft` → `documentation-pending`

Ke-10 produk berstatus `draft` sejak awal proyek (saat data produk belum ada), sehingga
`isIndexableProduct()` memberi `noindex` dan produk tidak masuk sitemap. Sekarang nama, foto,
harga dan stok sudah terisi, tetapi sertifikat (COA) dan dokumen produsen masih *pending*,
jadi statusnya diganti ke **`documentation-pending`** ("Testing or regulatory documentation
for this product is not yet complete") — tetap jujur terhadap kondisi dokumen, tetapi bisa
diindex.

| | Before (`draft`) | After (`documentation-pending`) |
| --- | --- | --- |
| Robots meta | `noindex, follow` | `index, follow` |
| Di sitemap | tidak | ya (10 URL baru) |
| Badge di kartu & halaman produk | "Details pending" | tidak tampil (badge status pending disembunyikan, seperti hghbali.com lama; dokumen tetap "Pending" di bagian Documentation & `/testing/`) |
| Keranjang / harga | tidak berubah | tidak berubah |
| Lighthouse SEO | 69 | 100 |

---

## 7. Keyword per konten (jumlah kemunculan di konten utama)

| Halaman | somatropin | "hgh bali" | bali | indonesia | kata |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 35 | 5 | 13 | 1 | 1.499 |
| `/products/` | 27 | 0 | 0 | 0 | 680 |
| `/products/hgh-boxes/` | 6 | 0 | 0 | 0 | 217 |
| `/products/single-vials/` | 3 | 0 | 0 | 0 | 230 |
| `/products/pens/` | 19 | 0 | 0 | 0 | 366 |
| `/about-hgh/` | 9 | 3 | 4 | 1 | 470 |
| `/delivery/` | 0 | 0 | 4 | 3 | 230 |
| `/faq/` | 5 | 2 | 8 | 2 | 652 |
| Produk (rata-rata) | 15–29 | 0 | 3–4 | 0 | 848–983 |

Catatan:

- "Somatropin" sudah sangat kuat di semua halaman produk dan katalog.
- **Halaman kategori tipis** (217–366 kata) dan tidak menyebut "Bali" di konten.
  Rekomendasi: tambahkan 1–2 paragraf faktual per kategori (perbedaan box/vial/pen, isi
  kemasan, ukuran IU yang tersedia, pengiriman di Bali) — §8.1.
- Keyword lokal ("Bali", "Indonesia") sudah dibawa lewat title/description; pada konten
  produk hanya muncul di bagian pengiriman.

---

## 8. Belum diubah — butuh keputusan / pekerjaan lanjutan

### 8.1 Konten

- Tambah paragraf deskriptif di 3 halaman kategori (lihat §7).
- Begitu COA dan dokumen produsen tersedia, ganti status produk ke `information-only` atau
  `approved` (README §6) dan isi dokumennya — badge "Documentation pending" lalu hilang.
- Pertimbangkan konten bahasa Indonesia (mis. halaman "Apa itu HGH?" untuk "hgh adalah",
  parent topic dari "hgh") — butuh review medis/hukum.

### 8.2 Setelah launch

- Daftarkan domain di **Google Search Console**, kirim `https://hghbali.com/sitemap.xml`,
  cek *Page indexing* dan *Rich results*.
- Ukur ulang dengan **PageSpeed Insights** di URL live (data lapangan/CrUX baru muncul
  setelah ada trafik).
- Backlink: hghbali.com belum punya kata kunci ranking; tautan dari situs saudara (Peptides
  Bali, Peptide Pens Bali) dan Google Business Profile (jika diizinkan) membantu.
- Deskripsi halaman legal (77–81 karakter) pendek, tetapi prioritas rendah.

---

## 9. File yang diubah

| File | Perubahan |
| --- | --- |
| `src/lib/seo.ts` | `defaultShareImage`; `buildMetadata` selalu menyertakan `og:image` + `twitter:image` |
| `src/app/layout.tsx` | Title default baru; hapus canonical root yang terwarisi ke 404; JSON-LD `Organization` + `WebSite` |
| `src/app/page.tsx`, `src/data/site.ts` | Title & description homepage |
| `src/app/products/page.tsx` | Title, description, H1, foto kartu pertama eager |
| `src/data/categories.ts`, `src/components/products/CategoryPage.tsx` | `seoTitle`/`seoDescription` baru, field `heading` untuk H1 kategori |
| `src/app/about-hgh/page.tsx`, `delivery/`, `faq/`, `contact/` | Title, description, H1 |
| `src/data/products.ts` | `seo.title` & `seo.description` 10 produk; status `draft` → `documentation-pending` |
| `src/app/products/[slug]/page.tsx`, `src/lib/products.ts` | `Product` JSON-LD (`getProductJsonLd`), share image lewat `buildMetadata` |
| `src/components/products/ProductImage.tsx`, `ProductCard.tsx`, `ProductGrid.tsx`, `FilterableCatalogue.tsx`, `ProductMedia.tsx`, `ProductGallery.tsx` | Prop `eager` / `eagerFirst`: gambar LCP `loading="eager"` + `fetchpriority="high"` |
| `README.md` | Panduan SEO (§13) dan daftar teks yang perlu diubah manual (§5) |
| `.claude/launch.json` | Konfigurasi `hgh-bali-prod` (`next start` port 3006) untuk uji Lighthouse |
