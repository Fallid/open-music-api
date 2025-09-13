const { PostPlaylistPayloadSchema, PlaylistParamsSchema } = require('../../validators/playlists/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'playlists'],
      description: 'Endpoint untuk membuat playlist baru.',
      notes: 'Parameter: name (string, max 255, required)',
      validate: {
        payload: PostPlaylistPayloadSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'playlists'],
      description: 'Endpoint untuk mendapatkan daftar playlist milik user.',
      notes: 'Tidak ada parameter khusus.',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongsByPlaylistIdHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'playlists'],
      description: 'Endpoint untuk mendapatkan daftar lagu dalam playlist tertentu.',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: PlaylistParamsSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'openmusic_jwt',
      plugins: {
        'hapi-swagger': {
          security: [{ jwt: [] }],
        },
      },
      tags: ['api', 'playlists'],
      description: 'Endpoint untuk menghapus playlist berdasarkan id.',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: PlaylistParamsSchema,
      },
    },
  },
];

module.exports = routes;
