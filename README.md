# OpenMusicAPI

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Hapi.js](https://img.shields.io/badge/Hapi.js-FF6C37?logo=hapi&logoColor=white&style=flat)

OpenMusicAPI adalah RESTful API untuk aplikasi manajemen musik, memungkinkan pengguna untuk mengelola album, lagu, playlist, kolaborasi, aktivitas playlist, dan autentikasi secara aman. Proyek ini dibangun menggunakan Node.js, PostgreSQL, dan Hapi.js.

## Fitur

- Manajemen Album: Tambah, lihat, dan hapus album.
- Manajemen Lagu: Tambah, lihat, dan hapus lagu.
- Playlist: Buat, kelola, dan kolaborasi playlist.
- Kolaborasi: Berbagi playlist dengan pengguna lain.
- Playlist Songs: Tambah dan hapus lagu dari playlist.
- Playlist Activities: Mencatat riwayat aktivitas (tambah/hapus lagu) pada playlist.
- Autentikasi: Registrasi, login, dan otorisasi JWT.
- Validasi data dengan Joi.
- Enkripsi password dengan bcrypt.

## Struktur Folder

```
src/
  server.js                // Entry point server Hapi
  api/
    albums/                // Modul album
    songs/                 // Modul lagu
    playlists/             // Modul playlist
    playlist-songs/        // Modul lagu dalam playlist
    playlist-activities/   // Modul aktivitas playlist
    collaborations/        // Modul kolaborasi playlist
    users/                 // Modul user
    authentications/       // Modul autentikasi
  exceptions/              // Custom error classes
  services/postgres/       // Service untuk akses database PostgreSQL
  tokenize/                // Manajemen token JWT
  utils/                   // Utility functions & enum
  validators/              // Validasi skema data
migrations/                // Skrip migrasi database
.env.example               // Contoh konfigurasi environment
LICENSE                    // Lisensi MIT
package.json               // Konfigurasi npm
```

## Instalasi

1. Clone repository ini:
    ```powershell
    git clone <url OpenMusicAPI repository>
    ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Salin file `.env.example` menjadi `.env` dan isi konfigurasi database PostgreSQL serta JWT sesuai kebutuhan.
4. Generate token key JWT dengan command node REPL:
    ```powershell
    require('crypto').randomBytes(64).toString('hex');
    ```

## Migrasi Database

Jalankan migrasi untuk membuat tabel-tabel yang dibutuhkan:
```powershell
npm run migrate up
```
Untuk rollback migrasi:
```powershell
npm run migrate down
```

## Menjalankan Server

Untuk development (auto-reload):
```powershell
npm run start:dev
```
Untuk production:
```powershell
npm start
```

## API Documentation

API documentation tersedia menggunakan Swagger UI:
- **Development**: http://localhost:5000/documentation
- **JSON Spec**: http://localhost:5000/swagger.json

Dokumentasi interaktif ini memungkinkan Anda untuk:
- Melihat semua endpoint yang tersedia
- Testing API langsung dari browser
- Melihat schema request/response
- Autentikasi dengan JWT token

## Autentikasi

API menggunakan JWT (JSON Web Token) untuk autentikasi:
1. Register user baru di endpoint `/users`
2. Login di endpoint `/authentications` untuk mendapatkan token
3. Gunakan token di header `Authorization: Bearer <token>` untuk endpoint yang memerlukan autentikasi

## Lisensi

Lihat detail lisensi di [LICENSE](./LICENSE)
