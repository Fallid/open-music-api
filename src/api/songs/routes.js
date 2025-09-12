const { SongsPayloadSchema, SongQuerySchema, SongParamsSchema } = require('../../validators/songs/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
    options: {
      tags: ['api', 'songs'],
      description: 'Endpoint untuk menambah lagu baru.',
      notes: 'Parameter: title (string, max 50, required), year (integer, min 1900, max tahun sekarang, required), genre (string, max 35, required), performer (string, max 40, required), duration (number, optional), albumId (string, optional)',
      validate: {
        payload: SongsPayloadSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
    options: {
      tags: ['api', 'songs'],
      description: 'Endpoint untuk mendapatkan daftar lagu. Bisa menggunakan query title dan performer.',
      notes: 'Query: title (string, max 50, optional), performer (string, max 40, optional)',
      validate: {
        query: SongQuerySchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
    options: {
      tags: ['api', 'songs'],
      description: 'Endpoint untuk mendapatkan detail lagu berdasarkan id.',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: SongParamsSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler,
    options: {
      tags: ['api', 'songs'],
      description: 'Endpoint untuk memperbarui data lagu.',
      notes: 'Parameter: id (string, path), title (string, max 50, required), year (integer, min 1900, max tahun sekarang, required), genre (string, max 35, required), performer (string, max 40, required), duration (number, optional), albumId (string, optional)',
      validate: {
        params: SongParamsSchema,
        payload: SongsPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler,
    options: {
      tags: ['api', 'songs'],
      description: 'Endpoint untuk menghapus lagu berdasarkan id.',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: SongParamsSchema,
      },
    },
  },
];

module.exports = routes;
