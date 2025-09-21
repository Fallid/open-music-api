const SwaggerCollaborationsDocs = require('../../docs/swagger/api/collaborations/swagger-docs');
const failAction = require('../../utils/failAction');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const { collaborationsPayloadSchema } = require('../../validators/collaborations/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.postCollaborationHanlder,
      auth: 'openmusic_jwt',
      tags: SwaggerCollaborationsDocs.tags,
      description: SwaggerCollaborationsDocs.post_collaborations.description,
      notes: SwaggerCollaborationsDocs.post_collaborations.notes,
      validate: {
        payload: collaborationsPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerCollaborationsDocs.post_collaborations.reponses,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      pre: [{ method: rateLimitMiddleware }],
      auth: 'openmusic_jwt',
      tags: SwaggerCollaborationsDocs.tags,
      description: SwaggerCollaborationsDocs.delete_collaborations.description,
      notes: SwaggerCollaborationsDocs.delete_collaborations.notes,
      validate: {
        payload: collaborationsPayloadSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerCollaborationsDocs.delete_collaborations.responses,
        },
      },
    },
  },
];

module.exports = routes;
