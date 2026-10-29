# HGH Bali — Website Katalog Produk

Website katalog produk premium untuk **HGH Bali by Atlas Longevity**, dibangun dengan
**Next.js 16 (App Router)**, **TypeScript** dan **Tailwind CSS 4**.

Website ini adalah **katalog produk dengan keranjang belanja**. Pengunjung menambahkan produk
ke keranjang di HGH Bali; saat checkout, isi keranjang otomatis dipindahkan ke
**peptidesbali.online** (WooCommerce) untuk pembayaran — lihat
[bagian 17](#17-keranjang-dan-checkout-peptides-bali). Catatan hukum/regulasi ada di
[`docs/commerce-feasibility.md`](docs/commerce-feasibility.md).

Dokumen lain:

- [`docs/audit.md`](docs/audit.md) — audit website lama, referensi desain, aset, dan daftar
  informasi yang masih dibutuhkan dari klien.
- [`docs/commerce-feasibility.md`](docs/commerce-feasibility.md) — studi kelayakan integrasi
  Peptides Bali.
- [`docs/seo-audit.md`](docs/seo-audit.md) — audit SEO & PageSpeed (before/after),
  riset kata kunci, dan rekomendasi lanjutan.

---

## Daftar isi

1. [Menjalankan website](#1-menjalankan-website)
2. [Struktur folder](#2-struktur-folder)
3. [Mengubah detail produk](#3-mengubah-detail-produk)
4. [Mengubah gambar produk](#4-mengubah-gambar-produk)
5. [Menambah produk baru](#5-menambah-produk-baru)
6. [Status produk](#6-status-produk)
7. [Mengubah data testing / sertifikat](#7-mengubah-data-testing--sertifikat)
8. [Mengubah warna dan font](#8-mengubah-warna-dan-font)
9. [Mengubah bagian homepage](#9-mengubah-bagian-homepage)
10. [Mengubah kontak, pengiriman dan FAQ](#10-mengubah-kontak-pengiriman-dan-faq)
11. [Formulir enquiry (email)](#11-formulir-enquiry-email)
12. [Google Analytics](#12-google-analytics)
13. [SEO dan indexing](#13-seo-dan-indexing)
14. [Build dan deploy](#14-build-dan-deploy)
15. [Pemeliharaan](#15-pemeliharaan)
16. [Checklist sebelum launch](#16-checklist-sebelum-launch)
17. [Keranjang dan checkout (Peptides Bali)](#17-keranjang-dan-checkout-peptides-bali)

---

## 1. Menjalankan website

**Persyaratan:** Node.js **20.9 atau lebih baru** (disarankan versi LTS terbaru) dan npm.

```bash
# 1. Install dependency (sekali saja)
npm install

# 2. Salin file konfigurasi (opsional untuk development)
cp .env.example .env.local

# 3. Jalankan mode development
npm run dev
```

Buka <http://localhost:3000>. Setiap perubahan file akan langsung terlihat di browser.

Perintah lain:

| Perintah          | Fungsi                                              |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Mode development                                    |
| `npm run build`   | Build versi produksi (cek error sebelum deploy)     |
| `npm start`       | Menjalankan hasil build produksi                    |
| `npm run lint`    | Memeriksa kualitas kode (ESLint)                    |
| `npx tsc --noEmit`| Memeriksa error TypeScript                          |

---

## 2. Struktur folder

```text
src/
├── app/                    # Halaman (setiap folder = URL)
│   ├── page.tsx            # Homepage  →  /
│   ├── layout.tsx          # Kerangka semua halaman (header, footer, font, SEO dasar)
│   ├── products/
│   │   ├── page.tsx        # /products/
│   │   ├── hgh-boxes/      # /products/hgh-boxes/
│   │   ├── single-vials/   # /products/single-vials/
│   │   ├── pens/           # /products/pens/
│   │   └── [slug]/         # /products/<slug>/  (halaman detail produk)
│   ├── testing/  about-hgh/  delivery/  faq/  contact/
│   ├── privacy-policy/  terms/  medical-disclaimer/
│   ├── sitemap.ts  robots.ts          # SEO otomatis
│   └── icon.png  favicon.ico  opengraph-image.png  # Ikon & gambar share sosial media
│
├── components/
│   ├── layout/             # Header, Footer, Breadcrumbs, PageHeader
│   ├── home/               # Bagian-bagian homepage
│   ├── products/           # Kartu produk, filter, galeri, status
│   ├── cart/               # Keranjang: drawer, tombol Add to cart / Buy now
│   ├── testing/            # Kartu hasil testing
│   ├── forms/              # Formulir enquiry
│   ├── analytics/          # Google Analytics + persetujuan cookie
│   └── ui/                 # Tombol, Container, Accordion, judul section
│
├── data/                   # ← SEMUA KONTEN YANG SERING DIUBAH ADA DI SINI
│   ├── products.ts         # 10 produk
│   ├── categories.ts       # Kategori (HGH Boxes, Single Vials, Pens)
│   ├── testing.ts          # Data batch testing / sertifikat
│   ├── delivery.ts         # Area & biaya pengiriman
│   ├── faqs.ts             # FAQ
│   ├── listed-product.ts   # Produk lama (10 IU / 3.33 mg) sebagai referensi
│   └── site.ts             # Nama, kontak WhatsApp, menu navigasi
│
├── lib/
│   ├── products.ts         # Fungsi untuk mengambil data produk
│   ├── commerce/           # Checkout ke Peptides Bali + stok & harga (lihat bagian 17)
│   ├── cart-store.ts       # Isi keranjang (disimpan di browser)
│   ├── enquiry.ts          # Pemrosesan formulir di server
│   ├── seo.ts  analytics.ts  whatsapp.ts
│
├── types/product.ts        # Definisi tipe data produk
└── styles/globals.css      # Warna, font, dan style dasar (design tokens)

public/images/              # Logo (brand/), foto produk (products/) dan kartu kategori (categories/)
docs/                       # Dokumentasi audit & integrasi
```

**Aturan sederhana:** ubah **konten** di `src/data/`, ubah **tampilan** di `src/components/`.

---

## 3. Mengubah detail produk

Semua produk ada di **`src/data/products.ts`**. Setiap produk adalah satu blok `{ ... }`.

```ts
{
  id: "vial-24iu",                 // ID internal unik — jangan diubah setelah launch
  slug: "hgh-24iu-vial",           // URL: /products/hgh-24iu-vial/
  name: "HGH 24 IU Vial",          // Nama produk
  category: "single-vials",        // "hgh-boxes", "single-vials" atau "pens"
  status: "draft",                 // lihat bagian 6
  shortDescription: "…",           // Ringkasan (kartu produk)
  description: ["Paragraf 1", "Paragraf 2"],
  images: [],                      // lihat bagian 4
  specifications: [
    { label: "Active ingredient", value: null },   // null = "To be confirmed"
    { label: "Labelled strength", value: "10 IU / 3.33 mg per vial" },
  ],
  packaging: [ … ],
  manufacturer: { name: null, details: null },
  documents: [ … ],                // dokumen (COA, dll.)
  faqs: [],                        // FAQ khusus produk (opsional)
  price: { … },                    // harga (lihat di bawah)
  commerce: { … },                 // ID produk di Peptides Bali (lihat bagian 17)
  seo: { title: "…", description: "…" },
}
```

**Penting:**

- Isi hanya informasi yang **sudah dikonfirmasi** (dari label produk / dokumen resmi).
- `value: null` otomatis tampil sebagai **"To be confirmed"**. Jangan menebak nilai.
- **Tiga spesifikasi pertama** tampil di kartu produk; semua spesifikasi tampil di halaman detail.
- Jika `slug` diubah setelah website live, tambahkan redirect di `next.config.ts`.

**Harga:** harga hanya tampil jika `approvedForDisplay: true` (`price: null` = tanpa harga):

```ts
price: { amount: 1_500_000, currency: "IDR", approvedForDisplay: true },
```

Untuk produk yang dijual lewat keranjang, website menampilkan **harga live dari Peptides
Bali** (dibaca ulang tiap 10 menit, lihat bagian 17), jadi harga selalu sama dengan peptidesbali.online.
`amount` hanya dipakai jika Peptides Bali tidak bisa diakses — tetap samakan dengan harga
di sana.

**Varian (pilihan di halaman produk):** produk bisa punya beberapa pilihan, masing-masing
dengan harga, stok dan ID variasi Peptides Bali sendiri — dipakai untuk tipe pen. Isi
`variants`, lalu `price: null` dan `commerce.variationId: null` di level produk:

```ts
variants: {
  label: "Pen type",               // judul pilihan di halaman produk
  options: [
    {
      id: "reusable",              // unik dalam produk; ID keranjang jadi "pen-10iu:reusable"
      label: "Reusable pen",       // tampil di pilihan & keranjang
      price: { amount: 2_100_000, currency: "IDR", approvedForDisplay: true },
      variationId: 9986,           // ID variasi WooCommerce
    },
    // …
  ],
},
```

Kartu produk lalu menampilkan **"From Rp …"** (harga terendah) dan tombol **Choose options**;
di halaman produk pengunjung memilih tipe, dan harga, stok, Add to cart serta Buy now ikut
pilihan itu. Pilihan pertama yang ada stoknya terpilih otomatis.

**Dokumen produk:** tautan hanya muncul jika `status: "available"` dan `href` diisi:

```ts
documents: [
  {
    id: "vial-24iu-coa",
    title: "Certificate of Analysis",
    type: "certificate-of-analysis",
    status: "available",
    href: "/documents/coa-batch-ABC123.pdf",
    batch: "ABC123",
  },
],
```

File PDF disimpan di `public/documents/` (buat foldernya jika belum ada).

---

## 4. Mengubah gambar produk

1. Simpan foto di **`public/images/products/<slug>/`**, contoh:
   `public/images/products/hgh-24iu-vial/main.webp`
2. Tambahkan ke `images` di `src/data/products.ts`:

```ts
images: [
  {
    src: "/images/products/hgh-24iu-vial/main.webp",
    alt: "Atlas Longevity HGH vial labelled 24 IU",
    width: 1254,
    height: 1254,
  },
  {
    src: "/images/products/hgh-24iu-vial/label.webp",
    alt: "HGH 24 IU vial — label close-up",
    width: 1200,
    height: 1200,
  },
],
```

- **Gambar pertama** = gambar utama (kartu produk & halaman detail).
- Lebih dari satu gambar → galeri thumbnail muncul otomatis.
- `width`/`height` = ukuran asli file dalam piksel.
- Tulis `alt` yang deskriptif (aksesibilitas & SEO), tanpa klaim medis.
- Rekomendasi: persegi **1200 × 1200 px**, JPG/WebP/PNG, latar polos. Next.js otomatis
  mengecilkan dan mengonversi gambar.
- **Hanya gunakan foto produk asli yang disetujui klien.** Jangan memakai foto klinik
  pihak ketiga atau gambar AI sebagai foto produk.
- Foto produk saat ini diambil dari halaman produk yang sama di peptidesbali.online
  (16 Oktober 2026), dikonversi ke WebP. Foto tampil di atas latar putih.

> **Perhatian:** label vial Atlas Longevity di foto bertuliskan *"Research use only / Not
> for human consumption"* / *"Research peptide"* — lihat `docs/commerce-feasibility.md` §3.

### Gambar ilustrasi (sementara)

Selama produk belum punya foto, website otomatis menampilkan **render 3D generik** sesuai
kategori, dengan label **"Illustrative image"**:

| File (`public/images/illustrative/`) | Dipakai di                              |
| ------------------------------------ | --------------------------------------- |
| `hero-vials-and-pen.jpg`             | Tidak dipakai lagi (cadangan hero)      |
| `hgh-boxes-wide.jpg` / `-square.jpg` | Kartu kategori & produk HGH Boxes       |
| `single-vials-wide.jpg` / `-square.jpg` | Kartu kategori & produk Single Vials (satu vial dari render HGH Boxes) |
| `pens-wide.jpg` / `-square.jpg`      | Kartu kategori & produk Pens            |

Render ini sengaja **tanpa merek, tanpa label, dan tanpa angka dosis**: vial kaca berisi
serbuk putih (sesuai deskripsi "white lyophilised cake" di website lama), kotak polos, dan
pen injector putih-emas. Gambar ini **bukan foto produk asli**.

- Begitu `images` produk diisi, render ilustrasi untuk produk tersebut otomatis diganti.
- Jika file foto produk tidak ditemukan (salah ketik nama), website kembali menampilkan
  render ilustrasi dan memberi peringatan di terminal saat `npm run dev`.
- Render ilustrasi kategori diatur di `illustration` pada `src/data/categories.ts`.
- Sumber 3D untuk membuat ulang render ada di `docs/illustrations/scene.html` (buka di
  browser, contoh: `scene.html?mode=hero&w=1400&h=1400`, lalu simpan gambar canvas).

### Logo, homepage dan kartu kategori

Foto interior klinik dari website lama (hero, AOBA Clinic, Longevity Center, ruang
perawatan) **sudah dihapus** atas permintaan klien (18 Oktober 2026: "looks like a clinic
website"). Semua gambar di homepage sekarang foto produk, ditampilkan di atas latar putih:

| Bagian                         | Gambar                                                        | Diatur di |
| ------------------------------ | ------------------------------------------------------------- | --------- |
| Logo (header & footer)         | `brand/atlas-hgh-bali-logo.png` — logo Atlas Longevity HGH Bali dari klien, latar putih dibuat transparan | `logo` — `src/data/site.ts` |
| Favicon / Apple icon           | `src/app/icon.png` + `src/app/favicon.ico` — tulisan "HGH" emas dari logo, latar **transparan** (permintaan klien 26 Okt 2026); `src/app/apple-icon.png` — sama, di atas latar gelap (iOS tidak mendukung transparansi) | file itu sendiri |
| Gambar share (WhatsApp, Facebook, X) | `src/app/opengraph-image.png`, `src/app/twitter-image.png` — logo baru di latar krem | file itu sendiri |
| Hero (kanan)                   | Foto produk **pertama** di katalog + 3 spesifikasi + harga     | urutan di `src/data/products.ts` |
| Kartu kategori                 | Box 100 IU · gabungan vial 10/24/36 IU (`categories/single-vials.webp`) · pen 10 IU | `photo` — `src/data/categories.ts` |
| Produk lama (Somatropin 10 IU) | Vial 10 IU dan box 100 IU dari katalog                        | `images` — `src/data/listed-product.ts` |
| Delivery                       | Pen 108 IU                                                    | `deliveryImage` — `src/data/site.ts` |

Aset asli dari klien ada di folder Google Drive "HGH New" (logo, foto box, vial dan pen).

---

## 5. Menambah produk baru

1. Buka `src/data/products.ts`.
2. Salin satu blok produk dari kategori yang sama, tempel di posisi yang diinginkan
   (urutan di file = urutan di website).
3. Ubah `id` dan `slug` menjadi **unik** (huruf kecil, pakai tanda `-`).
4. Isi data lainnya. Simpan.

Halaman detail, kartu katalog, filter, jumlah per kategori, sitemap dan pilihan produk di
formulir enquiry **terbarui otomatis**.

Yang perlu diubah manual: deskripsi singkat jumlah produk di menu dropdown
(`"The full catalogue of ten options"`, `"Two boxed options"`, `"Three single vial options"`,
`"Five pen options"`) pada `src/data/site.ts`, jawaban FAQ "What products does HGH Bali
list?" di `src/data/faqs.ts`, serta `seoTitle`/`seoDescription` kategori di
`src/data/categories.ts` yang menyebut ukuran IU (mis. "100 IU & 180 IU"), dan
deskripsi halaman `/products/` ("from 10 to 180 IU") di `src/app/products/page.tsx`.

**Menambah kategori baru** memerlukan perubahan kode kecil: tambahkan nilai baru di
`ProductCategory` (`src/types/product.ts`), di `categories` (termasuk `illustration`) dan
`categoryOrder` (`src/data/categories.ts`), di `filterLabels`
(`src/components/products/CatalogueFilter.tsx`), buat halaman baru di
`src/app/products/<kategori>/page.tsx` (salin dari `pens/page.tsx`), lalu tambahkan
tautannya di `src/data/site.ts`, `src/components/layout/Footer.tsx` dan `src/app/sitemap.ts`.

---

## 6. Status produk

| Status                    | Badge                    | Arti                                                  | Diindex Google? |
| ------------------------- | ------------------------ | ----------------------------------------------------- | --------------- |
| `draft`                   | — (tidak tampil)         | Informasi belum lengkap                               | Tidak           |
| `information-only`        | Information only         | Ditampilkan untuk informasi katalog                   | Ya              |
| `verification-required`   | Verification required    | Perlu verifikasi kelayakan/otorisasi                  | Ya              |
| `unavailable`             | Unavailable              | Sedang tidak tersedia                                 | Ya              |
| `documentation-pending`   | — (tidak tampil)         | Dokumen testing/regulasi belum lengkap                | Ya              |
| `approved`                | Approved listing         | Lolos review publikasi & kepatuhan                    | Ya              |

Badge tampil di pojok kartu produk dan di bawah judul halaman produk; legenda status di
`/products/` hanya muncul untuk status yang punya badge. Badge untuk `draft` dan
`documentation-pending` sengaja disembunyikan (29 Okt 2026, seperti hghbali.com lama):
badge "pending" yang sama di semua kartu tidak membantu pembeli, dan dokumen yang belum ada
tetap terlihat "Pending" di bagian Documentation produk dan di `/testing/`. Diatur di
`statusesWithoutBadge` (`src/lib/product-status.ts`).

Status **bukan** klaim kualitas. Sejak 29 Oktober 2026 kesepuluh produk berstatus
`documentation-pending` (sebelumnya `draft`): nama, foto, harga dan stok sudah terisi,
tetapi COA dan dokumen produsen belum. Halaman produk diindex dan masuk sitemap. Setelah
dokumen tersedia, ganti ke `information-only` atau `approved`. Status `draft` membuat
halaman `noindex` — pakai hanya untuk produk yang datanya belum siap.

Status tidak memengaruhi keranjang, kecuali `unavailable`: produk dengan status itu (atau
tanpa ID Peptides Bali) hanya menampilkan tombol enquiry — lihat bagian 17.

---

## 7. Mengubah data testing / sertifikat

Edit **`src/data/testing.ts`**. Setiap record mewakili satu batch:

```ts
{
  id: "somatropin-10iu-batch-abc123",
  productLabel: "Somatropin 10 IU / 3.33 mg",
  status: "completed",           // "pending" atau "completed"
  batch: "ABC123",
  laboratory: "Nama Laboratorium",
  testDate: "12 November 2026",
  reportId: "R-000123",
  testing: "Identity, purity, content",
  result: "Lihat sertifikat",
  certificateUrl: "/documents/coa-abc123.pdf",
  verifyUrl: "https://lab.example.com/verify/R-000123",
}
```

- Field yang `null` tampil sebagai **"Pending"**.
- Hanya gunakan `status: "completed"` jika sertifikat **untuk batch tersebut** sudah diterima
  dan diperiksa. Jangan menampilkan dokumen pending seolah sudah terverifikasi.
- Klik pada tombol sertifikat dicatat di Analytics sebagai `testing_document_view`.

---

## 8. Mengubah warna dan font

**Warna** — semua warna didefinisikan sekali di **`src/styles/globals.css`** dalam blok
`@theme`:

```css
@theme {
  --color-ink: #101a21;      /* teks judul, tombol utama, section gelap */
  --color-cream: #fbf8f2;    /* latar utama */
  --color-sand: #f4eee4;     /* latar section alternatif */
  --color-gold: #b8862b;     /* aksen dekoratif (garis, ikon) */
  --color-gold-deep: #8a5f14;/* teks aksen kecil (kontras cukup) */
  ...
}
```

Ubah nilai hex di sana — seluruh website ikut berubah. Kelas Tailwind seperti `bg-ink`,
`text-gold-deep`, `border-line` otomatis memakai token ini. **Jangan** menulis kode warna
langsung di komponen. Setelah mengubah warna, periksa kontras teks (minimal 4.5:1) dengan
alat seperti <https://webaim.org/resources/contrastchecker/>.

**Font** — diatur di `src/app/layout.tsx` (Fraunces untuk judul, Inter untuk teks). Font
diunduh saat build dan di-host sendiri oleh website (tidak memanggil server Google saat
dikunjungi). Untuk mengganti, ubah impor dari `next/font/google`.

---

## 9. Mengubah bagian homepage

Homepage disusun di **`src/app/page.tsx`**:

```tsx
<Hero />
<ListedProductSection />
<CategoryCards />
<CatalogueSection />
<DocumentationSection />
<TestingSection />
<DeliverySection />
<FaqSection />
<ContactCta />
```

- **Mengubah urutan:** pindahkan barisnya.
- **Menyembunyikan bagian:** hapus/beri komentar barisnya.
- **Mengubah teks:** buka komponennya di `src/components/home/` (mis. `Hero.tsx`).
- FAQ di homepage = pertanyaan dengan `featured: true` di `src/data/faqs.ts`.

---

## 10. Mengubah kontak, pengiriman dan FAQ

| Konten                         | File                    |
| ------------------------------ | ----------------------- |
| Nomor WhatsApp, email, menu    | `src/data/site.ts`      |
| Area & biaya pengiriman        | `src/data/delivery.ts`  |
| FAQ                            | `src/data/faqs.ts`      |
| Kategori produk                | `src/data/categories.ts`|

> **Catatan:** nomor WhatsApp saat ini (+62 823-2630-0167) diambil dari website saudara
> Atlas Longevity (balipeptides / peptide pens) karena widget WhatsApp di hghbali.com lama
> tidak dikonfigurasi dengan benar. **Konfirmasi nomor ini sebelum launch.** Email
> dikosongkan (`null`) sampai ada alamat resmi HGH Bali.

**Tombol WhatsApp melayang** (kanan bawah, semua halaman) ada di
`src/components/layout/WhatsAppButton.tsx` dan memakai nomor dari `site.ts`. Di halaman
produk, pesan otomatis menyebut nama produknya. Klik dicatat di GA4 sebagai `whatsapp_click`.

---

## 11. Formulir enquiry (email)

Formulir diproses di server (`src/lib/enquiry.ts`) dengan validasi, honeypot anti-spam dan
pembatasan jumlah kiriman. Pengiriman email memakai [Resend](https://resend.com):

1. Buat akun Resend, verifikasi domain (mis. `hghbali.com`), buat API key.
2. Isi variabel lingkungan (di `.env.local` atau dashboard hosting):

```bash
RESEND_API_KEY=re_xxxxxxxx
ENQUIRY_TO_EMAIL=tim@contoh.com
ENQUIRY_FROM_EMAIL="HGH Bali <enquiries@hghbali.com>"
```

- Mode development tanpa konfigurasi: enquiry hanya dicetak di terminal (tidak dikirim).
- Mode produksi tanpa konfigurasi: pengunjung melihat pesan error dan diarahkan ke WhatsApp.
- Formulir **tidak** meminta informasi kesehatan dan memperingatkan pengunjung untuk tidak
  mengirimkannya.

---

## 12. Google Analytics

Isi `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`. Jika kosong, analytics tidak dimuat sama sekali.

- Script GA4 **baru dimuat setelah pengunjung menekan "Accept analytics"** pada banner.
- Fitur iklan dan Google Signals dimatikan.
- Event yang dikirim (tanpa data pribadi/kesehatan): `product_list_view`,
  `product_detail_view`, `product_category_filter`, `testing_document_view`,
  `availability_enquiry` dan `contact_form_submit` (hanya setelah formulir berhasil terkirim).
- Daftarkan event tersebut sebagai *custom events* di GA4 bila diperlukan.

---

## 13. SEO dan indexing

- Judul, deskripsi, canonical, OpenGraph, breadcrumb (JSON-LD), sitemap (`/sitemap.xml`)
  dan `robots.txt` dibuat otomatis.
- Judul dan deskripsi per halaman: `buildMetadata(...)` di tiap `page.tsx`; produk di
  `seo` (`src/data/products.ts`), kategori di `seoTitle`/`seoDescription`
  (`src/data/categories.ts`). Panduan: judul ≤ 60 karakter termasuk akhiran " | HGH Bali",
  deskripsi 120–155 karakter, sebut kata kunci utama (HGH, Somatropin, ukuran IU, Bali)
  tanpa klaim medis.
- Gambar share: halaman produk memakai foto produk pertama; halaman lain memakai
  `src/app/opengraph-image.png` (lihat `defaultShareImage` di `src/lib/seo.ts`).
- Structured data (JSON-LD): `Organization` + `WebSite` di semua halaman, `BreadcrumbList`
  di halaman dalam, `FAQPage` di `/faq/`, dan `Product` (harga live + stok dari Peptides
  Bali) di halaman produk. Cek dengan <https://search.google.com/test/rich-results>.
- **Halaman produk berstatus `draft` diberi `noindex`** dan tidak masuk sitemap (bagian 6).
  Status lain diindex.
- **Indexing mati secara default.** Mesin pencari hanya boleh mengindex jika
  `SITE_INDEXING=enabled` **dan** bukan deployment preview Vercel. Jadi staging/preview tidak
  akan pernah diindex.
- Set `SITE_INDEXING=enabled` **hanya** di environment Production setelah konten disetujui.
- `NEXT_PUBLIC_SITE_URL` = domain final (default `https://hghbali.com`).
- URL lama WordPress (`/home/`, `/hello-world/`, `/category/...`, `/feed/`) diarahkan
  (redirect 308) ke halaman baru — lihat `redirects()` di `next.config.ts`.

---

## 14. Build dan deploy

### Cek sebelum deploy

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Semua harus selesai tanpa error.

### Deploy ke Vercel (disarankan)

1. Push proyek ke GitHub/GitLab.
2. Di <https://vercel.com> → **Add New Project** → pilih repository. Framework terdeteksi
   otomatis (Next.js).
3. Di **Settings → Environment Variables**, isi variabel dari `.env.example`.
   `SITE_INDEXING=enabled` hanya untuk environment **Production**.
4. Deploy. Setiap push ke branch lain menghasilkan *preview deployment* (otomatis noindex).
5. Hubungkan domain `hghbali.com` di **Settings → Domains**, lalu arahkan DNS sesuai
   petunjuk Vercel. Lakukan ini **setelah** konten disetujui, karena website lama
   (WordPress) akan digantikan.

### Hosting lain (VPS / Node.js)

```bash
npm ci
npm run build
npm start          # default port 3000; gunakan PORT=8080 npm start untuk port lain
```

Jalankan di belakang reverse proxy (Nginx/Caddy) dengan HTTPS, dan gunakan process manager
seperti PM2.

---

## 15. Pemeliharaan

- **Update dependency** setiap 1–3 bulan: `npm outdated`, lalu `npm update`. Untuk versi
  mayor Next.js, baca panduan upgrade resmi terlebih dahulu.
- Setelah update, selalu jalankan `npm run lint`, `npx tsc --noEmit`, `npm run build`, dan
  cek halaman utama di browser (desktop & mobile).
- Cek keamanan: `npm audit`.
- Uji performa dengan Lighthouse (Chrome DevTools) atau
  <https://pagespeed.web.dev/> setelah perubahan besar, terutama saat menambah foto.
- Simpan foto dengan ukuran wajar (< 500 KB per file).
- Jangan menambah klaim medis, dosis, atau protokol penggunaan tanpa review medis/hukum.

---

## 16. Checklist sebelum launch

- [ ] Nama, foto, spesifikasi, kemasan dan produsen 8 produk sudah dikonfirmasi klien.
- [x] Status produk diperbarui dari `draft` (→ `documentation-pending`, 29 Okt 2026).
- [ ] Data testing/sertifikat diperbarui (atau tetap jelas "Pending").
- [ ] Nomor WhatsApp & email resmi dikonfirmasi (`src/data/site.ts`).
- [ ] Biaya pengiriman dikonfirmasi (berbeda dengan peptidesbali.online — lihat audit).
- [ ] Teks Privacy Policy, Terms, Medical Disclaimer direview penasihat hukum, lalu hapus
      catatan "working draft" di `src/components/layout/LegalPage.tsx`.
- [ ] Resend dikonfigurasi dan formulir diuji (kirim satu enquiry percobaan).
- [ ] GA4 ID diisi (opsional).
- [ ] `SITE_INDEXING=enabled` di Production; `NEXT_PUBLIC_SITE_URL` benar.
- [ ] Pemetaan 8 produk ke ID Peptides Bali dikonfirmasi klien (bagian 17), lalu
      `mappingConfirmed: true`.
- [ ] Status regulasi produk dan jalur transaksi yang sah sudah dikonfirmasi klien (lihat
      `docs/commerce-feasibility.md` §7). Keranjang sudah aktif atas permintaan klien.

---

## 17. Keranjang dan checkout (Peptides Bali)

**Alur:** klik **Add to cart** (kartu produk / halaman produk) → keranjang terbuka dari
kanan → **Proceed to Checkout** → browser membuka
`https://peptidesbali.online/checkout-link/?products=5708:2,9984:1` → WooCommerce mengisi
keranjangnya dengan produk & jumlah yang sama lalu menampilkan halaman checkout.
**Buy now** di halaman produk langsung ke checkout dengan produk itu saja.

Ini memakai fitur bawaan WooCommerce (*checkout link*), jadi **tidak perlu plugin** di
peptidesbali.online. Sudah diuji 15 Oktober 2026: beberapa produk + jumlah masuk dengan benar.

**Pemetaan produk** — di `commerce` setiap produk (`src/data/products.ts`):

```ts
commerce: {
  destination: "peptides-bali",
  productId: 1217,       // ID produk WooCommerce
  variationId: 5708,     // ID variasi (null untuk produk tanpa variasi)
  mappingConfirmed: false,
},
```

Pemetaan saat ini (22 Oktober 2026):

| Produk HGH Bali | Peptides Bali (ID produk) | ID variasi |
| --------------- | ------------------------- | ---------- |
| HGH Somatropin 100 IU Box / 180 IU Box | HGH Somatropin Bali & Indonesia (`hgh-somatropin-bali-indonesia`, 10304) — 100 / 180 IU | 10305 / 10306 |
| HGH 10 / 24 / 36 IU Vial | HGH (`hgh-10iu-bali`, 1217) — 10 / 24 / 36 IU | 5708 / 10062 / 5709 |
| HGH Somatropin Pen 10 / 24 / 36 / 72 / 108 IU — *Disposable pen* | HGH Somatropin (`hgh-somatropin`, 9981) | 9984 / 10064 / 9985 / 10065 / 10066 |
| … — *Reusable pen* | HGH Somatropin (9981) | 9986 / 10067 / 9987 / 10068 / 10069 |
| … — *Cartridge* | HGH Somatropin (9981) | 9988 / 10070 / 9989 / 10071 / 10072 |

Kelima pen memakai `variants` (lihat bagian 3): tipe pen dipilih di halaman produk. Semua
tipe memakai foto disposable pen dengan IU yang sama, karena foto reusable pen dan cartridge
di Peptides Bali adalah infografis umum yang memperlihatkan peptide lain.

Cara mencari ID: buka
`https://peptidesbali.online/wp-json/wc/store/v1/products/<ID produk>` — daftar
`variations` berisi ID tiap variasi. Hapus `productId`/`variationId` (isi `null`) jika
produk tidak dijual online; produk itu otomatis kembali ke tombol enquiry.

**Stok dan harga** dibaca dari Store API Peptides Bali dan diperbarui tiap 10 menit
(`src/lib/commerce/stock.ts`). Produk yang habis tampil **Out of stock** dan tidak bisa
ditambahkan. Jika Peptides Bali tidak bisa diakses, produk tetap bisa ditambahkan
(WooCommerce yang mengecek stok saat checkout) dan harga dari `products.ts` yang tampil.

**Lainnya:**

- Isi keranjang disimpan di browser pengunjung (`localStorage`), maksimal 10 per produk.
- Harga tampil di kartu produk, halaman produk dan keranjang (harga per item dan subtotal).
  Ongkir ditambahkan dan pembayaran diselesaikan di Peptides Bali.
- Event GA4: `add_to_cart`, `begin_checkout` (tanpa data pribadi).
- **Mematikan keranjang:** di `src/lib/commerce/index.ts` ganti `peptidesBaliCartProvider`
  dengan `enquiryOnlyProvider`.
