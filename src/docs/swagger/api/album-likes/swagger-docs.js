const SwaggerAuthenticationResponse = require('../../SwaggerAuthenticationResponse');
const SwaggerNotFoundResponse = require('../../SwaggerNotFoundResponse');

const AlbumLikesSwaggerDocs = {
  post_album_id_likes: {
    tags: ['api', 'Album Likes'],
    description: 'Endpoint untuk menyukai album',
    notes: [
      'Login/Credentials required',
      'Parameter: id (string, ID album, max 50, required)',
    ],
    responses: {
      201: {
        description: 'Album berhasil disukai',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            message: { type: 'string', example: 'Album disukai' },
          },
        },
      },
      401: SwaggerAuthenticationResponse[401],
      404: SwaggerNotFoundResponse('Error: Not Found', 'Album tidak ditemukan'),
    },
  },
  get_album_id_likes: {
    tags: ['api', 'Album Likes'],
    description: 'Endpoint untuk melihat jumlah album disukai',
    notes: 'Parameter: id (string, ID album, max 50, required)',
    responses: {
      200: {
        description: 'Album berhasil disukai',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            data: {
              type: 'number',
              example: {
                likes: 1,
              },
            },
          },
        },
      },
      404: SwaggerNotFoundResponse('Error: Not Found', 'Album tidak ditemukan'),
    },
  },
  delete_album_id_likes: {
    tags: ['api', 'Album Likes'],
    description: 'Enpoint untuk dislike album',
    notes: ['Login/Credentials required', 'Paramter: id (string, ID album, max 50, required'],
    responses: {
      200: {
        description: 'Album berhasil disukai',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            message: { type: 'string', example: 'Album dihapus dari disukai' },
          },
        },
      },
      401: SwaggerAuthenticationResponse[401],
      404: SwaggerNotFoundResponse('Error: Not Found', 'Album tidak ditemukan'),
    },
  },

  security: [{ jwt: [] }],
};

module.exports = AlbumLikesSwaggerDocs;
