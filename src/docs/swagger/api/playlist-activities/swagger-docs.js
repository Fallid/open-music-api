const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerAuthorizationResponse = require('../../execptions/SwaggerAuthorizationResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerPlaylistActivtiesDocs = {
  tags: ['api', 'Playlist Activities'],
  get_activites: {
    description: 'Endpoint untuk mendapatkan aktivitas playlist (add/delete song).',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'Playlist Activities data',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                playlistId: 'playlist-exampleId',
                activities: [
                  {
                    username: 'jhon',
                    title: 'jhon playlist',
                    action: 'add',
                    time: '2025-09-20T00:12:40.887Z',
                  },
                ],
              },
            },
          },
        },
      },
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse('Playlist tidak ditemukan'),
    },
  },
};

module.exports = SwaggerPlaylistActivtiesDocs;
