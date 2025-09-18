<p align="center">
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/></a>
  <a href="https://hapi.dev/" target="_blank"><img src="https://img.shields.io/badge/Hapi.js-FF6C37?style=for-the-badge&logo=hapi&logoColor=white" alt="Hapi.js"/></a>
  <a href="https://swagger.io/" target="_blank"><img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger"/></a>
  <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/></a>
  <a href="https://www.rabbitmq.com/" target="_blank"><img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" alt="RabbitMQ"/></a>
  <a href="https://redis.io/" target="_blank"><img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="RabbitMQ"/></a>
  <a href="https://aws.amazon.com/s3/" target="_blank"><img src="https://img.shields.io/badge/AWS%20S3-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS S3"/></a>
  <a href="https://joi.dev/" target="_blank"><img src="https://img.shields.io/badge/Joi-4E9A06?style=for-the-badge&logo=Joi&logoColor=white" alt="Joi"/></a>
  <a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/></a>
  <a href="https://www.npmjs.com/package/nanoid" target="_blank"><img src="https://img.shields.io/badge/Nanoid-C9FD63?style=for-the-badge&logo=nanoid&logoColor=white" alt="NanoId"/></a>
</p>

---

# OpenMusicAPI

OpenMusicAPI adalah RESTful API backend untuk aplikasi manajemen musik, dibangun dengan Node.js, Hapi.js, dan PostgreSQL. API ini mendukung fitur album, lagu, playlist, kolaborasi, aktivitas playlist, autentikasi JWT, ekspor data, upload file ke AWS S3, cache Redis, dan rate limiting.

## Fitur Utama
- **Manajemen Album**: CRUD album, upload cover.
- **Manajemen Lagu**: CRUD lagu.
- **Playlist**: Buat, kelola, kolaborasi playlist.
- **Kolaborasi**: Berbagi playlist dengan user lain.
- **Playlist Songs**: Tambah/hapus lagu dari playlist.
- **Playlist Activities**: Riwayat aktivitas playlist.
- **Autentikasi**: Registrasi, login, refresh token, JWT.
- **Ekspor Data**: Ekspor playlist via RabbitMQ.
- **Upload File**: Upload cover album ke AWS S3.
- **Validasi**: Validasi payload dengan Joi.
- **Cache**: Redis untuk cache data.
- **Rate Limiting**: Proteksi anti-spam/DDoS dengan rate-limiter-flexible.
- **Swagger**: Dokumentasi API interaktif.

## Teknologi & Dependensi
- **Node.js**
- **Hapi.js** (`@hapi/hapi`, `@hapi/jwt`, `@hapi/inert`, `@hapi/vision`)
- **PostgreSQL** (`pg`, `node-pg-migrate`)
- **Redis** (`redis`)
- **RabbitMQ** (`amqplib`)
- **AWS S3** (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
- **Joi** (validasi payload)
- **Bcrypt** (hash password)
- **JWT** (Bearer auth)
- **Nanoid** (ID unik)
- **Swagger (hapi-swagger)** (dokumentasi api)
- **rate-limiter-flexible** (proteksi anti-spam/DDoS)
- **ESLint** (standar kode, AirBnB Base)

## Struktur Proyek
```
open-music-api/
├── migrations/                # Skrip migrasi database
├── src/
│   ├── server.js              # Entry point server Hapi
│   ├── api/                   # Modul fitur utama (albums, songs, playlists, dll)
│   │   ├── albums/            # Handler, route, dan logic album
│   │   ├── songs/             # Handler, route, dan logic lagu
│   │   ├── playlists/         # Handler, route, dan logic playlist
│   │   └── ...                # Modul lain
│   ├── exceptions/            # Custom error classes
│   ├── services/              # Integrasi database, cache, S3, RabbitMQ
│   │    ├── postgres/         # Service PostgreSQL
│   │    ├── redis/            # Service Redis
│   │    ├── rabbitmq/         # Service RabbitMQ
│   │    └── S3/               # Service AWS S3
│   ├── tokenize/              # JWT token manager
│   ├── utils/                 # Helper (rateLimiter, failAction, config, dll)
│   ├── validators/            # Validasi skema data dengan Joi
│   └── docs/                  # Dokumentasi Swagger
│       ├── swagger/           # Swagger config & response schema
│       └── execptions/        # Swagger error response 
├── .env.example               # Contoh konfigurasi environment
├── .eslintrc.js               # Konfigurasi ESLint
├── LICENSE                    # Lisensi MIT
├── package.json               # Konfigurasi npm
└── README.md                  # Dokumentasi
```

## Instalasi
1. Clone repository:
   ```powershell
   git clone <url OpenMusicAPI repository>
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Salin `.env.example` menjadi `.env` dan isi konfigurasi database, JWT, Redis, RabbitMQ, AWS S3.
4. Generate token key:
   ```powershell
   node -e "require('crypto').randomBytes(64).toString('hex')"
   ```

## Migrasi Database
Jalankan migrasi untuk membuat tabel:
```powershell
npm run migrate up
```
Rollback migrasi:
```powershell
npm run migrate down
```

## Menjalankan Server
- Development (auto-reload):
  ```powershell
  npm run start:dev
  ```
- Production:
  ```powershell
  npm start
  ```

## API Documentation
Swagger UI tersedia di:
- http://localhost:5000/documentation
- JSON Spec: http://localhost:5000/swagger.json

Swagger mendukung:
- Melihat endpoint & schema
- Testing API langsung dari browser
- Autentikasi JWT

## Rate Limiting
API dilindungi dari spam/DDoS menggunakan rate-limiter-flexible. Limit dapat diatur di `src/utils/rateLimiter.js` dan diintegrasikan di setiap route atau global.

## Autentikasi
- Register user baru di `/users`
- Login di `/authentications` untuk dapatkan token
- Gunakan token di header `Authorization: Bearer <token>` untuk endpoint yang memerlukan autentikasi

## Kontribusi
- Fork repository
- Buat branch baru untuk fitur/bugfix
- Pull request dengan deskripsi jelas

## Lisensi
Proyek ini menggunakan lisensi [MIT](./LICENSE)

---

> Dibuat oleh Fallid. Untuk pertanyaan dan kontribusi, silakan buka issue atau pull request.
