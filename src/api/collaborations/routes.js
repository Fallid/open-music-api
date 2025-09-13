const { collaborationsPayloadSchema } = require('../../validators/collaborations/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHanlder,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'collaborations'],
      description: 'Endpoint untuk menambah kolaborator ke playlist.',
      notes: 'Parameter: playlistId (string, max 50, required), userId (string, max 50, required)',
      validate: {
        payload: collaborationsPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'collaborations'],
      description: 'Endpoint untuk menghapus kolaborator dari playlist.',
      notes: 'Parameter: playlistId (string, max 50, required), userId (string, max 50, required)',
      validate: {
        payload: collaborationsPayloadSchema,
      },
    },
  },
];

module.exports = routes;
