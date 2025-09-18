const { ExportSongsPayloadSchema, ExportSongsParamsSchema } = require('../../validators/exports/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.postExportSongsHandler,
    options: {
      auth: 'openmusic_jwt',
      tags: ['api', 'Exports'],
      description: 'Export playlist ke email dalam bentuk file.',
      notes: [
        'Parameter path: playlistId (string, ID playlist yang akan diekspor, max 50, required)',
        'Body: targetEmail (string, email tujuan, required)',
        'Hanya owner playlist yang dapat melakukan export',
        'Export akan dikirim ke email dalam bentuk file attachment',
        'Response: status dan pesan proses export',
      ],
      validate: {
        params: ExportSongsParamsSchema,
        payload: ExportSongsPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'json',
          security: [{ jwt: [] }],
        },
      },
    },
  },
];

module.exports = routes;
