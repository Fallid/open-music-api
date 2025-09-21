const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerAuthorizationResponse = require('../../execptions/SwaggerAuthorizationResponse');
const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerCollaborationsDocs = {
  tags: ['api', 'Collaborations'],
  post_collaborations: {
    description: 'Endpoint untuk menambah kolaborator ke playlist.',
    notes: 'Parameter: playlistId (string, max 50, required), userId (string, max 50, required)',
    reponses: {
      201: {
        description: 'Collaborator berhasil ditambah',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            data: {
              type: 'string',
              example: {
                collaborationId: 'collab-exampleId',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse('Gagal menambahkan collaborator. User tidak ditemukan'),
    },
  },
  delete_collaborations: {
    description: 'Endpoint untuk menghapus kolaborator dari playlist.',
    notes: 'Parameter: playlistId (string, max 50, required), userId (string, max 50, required)',
    responses: {
      200: {
        description: 'Collaborator berhasil dihapus',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            message: { type: 'string', example: 'Kolaborasi berhasil dihapus' },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse('Gagal menghapus collaborator. User tidak ditemukan'),

    },
  },
};

module.exports = SwaggerCollaborationsDocs;
