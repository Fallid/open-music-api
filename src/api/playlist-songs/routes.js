const { PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema } = require('../../validators/playlist-songs/schema');
const { PlaylistParamsSchema } = require('../../validators/playlists/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postPlaylistSongsHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'playlist-songs'],
      description: 'Endpoint untuk menambahkan lagu ke playlist.',
      notes: 'Parameter: id (string, path), songId (string, max 50, required)',
      validate: {
        params: PlaylistParamsSchema,
        payload: PostPlaylistSongPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deletePlaylistSongsHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'playlist-songs'],
      description: 'Endpoint untuk menghapus lagu dari playlist.',
      notes: 'Parameter: id (string, path), songId (string, max 50, required)',
      validate: {
        params: PlaylistParamsSchema,
        payload: DeletePlaylistSongPayloadSchema,
      },
    },
  },
];

module.exports = routes;
