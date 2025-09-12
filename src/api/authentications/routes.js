const Joi = require('joi');
const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('../../validators/authentications/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Endpoint untuk login dan mendapatkan access token serta refresh token.',
      notes: 'Parameter: username (string, max 50, required), password (string, max 255, required)',
      validate: {
        payload: PostAuthenticationPayloadSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Endpoint untuk memperbarui access token menggunakan refresh token.',
      notes: 'Parameter: refreshToken (string, required)',
      validate: {
        payload: PutAuthenticationPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
    options: {
      tags: ['api', 'authentications'],
      description: 'Endpoint untuk logout dan menghapus refresh token.',
      notes: 'Parameter: refreshToken (string, required)',
      validate: {
        payload: DeleteAuthenticationPayloadSchema,
      },
    },
  },
];

module.exports = routes;
