require('../../validators/playlists/schema');
const {
  ImageHeadersSchema,
  AlbumCoverParamsSchema,
  UploadImagePayloadSchema,
} = require('../../validators/uploads/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: handler.postUploadImageHandler,
    options: {
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      tags: ['api', 'Uploads'],
      description: 'Endpoint untuk mengunggah cover album.',
      notes: [
        'Parameter path: id (string, album ID)',
        'Body: file gambar (multipart/form-data)',
        'Tipe file yang didukung: APNG, AVIF, GIF, JPEG, PNG, WebP',
        'Ukuran maksimal: 500KB (512000 bytes)',
        'Response: URL cover album yang telah diunggah',
      ],
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
      validate: {
        params: AlbumCoverParamsSchema,
        payload: UploadImagePayloadSchema,
        headers: ImageHeadersSchema,
      },
    },
  },
];

module.exports = routes;
