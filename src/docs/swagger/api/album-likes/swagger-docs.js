const SwaggerAuthenticationResponse = require('../../execptions/SwaggerAuthenticationResponse');
const SwaggerNotFoundResponse = require('../../execptions/SwaggerNotFoundResponse');

const AlbumLikesSwaggerDocs = {
  tags: ['api', 'Album Likes'],
  post_album_id_likes: {
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
      401: SwaggerAuthenticationResponse(),
      404: SwaggerNotFoundResponse('Album tidak ditemukan'),
    },
  },
  get_album_id_likes: {
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
      404: SwaggerNotFoundResponse('Album tidak ditemukan'),
    },
  },
  delete_album_id_likes: {
    description: 'Enpoint untuk dislike album',
    notes: ['Login/Credentials required', 'Paramter: id (string, ID album, max 50, required'],
    responses: {
      200: {
        description: 'Dislike album',
        schema: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'sucess' },
            message: { type: 'string', example: 'Album dihapus dari disukai' },
          },
        },
      },
      401: SwaggerAuthenticationResponse(),
      404: SwaggerNotFoundResponse('Album tidak ditemukan'),
    },
  },

  security: [{ jwt: [] }],
};

module.exports = AlbumLikesSwaggerDocs;
