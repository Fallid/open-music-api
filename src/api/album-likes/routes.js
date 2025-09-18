const { AlbumLikesParamsSchema } = require('../../validators/album-likes/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: handler.postAlbumLikeHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'Album Likes'],
      description: 'Endpoint untuk menyukai album',
      notes: ['Login/Credentials required', 'Parameter: id (string, ID album, max 50, required)'],
      validate: {
        params: AlbumLikesParamsSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: handler.getAlbumLikeByAlbumIdHandler,
    options: {
      tags: ['api', 'Album Likes'],
      description: 'Endpoint untuk melihat jumlah album disukai',
      notes: 'Parameter: id (string, ID album, max 50, required)',
      validate: {
        params: AlbumLikesParamsSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: handler.deleteAlbumLikeByAlbumIdHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'Album Likes'],
      description: 'Enpoint untuk dislike album',
      notes: ['Login/Credentials required', 'Paramter: id (string, ID album, max 50, required'],
      validate: {
        params: AlbumLikesParamsSchema,
      },
    },
  },
];

module.exports = routes;
