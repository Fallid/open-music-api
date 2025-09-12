const { PlaylistParamsSchema } = require('../../validators/playlists/schema');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.getPlaylistActivitiesByPlaylistId,
    options: {
      auth: 'openmusic_jwt',
      tags: ['api', 'playlist-activities'],
      description: 'Endpoint untuk mendapatkan aktivitas playlist (add/delete song).',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: PlaylistParamsSchema,
      },
    },
  },
];

module.exports = routes;
