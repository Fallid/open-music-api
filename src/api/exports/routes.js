const SwaggerExportsDocs = require('../../docs/swagger/api/exports/swagger-docs');
const failAction = require('../../utils/failAction');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const { ExportSongsPayloadSchema, ExportSongsParamsSchema } = require('../../validators/exports/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.postExportSongsHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerExportsDocs.tags,
      description: SwaggerExportsDocs.post_exports.description,
      notes: SwaggerExportsDocs.post_exports.notes,
      validate: {
        params: ExportSongsParamsSchema,
        payload: ExportSongsPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'json',
          security: [{ jwt: [] }],
          responses: SwaggerExportsDocs.post_exports.responses,
        },
      },
    },
  },
];

module.exports = routes;
