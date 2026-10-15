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
│   │   ├── pens/           # /products/pens/
│   │   └── [slug]/         # /products/<slug>/  (halaman detail produk)
│   ├── testing/  about-hgh/  delivery/  faq/  contact/
│   ├── privacy-policy/  terms/  medical-disclaimer/
│   ├── sitemap.ts  robots.ts          # SEO otomatis
│   └── icon.png  opengraph-image.png  # Ikon & gambar share sosial media
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
│   ├── products.ts         # 8 produk
│   ├── categories.ts       # Kategori (HGH Boxes, Pens)
│   ├── testing.ts          # Data batch testing / sertifikat
│   ├── delivery.ts         # Area & biaya pengiriman
│   ├── faqs.ts             # FAQ
│   ├── listed-product.ts   # Produk lama (10 IU / 3.33 mg) sebagai referensi
│   └── site.ts             # Nama, kontak WhatsApp, menu navigasi
│
├── lib/
│   ├── products.ts         # Fungsi untuk mengambil data produk
│   ├── commerce/           # Checkout ke Peptides Bali + stok (lihat bagian 17)
│   ├── cart-store.ts       # Isi keranjang (disimpan di browser)
│   ├── enquiry.ts          # Pemrosesan formulir di server
│   ├── seo.ts  analytics.ts  whatsapp.ts
│
├── types/product.ts        # Definisi tipe data produk
└── styles/globals.css      # Warna, font, dan style dasar (design tokens)

