const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerAuthorizationResponse = require('../../execptions/SwaggerAuthorizationResponse');
const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerPlaylistSongsDocs = {
  tags: ['api', 'Playlist Songs'],
  post_playlist_songs: {
    description: 'Endpoint untuk menambahkan lagu ke playlist.',
    notes: 'Parameter: id (string, path), songId (string, max 50, required)',
    responses: {
      201: {
        description: 'Berhasil menambahkan songs ke playlist',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            message: {
              type: 'string',
              example: 'Song berhasil ditambahkan ke playlist',
            },
            data: {
              type: 'json',
              example: {
                playlistSong: {
                  id: 'playlist_song-exampleId',
                },
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse(
        'Gagal menambahkan song. Song tidak ditemukan',
      ),
    },
  },

  get_plyalist_songs: {
    description: 'Endpoint untuk mendapatkan daftar lagu dalam playlist tertentu.',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'Daftar lagu dalam playlist',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                playlist: {
                  id: 'playlist-z26OXJv6COnxxhS_',
                  name: 'Lagu Untuk Membaca',
                  username: 'john',
                  songs: [
                    {
                      id: 'song-8kpUDHJAI_g2pHRk',
                      title: 'Fix You',
                      performer: 'Coldplay',
                    },
                    {
                      id: 'song-xelpO0qEfuTmeoM3',
                      title: 'Life in Technicolor',
                      performer: 'Coldplay',
                    },
                  ],
                },
              },
            },
          },
        },
      },
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse('Gagal mendapatkan lagu. Playlist tidak ditemukan'),
    },
  },

  delete_playlist_songs: {
    description: 'Endpoint untuk menghapus lagu dari playlist.',
    notes: 'Parameter: id (string, path), songId (string, max 50, required)',
    responses: {
      200: {
        description: 'Berhasil menghapus lagu dari playlist.',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            message: {
              type: 'string',
              example: 'Song berhasil dihapus dari playlist',
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      401: SwaggerAuthenticationResponse(),
      403: SwaggerAuthorizationResponse[403],
      404: SwaggerNotFoundResponse(
        'Gagal menghapus song. Song tidak ditemukan',
      ),
    },
  },
};

module.exports = SwaggerPlaylistSongsDocs;
