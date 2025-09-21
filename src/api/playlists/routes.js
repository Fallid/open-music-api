const SwaggerPlaylistSongsDocs = require('../../docs/swagger/api/playlist-songs/swagger-docs');
const SwaggerPlaylistsDocs = require('../../docs/swagger/api/playlists/swagger-docs');
const failAction = require('../../utils/failAction');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const { PostPlaylistPayloadSchema, PlaylistParamsSchema } = require('../../validators/playlists/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.postPlaylistHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistsDocs.tags,
      description: SwaggerPlaylistsDocs.post_playlists.description,
      notes: SwaggerPlaylistsDocs.post_playlists.notes,
      validate: {
        payload: PostPlaylistPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistsDocs.post_playlists.responses,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.getPlaylistsHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistsDocs.tags,
      description: SwaggerPlaylistsDocs.get_playlists.description,
      notes: SwaggerPlaylistsDocs.get_playlists.notes,
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistsDocs.get_playlists.responses,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.getPlaylistSongsByPlaylistIdHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistSongsDocs.tags,
      description: SwaggerPlaylistSongsDocs.delete_playlist_songs.description,
      notes: SwaggerPlaylistSongsDocs.get_plyalist_songs.notes,
      validate: {
        params: PlaylistParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistSongsDocs.get_plyalist_songs.responses,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.deletePlaylistByIdHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistsDocs.tags,
      description: SwaggerPlaylistsDocs.delete_playlists.description,
      notes: SwaggerPlaylistsDocs.delete_playlists.notes,
      validate: {
        params: PlaylistParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistsDocs.delete_playlists.responses,
        },
      },
    },
  },
];

module.exports = routes;
