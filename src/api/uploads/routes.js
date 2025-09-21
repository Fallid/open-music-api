require('../../validators/playlists/schema');
const SwaggerUploadsDocs = require('../../docs/swagger/api/uploads/swagger-docs');
const failAction = require('../../utils/failAction');
const {
  ImageHeadersSchema,
  AlbumCoverParamsSchema,
  UploadImagePayloadSchema,
} = require('../../validators/uploads/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    options: {
      handler: handler.postUploadImageHandler,
      tags: SwaggerUploadsDocs.tags,
      description: SwaggerUploadsDocs.post_uploads.description,
      notes: SwaggerUploadsDocs.post_uploads.notes,
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
      validate: {
        params: AlbumCoverParamsSchema,
        payload: UploadImagePayloadSchema,
        headers: ImageHeadersSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
          responses: SwaggerUploadsDocs.post_uploads.responses,
        },
      },
    },
  },
];

module.exports = routes;
