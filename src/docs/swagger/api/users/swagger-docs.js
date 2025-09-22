const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');

const SwaggerUsersDocs = {
  tags: ['api', 'Users'],
  post_users: {
    description: 'Endpoint untuk mendaftarkan user baru.',
    notes: 'Parameter: username (string, max 50, required), password (string, max 255, required), fullname (string, max 255, required)',
    responses: {
      201: {
        description: 'Mendaftarkan user baru',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Authentication berhasil ditambahkan' },
            data: {
              type: 'json',
              example: {
                accessToken: 'example access token',
                refreshToken: 'example refresh token',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
    },
  },
};

module.exports = SwaggerUsersDocs;
