const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('../../validators/authentications/schema');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const failAction = require('../../utils/failAction');
const SwaggerAuthenticationDocs = require('../../docs/swagger/api/authentications/swagger-docs');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.postAuthenticationHandler,
      tags: SwaggerAuthenticationDocs.tags,
      description: SwaggerAuthenticationDocs.post_authentication.description,
      notes: SwaggerAuthenticationDocs.post_authentication.notes,
      validate: {
        payload: PostAuthenticationPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerAuthenticationDocs.post_authentication.responses,
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/authentications',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.putAuthenticationHandler,
      tags: SwaggerAuthenticationDocs.tags,
      description: SwaggerAuthenticationDocs.put_authentication.description,
      notes: SwaggerAuthenticationDocs.put_authentication.notes,
      validate: {
        payload: PutAuthenticationPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerAuthenticationDocs.put_authentication.reponses,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/authentications',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.deleteAuthenticationHandler,
      tags: SwaggerAuthenticationDocs.tags,
      description: SwaggerAuthenticationDocs.delete_authentication.description,
      notes: SwaggerAuthenticationDocs.delete_authentication.notes,
      validate: {
        payload: DeleteAuthenticationPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerAuthenticationDocs.delete_authentication.responses,
        },
      },
    },
  },
];

module.exports = routes;
