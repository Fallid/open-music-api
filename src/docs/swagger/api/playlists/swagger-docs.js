const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerAuthorizationResponse = require('../../execptions/SwaggerAuthorizationResponse');
const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerPlaylistsDocs = {
  tags: ['api', 'Playlists'],
  post_playlists: {
    description: 'Endpoint untuk membuat playlist baru.',
    notes: 'Parameter: name (string, max 255, required)',
    responses: {
      201: {
        description: 'Berhasil membuat playlist',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                playlistId: 'playlist-exampleId',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse(),
    },
  },
  get_playlists: {
    description: 'Endpoint untuk mendapatkan daftar playlist milik user.',
    notes: 'Tidak ada parameter khusus.',
    responses: {
      200: {
        description: 'Daftar playlist milik user',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                playlists: [
                  {
                    id: 'playlist-exampleId',
                    name: 'playlist name',
                    username: 'playlist owner name',
                  },

                ],
              },
            },
          },
        },
      },
      401: SwaggerAuthenticationResponse(),
    },
  },
  delete_playlists: {
    description: 'Endpoint untuk menghapus playlist berdasarkan id.',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'menghapus playlist',
        schema: {
          properties: {
            status: { type: 'string', exmaple: 'success' },
            message: { type: 'string', example: 'Playlist berhasil dihapus' },
          },
        },
      },
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse('Gagal menghapus playlist. Playlist tidak ditemukan'),
    },
  },
};

module.exports = SwaggerPlaylistsDocs;
