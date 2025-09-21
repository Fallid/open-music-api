const SwaggerPlaylistActivtiesDocs = require('../../docs/swagger/api/playlist-activities/swagger-docs');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const { PlaylistParamsSchema } = require('../../validators/playlists/schema');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.getPlaylistActivitiesByPlaylistId,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistActivtiesDocs.tags,
      description: SwaggerPlaylistActivtiesDocs.get_activites.description,
      notes: SwaggerPlaylistActivtiesDocs.get_activites.notes,
      validate: {
        params: PlaylistParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistActivtiesDocs.get_activites.responses,
        },
      },
    },
  },
];

module.exports = routes;
