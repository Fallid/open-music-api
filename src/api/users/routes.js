const Joi = require('joi');
const UsersPayloadSchema = require('../../validators/users/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      auth: false,
      tags: ['api', 'users'],
      description: 'Endpoint untuk mendaftarkan user baru.',
      notes: 'Parameter: username (string, max 50, required), password (string, max 255, required), fullname (string, max 255, required)',
      validate: {
        payload: UsersPayloadSchema,
      },
    },
  },
];

module.exports = routes;