public/images/              # Logo, foto dari website lama (site/) dan foto produk
docs/                       # Dokumentasi audit & integrasi
```

**Aturan sederhana:** ubah **konten** di `src/data/`, ubah **tampilan** di `src/components/`.

---

## 3. Mengubah detail produk

Semua produk ada di **`src/data/products.ts`**. Setiap produk adalah satu blok `{ ... }`.

```ts
{
  id: "hgh-box-1",                 // ID internal unik — jangan diubah setelah launch
  slug: "hgh-box-option-1",        // URL: /products/hgh-box-option-1/
  name: "HGH Box Option 1",        // Nama produk
  category: "hgh-boxes",           // "hgh-boxes" atau "pens"
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
  price: null,                     // harga — hanya tampil jika disetujui
  commerce: { … },                 // ID produk di Peptides Bali (lihat bagian 17)
  seo: { title: "…", description: "…" },
}
```

**Penting:**

- Isi hanya informasi yang **sudah dikonfirmasi** (dari label produk / dokumen resmi).
- `value: null` otomatis tampil sebagai **"To be confirmed"**. Jangan menebak nilai.
- **Tiga spesifikasi pertama** tampil di kartu produk; semua spesifikasi tampil di halaman detail.
- Jika `slug` diubah setelah website live, tambahkan redirect di `next.config.ts`.

**Harga:** harga hanya tampil jika `approvedForDisplay: true` (setelah ada persetujuan hukum):

```ts
price: { amount: 5500000, currency: "IDR", approvedForDisplay: true },
```

**Dokumen produk:** tautan hanya muncul jika `status: "available"` dan `href` diisi:

```ts
documents: [
  {
    id: "hgh-box-1-coa",
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
   `public/images/products/hgh-box-option-1/main.jpg`
2. Tambahkan ke `images` di `src/data/products.ts`:

```ts
images: [
  {
    src: "/images/products/hgh-box-option-1/main.jpg",
    alt: "HGH Box Option 1 — outer box, front view",
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/products/hgh-box-option-1/vial.jpg",
    alt: "HGH Box Option 1 — single vial label",
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

### Gambar ilustrasi (sementara)

Selama produk belum punya foto, website otomatis menampilkan **render 3D generik** sesuai
kategori, dengan label **"Illustrative image"**:

| File (`public/images/illustrative/`) | Dipakai di                              |
| ------------------------------------ | --------------------------------------- |
| `hero-vials-and-pen.jpg`             | Tidak dipakai lagi (cadangan hero)      |
| `hgh-boxes-wide.jpg` / `-square.jpg` | Kartu kategori & produk HGH Boxes       |
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

### Foto dari website lama (hghbali.com)

Atas permintaan klien, foto dari website WordPress lama dipakai lagi di section yang sama
seperti di website lama. File ada di `public/images/site/` dan `public/images/brand/`:

| File                                   | Asal (website lama)          | Dipakai di                                   | Diatur di                               |
| -------------------------------------- | ---------------------------- | -------------------------------------------- | --------------------------------------- |
| `site/hero-clinic-lobby.jpg`           | `4.jpg` (background hero)    | Background hero homepage                     | `heroImage` — `src/data/site.ts`        |
| `site/clinic-reception.jpg`            | `1.jpg` (section Product)    | Homepage — spesifikasi Somatropin            | `images` — `src/data/listed-product.ts` |
| `site/clinic-reception-hallway.jpg`    | `0.jpg` (100 IU Complete Box)| Homepage — 100 IU complete box               | `images` — `src/data/listed-product.ts` |
| `site/clinic-treatment-room.jpg`       | `2.jpg` (section Delivery)   | Homepage — section Delivery                  | `deliveryImage` — `src/data/site.ts`    |
| `brand/hgh-banner.jpg`                 | Banner "HGH" di footer       | Footer semua halaman                         | `footerBanner` — `src/data/site.ts`     |

> **Perhatian:** `clinic-reception.jpg` menampilkan tulisan **"AOBA CLINIC"** dan
> `clinic-reception-hallway.jpg` menampilkan **"longevity CENTER SWITZERLAND"** — merek
> klinik pihak ketiga. Pastikan klien punya izin memakai foto ini (lihat `docs/audit.md` §3).
> Untuk menggantinya, cukup timpa file dengan nama yang sama atau ubah `src` di file data.

Foto-foto ini adalah foto interior klinik, **bukan foto produk**, sehingga tidak dipakai di
kartu/halaman produk.

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
(`"Three boxed options"`, `"Five pen options"`) pada `src/data/site.ts`.

**Menambah kategori baru** memerlukan perubahan kode kecil: tambahkan nilai baru di
`ProductCategory` (`src/types/product.ts`), di `categories` dan `categoryOrder`
(`src/data/categories.ts`), buat halaman baru di `src/app/products/<kategori>/page.tsx`
(salin dari `pens/page.tsx`), dan tambahkan ilustrasinya di
`src/components/products/ProductIllustration.tsx`.

---

## 6. Status produk

| Status                    | Tampil sebagai          | Arti                                                  | Diindex Google? |
| ------------------------- | ----------------------- | ----------------------------------------------------- | --------------- |
| `draft`                   | Details pending         | Informasi belum lengkap                               | Tidak           |
| `information-only`        | Information only        | Ditampilkan untuk informasi katalog                   | Ya              |
| `verification-required`   | Verification required   | Perlu verifikasi kelayakan/otorisasi                  | Ya              |
| `unavailable`             | Unavailable             | Sedang tidak tersedia                                 | Ya              |
| `documentation-pending`   | Documentation pending   | Dokumen testing/regulasi belum lengkap                | Ya              |
| `approved`                | Approved listing        | Lolos review publikasi & kepatuhan                    | Ya              |

Status **bukan** klaim kualitas. Saat ini kedelapan produk berstatus `draft`, sehingga
halaman detailnya diberi `noindex` dan tidak masuk sitemap. Ganti status setelah data
produk dikonfirmasi.

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
- [ ] Status produk diperbarui dari `draft`.
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

Pemetaan saat ini **sementara** (tebakan dari katalog Peptides Bali) dan **harus
dikonfirmasi klien**:

| Produk HGH Bali | Peptides Bali                                 | ID variasi |
| --------------- | --------------------------------------------- | ---------- |
| HGH Box Option 1–3 | HGH (`hgh-10iu-bali`) — 10 / 24 / 36 IU    | 5708 / 10062 / 5709 |
| Pen Option 1–5  | HGH Somatropin, disposable pen — 10 / 24 / 36 / 72 / 108 IU | 9984 / 10064 / 9985 / 10065 / 10066 |

Cara mencari ID: buka
`https://peptidesbali.online/wp-json/wc/store/v1/products/<ID produk>` — daftar
`variations` berisi ID tiap variasi. Hapus `productId`/`variationId` (isi `null`) jika
produk tidak dijual online; produk itu otomatis kembali ke tombol enquiry.

**Stok** dibaca dari Store API Peptides Bali dan diperbarui tiap jam
(`src/lib/commerce/stock.ts`). Produk yang habis tampil **Out of stock** dan tidak bisa
ditambahkan. Jika Peptides Bali tidak bisa diakses, produk tetap bisa ditambahkan dan
WooCommerce yang mengecek stok saat checkout.

**Lainnya:**

- Isi keranjang disimpan di browser pengunjung (`localStorage`), maksimal 10 per produk.
- Harga tidak ditampilkan di HGH Bali; harga, ongkir dan pembayaran tampil di Peptides Bali.
- Event GA4: `add_to_cart`, `begin_checkout` (tanpa data pribadi).
- **Mematikan keranjang:** di `src/lib/commerce/index.ts` ganti `peptidesBaliCartProvider`
  dengan `enquiryOnlyProvider`.
