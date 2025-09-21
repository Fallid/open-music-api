const SwaggerPlaylistSongsDocs = require('../../docs/swagger/api/playlist-songs/swagger-docs');
const failAction = require('../../utils/failAction');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const { PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema } = require('../../validators/playlist-songs/schema');
const { PlaylistParamsSchema } = require('../../validators/playlists/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.postPlaylistSongsHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistSongsDocs.tags,
      description: SwaggerPlaylistSongsDocs.post_playlist_songs.description,
      notes: SwaggerPlaylistSongsDocs.post_playlist_songs.notes,
      validate: {
        params: PlaylistParamsSchema,
        payload: PostPlaylistSongPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistSongsDocs.post_playlist_songs.responses,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.deletePlaylistSongsHandler,
      auth: 'openmusic_jwt',
      tags: SwaggerPlaylistSongsDocs.tags,
      description: SwaggerPlaylistSongsDocs.delete_playlist_songs.description,
      notes: SwaggerPlaylistSongsDocs.delete_playlist_songs.notes,
      validate: {
        params: PlaylistParamsSchema,
        payload: DeletePlaylistSongPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
          responses: SwaggerPlaylistSongsDocs.delete_playlist_songs.responses,
        },
      },
    },
  },
];

module.exports = routes;
