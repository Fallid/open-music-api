const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerAuthorizationResponse = require('../../execptions/SwaggerAuthorizationResponse');
const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerExportsDocs = {
  tags: ['api', 'Exports'],
  post_exports: {
    description: 'Export playlist ke email dalam bentuk file.',
    notes: [
      'Parameter path: playlistId (string, ID playlist yang akan diekspor, max 50, required)',
      'Body: targetEmail (string, email tujuan, required)',
      'Hanya owner playlist yang dapat melakukan export',
      'Export akan dikirim ke email dalam bentuk file attachment',
      'Response: status dan pesan proses export',
    ],
    responses: {
      201: {
        description: 'Collaborator berhasil ditambah',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            message: {
              type: 'string',
              example: 'Permintaan Anda sedang kami proses',
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse('Perminta Anda gagal. Playlist tidak ditemukan'),
    },
  },
};

module.exports = SwaggerExportsDocs;
