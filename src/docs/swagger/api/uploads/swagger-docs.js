const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerUploadsDocs = {
  tags: ['api', 'Uploads'],
  post_uploads: {
    description: 'Endpoint untuk mengunggah cover album.',
    notes: [
      'Parameter path: id (string, album ID)',
      'Body: file gambar (multipart/form-data)',
      'Tipe file yang didukung: APNG, AVIF, GIF, JPEG, PNG, WebP',
      'Ukuran maksimal: 500KB (512000 bytes)',
      'Response: URL cover album yang telah diunggah',
    ],
    responses: {
      200: {
        description: 'Mengunggah cover album',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Sampul berhasil di unggah' },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      404: SwaggerNotFoundResponse('Gagal menambahkan cover album. Album tidak ditemukan'),
      413: {
        description: 'Request Entity Too Large',
        schema: {
          properties: {
            status: { type: 'string', example: 'fail' },
            error: { type: 'string', example: 'Request Entity Too Large' },
            message: { type: 'string', example: 'Payload content length greater than maximum allowed: 512000' },
          },
        },
      },
    },
  },
};

module.exports = SwaggerUploadsDocs;
