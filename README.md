# OpenMusicAPI

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=flat)
![Hapi.js](https://img.shields.io/badge/Hapi.js-FF6C37?logo=hapi&logoColor=white&style=flat)

OpenMusicAPI adalah RESTful API untuk aplikasi manajemen musik, memungkinkan pengguna untuk mengelola album, lagu, playlist, kolaborasi, dan autentikasi secara aman. Proyek ini dibangun menggunakan Node.js, PostgreSQL, dan Hapi.js.

## Fitur

- Manajemen Album: Tambah, lihat, dan hapus album.
- Manajemen Lagu: Tambah, lihat, dan hapus lagu.
- Playlist: Buat, kelola, dan kolaborasi playlist.
- Autentikasi: Registrasi, login, dan otorisasi JWT.
- Validasi data dengan Joi.
- Enkripsi password dengan bcrypt.

## Struktur Folder

```
src/
  server.js                // Entry point server Hapi
  api/                     // Modul API (albums, songs, playlists, users, authentications)
  exceptions/              // Custom error classes
  services/postgres/       // Service untuk akses database PostgreSQL
  tokenize/                // Manajemen token JWT
  utils/                   // Utility functions
  validators/              // Validasi skema data
migrations/                // Skrip migrasi database
```

## Instalasi

1. Clone repository ini.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Buat file `.env` dan sesuaikan konfigurasi database PostgreSQL.

## Migrasi Database

Jalankan migrasi untuk membuat tabel-tabel yang dibutuhkan:
```powershell
npm run migrate up
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

## Lisensi

Lihat detail lisensi di [LICENSE](./LICENSE)
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
