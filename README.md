# POS Sederhana

Monorepo sederhana untuk aplikasi **Point of Sale (POS)** dengan dua bagian utama:

- **Frontend**: Next.js + Material UI
- **Backend**: Express + Prisma

> Catatan penting: repo ini **tidak menyertakan** file/artefak yang ada di `.gitignore` (mis. `.env`, database lokal, build folders). Agar project bisa berjalan setelah di-clone, **wajib** membuat dan mengisi file-file tersebut sendiri (lihat bagian **Konfigurasi**).

---

## Tech Stack

- **Frontend**: Next.js `15.4.6`, Material UI `7.3.1`
- **Backend**: Node.js + Express
- **ORM**: Prisma
- **DB**: bebas (SQLite untuk dev cepat, atau PostgreSQL/MySQL)

---

## Struktur Folder

```
pos-sederhana/
├── backend/           # Express API + Prisma
│   ├── prisma/        # schema.prisma, migrations, seed
│   └── src/           # kode backend
├── frontend/          # Next.js + MUI
│   └── src/           # kode frontend
└── .gitignore         # satu untuk seluruh repo
```

---

## Prasyarat

- Node.js 18+ (disarankan LTS terbaru)
- npm / pnpm / yarn (contoh di bawah pakai **npm**)
- (Opsional) Database server jika tidak pakai SQLite

---

## Konfigurasi

### 1) Environment Variables

**Backend (`backend/.env`)**

Minimal variabel yang dibutuhkan:

```env
# Pilih salah satu:
# SQLite (simple untuk dev)
DATABASE_URL="file:./dev.db"

# Atau Postgres
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"

# Atau MySQL
# DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DBNAME"

# Port backend (opsional, default contoh: 4000)
PORT=4000

# Contoh secret untuk JWT/keamanan (opsional, sesuaikan dengan implementasi)
APP_SECRET="change-this-in-production"
```

**Frontend (`frontend/.env.local`)**

```env
# URL API backend
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

> Nama & jumlah variabel bisa berbeda sesuai implementasi. Pastikan menyesuaikan dengan kode Anda.

---

## Setup & Menjalankan

### 1) Install dependencies

```bash
# dari root repo
cd backend && npm install
cd ../frontend && npm install
```

### 2) Prisma setup (backend)

```bash
cd backend

# generate Prisma client
npx prisma generate

# buat/migrasi database
npx prisma migrate dev

# (opsional) seed data awal
npx prisma db seed
```

> Jika pakai SQLite, file DB akan dibuat otomatis (mis. `prisma/dev.db`) dan **diabaikan** oleh Git sesuai `.gitignore`.

### 3) Jalankan aplikasi

```bash
# terminal 1 - backend
cd backend
npm run dev   # atau npm start, sesuaikan script package.json

# terminal 2 - frontend
cd frontend
npm run dev   # default di http://localhost:3000
```

---

## ERD Singkat

Entity yang digunakan (versi sederhana):

- `users` (admin, cashier)
- `products`
- `orders` (dine_in, takeaway; status draft/paid/void)
- `order_items`

> Skema lengkap ada di `backend/prisma/schema.prisma`.

---

## Mengapa Clone Tidak “Langsung Jalan”?

Repo ini **sengaja** tidak menyertakan file sensitif & artefak build karena masuk `.gitignore`, di antaranya:

- `.env`, `.env.local` (wajib Anda buat sendiri)
- `node_modules/` (harus `npm install`)
- Folder build Next.js (`.next/`) dan build backend (`dist/`)
- Database lokal (mis. `prisma/dev.db` untuk SQLite)
- Folder Prisma hasil generate (`/generated/prisma` jika Anda memakainya)

Ikuti langkah **Konfigurasi** dan **Setup** di atas agar project berjalan normal.

---

## Troubleshooting

- **Prisma P1001 / tidak bisa konek DB**  
  Cek `DATABASE_URL` di `backend/.env` dan pastikan DB tersedia (atau pakai SQLite untuk dev).

- **`Error: Prisma Client not found`**  
  Jalankan `npx prisma generate` di folder `backend`.

- **CORS error (browser blokir request)**  
  Pastikan backend mengaktifkan CORS ke origin frontend (mis. `http://localhost:3000`).

- **Frontend tidak bisa fetch**  
  Pastikan `NEXT_PUBLIC_API_URL` menunjuk ke URL backend yang benar.

---

## Scripts Umum

**Backend (`package.json`)** – contoh:

- `dev`: menjalankan server dev (ts-node/nodemon)
- `start`: menjalankan server build
- `prisma:generate`, `prisma:migrate`, `prisma:seed`

**Frontend (`package.json`)** – contoh:

- `dev`: menjalankan Next.js dev server
- `build`: build produksi
- `start`: menjalankan build

> Sesuaikan dengan script yang Anda definisikan.

---
