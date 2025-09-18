const { AlbumLikesParamsSchema } = require('../../validators/album-likes/schema');
const AlbumLikesSwaggerDocs = require('../../docs/swagger/api/album-likes/swagger-docs');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    options: {
      handler: handler.postAlbumLikeHandler,
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: AlbumLikesSwaggerDocs.security,
          responses: AlbumLikesSwaggerDocs.post_album_id_likes.responses,
        },
      },
      tags: AlbumLikesSwaggerDocs.tags,
      description: AlbumLikesSwaggerDocs.post_album_id_likes.description,
      notes: AlbumLikesSwaggerDocs.post_album_id_likes.notes,
      validate: {
        params: AlbumLikesParamsSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    options: {
      handler: handler.getAlbumLikeByAlbumIdHandler,
      plugins: {
        'hapi-swagger': {
          responses: AlbumLikesSwaggerDocs.get_album_id_likes.responses,
        },
      },
      tags: AlbumLikesSwaggerDocs.tags,
      description: AlbumLikesSwaggerDocs.get_album_id_likes.description,
      notes: AlbumLikesSwaggerDocs.get_album_id_likes.notes,
      validate: {
        params: AlbumLikesParamsSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    options: {
      handler: handler.deleteAlbumLikeByAlbumIdHandler,
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: AlbumLikesSwaggerDocs.security,
          responses: AlbumLikesSwaggerDocs.delete_album_id_likes.responses,
        },
      },
      tags: AlbumLikesSwaggerDocs.tags,
      description: AlbumLikesSwaggerDocs.delete_album_id_likes.description,
      notes: AlbumLikesSwaggerDocs.delete_album_id_likes.notes,
      validate: {
        params: AlbumLikesParamsSchema,
      },
    },
  },
];

module.exports = routes;
