const { AlbumsPayloadSchema, AlbumParamsSchema } = require('../../validators/albums/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler,
    options: {
      tags: ['api', 'albums'],
      description: 'Endpoint untuk menambah album baru.',
      notes: 'Parameter: name (string, max 50, required), year (integer, min 1900, max tahun sekarang, required)',
      validate: {
        payload: AlbumsPayloadSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler,
    options: {
      tags: ['api', 'albums'],
      description: 'Endpoint untuk mengambil detail album beserta daftar lagu.',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: AlbumParamsSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler,
    options: {
      tags: ['api', 'albums'],
      description: 'Endpoint untuk memperbarui data album.',
      notes: 'Parameter: id (string, path), name (string, max 50, required), year (integer, min 1900, max tahun sekarang, required)',
      validate: {
        params: AlbumParamsSchema,
        payload: AlbumsPayloadSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
    options: {
      tags: ['api', 'albums'],
      description: 'Endpoint untuk menghapus album berdasarkan id.',
      notes: 'Parameter: id (string, path)',
      validate: {
        params: AlbumParamsSchema,
      },
    },
  },
];

module.exports = routes;
