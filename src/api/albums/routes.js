const AlbumsSwaggerDocs = require('../../docs/swagger/api/albums/swagger-docs');
const failAction = require('../../utils/failAction');
const { AlbumsPayloadSchema, AlbumParamsSchema } = require('../../validators/albums/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    options: {
      handler: handler.postAlbumHandler,
      tags: AlbumsSwaggerDocs.tags,
      description: AlbumsSwaggerDocs.post_album.description,
      notes: AlbumsSwaggerDocs.post_album.notes,
      validate: {
        payload: AlbumsPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: AlbumsSwaggerDocs.post_album.responses,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler,
    options: {
      tags: AlbumsSwaggerDocs.tags,
      description: AlbumsSwaggerDocs.get_album.description,
      notes: AlbumsSwaggerDocs.get_album.notes,
      validate: {
        params: AlbumParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: AlbumsSwaggerDocs.get_album.responses,
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler,
    options: {
      tags: AlbumsSwaggerDocs.tags,
      description: AlbumsSwaggerDocs.put_album.description,
      notes: AlbumsSwaggerDocs.put_album.notes,
      validate: {
        params: AlbumParamsSchema,
        payload: AlbumsPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: AlbumsSwaggerDocs.put_album.responses,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
    options: {
      tags: AlbumsSwaggerDocs.tags,
      description: AlbumsSwaggerDocs.delete_album.description,
      notes: AlbumsSwaggerDocs.delete_album.notes,
      validate: {
        params: AlbumParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: AlbumsSwaggerDocs.delete_album.responses,
        },
      },
    },
  },
];

module.exports = routes;
