# 🏛️ ASIG — Aplikasi Sistem Informasi Gereja  
Built with **Laravel 12 + React + Inertia.js** using **Yogijowo Starter Kit**

---

## 🚀 Overview

ASIG adalah aplikasi manajemen administrasi gereja yang dirancang untuk membantu pengelolaan data jemaat, keluarga, pelayanan, hingga laporan internal gereja.  
Proyek ini dikembangkan menggunakan **Laravel 12**, **Inertia.js**, dan **React**, dengan pondasi dari **Laravel Starter Kit by Yogijowo**.

Aplikasi ini cocok digunakan sebagai:
- Sistem informasi gereja  
- Dashboard administrasi internal  
- Tools pengelolaan data pelayanan  

---

## ✨ Fitur Utama

### 🔐 **Autentikasi**
- Login & Logout
- User Management (Admin/User)
- Permissions & Roles (bawaan starter kit)

### 👥 **Manajemen Jemaat**
- Tambah/Edit/Hapus Jemaat
- Relasi Jemaat → Pelayanan
- Relasi Jemaat → Keluarga
- Modal Form + Validasi
- Tabel responsif & pencarian (on progress)

### 👨‍👩‍👧‍👦 **Manajemen Keluarga**
- Tambah/Edit/Hapus Keluarga
- Relasi keluarga → anggota jemaat

### 🙌 **Manajemen Pelayanan**
- CRUD Pelayanan (Nama Pelayanan + Deskripsi)
- Halaman detail pelayanan
- Daftar anggota pelayanan per bidang

### 📊 **Dashboard**
- Statistik Users, Backups, Activity Log
- Grafik Monthly Activity & Trends (bawaan starter kit)

### 🗂️ **Lainnya**
- Menu Manager
- App Settings (nama aplikasi, logo)
- Backup database
- System logs

---

## 📁 **Struktur Utama Direktori**

resources/
└── js/
├── Components/
│ ├── Logo/
│ │ └── logo_asig.png // logo aplikasi
│ └── app-logo.tsx
├── Pages/
│ ├── Jemaats/
│ └── Pelayanans/
└── ...


---

## 🧰 **Tech Stack**

| Layer | Teknologi |
|-------|-----------|
| Backend | Laravel 12 |
| Frontend | React.js + TypeScript |
| Middleware | Inertia.js |
| UI | ShadCN, TailwindCSS |
| Auth | Laravel Breeze (kustom starter kit) |
| Chart | ApexCharts |
| Database | MySQL / PostgreSQL |

---

## 🛠️ **Installation Guide**

### 1️⃣ Clone Repository
```bash
git clone https://github.com/USERNAME/ASIG.git
cd ASIG

2️⃣ Instal Dependency Backend
composer install

3️⃣ Instal Dependency Frontend
npm install

4️⃣ Setup Environment
cp .env.example .env
php artisan key:generate


Atur konfigurasi database di .env:

DB_DATABASE=asig
DB_USERNAME=root
DB_PASSWORD=

5️⃣ Migrasi & Seeder
php artisan migrate --seed


Seeder akan menghasilkan:

3 data pelayanan

1 data keluarga

3 contoh jemaat

1 akun admin default:

Email	Password
admin@example.com
	password
6️⃣ Jalankan Aplikasi

Frontend (Vite):

npm run dev


Backend:

php artisan serve

🌱 Database Seeder (ASIGSeeder)

Seeder ini otomatis dijalankan melalui DatabaseSeeder:

Default Admin

Contoh data pelayanan

Contoh keluarga

Contoh jemaat

Developer cukup menjalankan:

php artisan migrate --seed

🖼️ Logo Aplikasi

Logo aplikasi diletakkan di:

resources/js/components/Logo/logo_asig.png


Dan digunakan oleh komponen:

resources/js/components/app-logo.tsx

📌 Todo (Roadmap)

 Filter & pencarian jemaat

 Sistem laporan (PDF/Excel)

 Manajemen anggota pelayanan

 Import data jemaat via Excel

 Module keuangan gereja (Opsional)

🤝 Kontribusi

Pull request dipersilakan.
Jika menemukan bug, silakan buka Issues.

📄 Lisensi

MIT License — bebas dipakai & dikembangkan.

🙏 Terima Kasih

Terima kasih kepada:

Yogijowo — Laravel 12 React Starter Kit

Semua open-source libraries yang digunakan

🏛️ ASIG — Aplikasi Sistem Informasi Gereja

Didedikasikan untuk pelayanan Tuhan.
Dengan kasih, oleh Untung Apriliasman Waruwu
