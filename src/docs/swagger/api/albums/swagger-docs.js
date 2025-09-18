const SwaggerInvariantResponse = require('../../execptions/SwaggerInvariantResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const AlbumsSwaggerDocs = {
  tags: ['api', 'Albums'],
  post_album: {
    description: 'Endpoint untuk menambah album baru.',
    notes: 'Parameter: name (string, max 50, required), year (integer, min 1900, max tahun sekarang, required)',
    responses: {
      201: {
        description: 'Album berhasil dibuat',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'string',
              example: {
                album: 'album-exampelId',
              },
            },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
    },
  },
  get_album: {
    description: 'Endpoint untuk mengambil detail album beserta daftar lagu.',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'Album berhasil dibuat',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            data: {
              type: 'object',
              example: {
                album: {
                  id: 'album-exampleId',
                  name: 'Viva la vida',
                  year: 2008,
                  coverUrl: null,
                  songs: [],
                },
              },
            },
          },
        },
      },
      404: SwaggerNotFoundResponse('Album tidak ditemukan'),
    },
  },

  put_album: {
    description: 'Endpoint untuk memperbarui data album.',
    notes: 'Parameter: id (string, path), name (string, max 50, required), year (integer, min 1900, max tahun sekarang, required)',
    responses: {
      200: {
        description: 'Album berhasil dibuat',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            message: { type: 'string', example: 'ALbum berhasil di perbarui' },
          },
        },
      },
      400: SwaggerInvariantResponse[400],
      404: SwaggerNotFoundResponse('Album tidak ditemukan'),
    },
  },
  delete_album: {
    description: 'Endpoint untuk menghapus album berdasarkan id.',
    notes: 'Parameter: id (string, path)',
    responses: {
      200: {
        description: 'Album dihapus',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            message: { type: 'string', example: 'Album berhasil dihapus' },
          },
        },
      },
      404: SwaggerNotFoundResponse('Album tidak ditemukan'),
    },
  },
};

module.exports = AlbumsSwaggerDocs;
