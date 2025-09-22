const SwaggerUsersDocs = require('../../docs/swagger/api/users/swagger-docs');
const failAction = require('../../utils/failAction');
const UsersPayloadSchema = require('../../validators/users/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      auth: false,
      tags: SwaggerUsersDocs.tags,
      description: SwaggerUsersDocs.post_users.description,
      notes: SwaggerUsersDocs.post_users.notes,
      validate: {
        payload: UsersPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerUsersDocs.post_users.responses,
        },
      },
    },
  },
];

module.exports = routes;
