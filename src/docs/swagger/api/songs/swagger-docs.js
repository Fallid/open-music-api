const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const SwaggerSongsDocs = {
  tags: ['api', 'Songs'],
  post_songs: {
    description: 'Endpoint untuk menambah lagu baru.',
    notes: 'Parameter: title (string, max 50, required), year (integer, min 1900, max tahun sekarang, required), genre (string, max 35, required), performer (string, max 40, required), duration (number, optional), albumId (string, optional)',
    responses: {
      201: {
        description: 'Menambahkan lagu baru',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                songId: 'song-exampleId',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
    },
  },

  get_song: {
    description: 'Endpoint untuk mendapatkan daftar lagu. Bisa menggunakan query title dan performer.',
    notes: 'Query: title (string, max 50, optional), performer (string, max 40, optional)',
    responses: {
      200: {
        description: 'Mendapatkan semua lagi',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                songs: [
                  {
                    id: 'song-exampleId',
                    title: 'fix you',
                    performer: 'Coldplay',
                  },
                ],
              },
            },
          },
        },
      },
    },
  },

  get_song_by_id: {
    description: 'Endpoint untuk mendapatkan detail lagu berdasarkan id.',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'Mendapatkan detail lagu',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'json',
              example: {
                song: {
                  id: 'song-exampleId',
                  title: 'Song title',
                  year: 2000,
                  performer: 'Song artis',
                  genre: 'Pop',
                  duration: 120,
                  albumId: null,
                },
              },
            },
          },
        },
      },
      404: SwaggerNotFoundResponse('Song tidak ditemukan'),
    },
  },

  put_songs: {
    description: 'Endpoint untuk memperbarui data lagu.',
    notes: 'Parameter: id (string, path), title (string, max 50, required), year (integer, min 1900, max tahun sekarang, required), genre (string, max 35, required), performer (string, max 40, required), duration (number, optional), albumId (string, optional)',
    responses: {
      200: {
        description: 'Berhasil mengedit lagu',
        schema: {
          properties: {
            status: { type: 'sting', example: 'success' },
            message: { type: 'string', example: 'SOng berhasil diperbarui' },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      404: SwaggerNotFoundResponse('Gagal edit lagu. Lagu tidak ditemukan'),
    },
  },

  delete_songs: {
    description: 'Endpoint untuk menghapus lagu berdasarkan id.',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'Berhasil menghapus lagu',
        schema: {
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'Song berhasil diperbarui' },
          },
        },
      },
      404: SwaggerNotFoundResponse('Gagal hapus lagu. Lagu tidak ditemukan'),
    },
  },
};

module.exports = SwaggerSongsDocs;
