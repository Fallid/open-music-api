const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');

const SwaggerAuthenticationDocs = {
  tags: ['api', 'Authentications'],
  post_authentication: {
    description: 'Endpoint untuk login dan mendapatkan access token serta refresh token.',
    notes: 'Parameter: username (string, max 50, required), password (string, max 255, required)',
    responses: {
      201: {
        description: 'Access Token berhasil  dibuat',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Authentication berhasil ditambahkan' },
            data: {
              type: 'object',
              example: {
                accessToken: 'AccessToken',
                refreshToken: 'RefreshToken',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse('Kredensial yang Anda berikan salah'),
    },
  },
  put_authentication: {
    description: 'Endpoint untuk memperbarui access token menggunakan refresh token.',
    notes: 'Parameter: refreshToken (string, required)',
    reponses: {
      200: {
        description: 'Access Token berhasil diperbarui',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Access token berhasil diperbarui' },
            data: {
              type: 'object',
              example: {
                accessToken: 'AccessToken',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
    },
  },
  delete_authentication: {
    description: 'Endpoint untuk logout dan menghapus refresh token.',
    notes: 'Parameter: refreshToken (string, required)',
    responses: {
      200: {
        description: 'Refresh Token berhasil dihapus',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Refresh token berhasil dihapus' },
            data: {
              type: 'object',
              example: {
                accessToken: 'AccessToken',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
    },
  },
};

module.exports = SwaggerAuthenticationDocs;
