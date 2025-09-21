const SwaggerSongsDocs = require('../../docs/swagger/api/songs/swagger-docs');
const failAction = require('../../utils/failAction');
const rateLimitMiddleware = require('../../utils/rateLimiter');
const { SongsPayloadSchema, SongQuerySchema, SongParamsSchema } = require('../../validators/songs/schema');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.postSongHandler,
      tags: SwaggerSongsDocs.tags,
      description: SwaggerSongsDocs.post_songs.description,
      notes: SwaggerSongsDocs.post_songs.notes,
      validate: {
        payload: SongsPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerSongsDocs.post_songs.responses,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/songs',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.getSongsHandler,
      tags: SwaggerSongsDocs.tags,
      description: SwaggerSongsDocs.get_song.description,
      notes: SwaggerSongsDocs.get_song.notes,
      validate: {
        query: SongQuerySchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerSongsDocs.get_song.responses,
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.getSongByIdHandler,
      tags: SwaggerSongsDocs.tags,
      description: SwaggerSongsDocs.get_song_by_id.description,
      notes: SwaggerSongsDocs.get_song_by_id.notes,
      validate: {
        params: SongParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerSongsDocs.get_song_by_id.responses,
        },
      },
    },
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.putSongByIdHandler,
      tags: SwaggerSongsDocs.tags,
      description: SwaggerSongsDocs.put_songs.description,
      notes: SwaggerSongsDocs.put_songs.notes,
      validate: {
        params: SongParamsSchema,
        payload: SongsPayloadSchema,
        failAction,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerSongsDocs.put_songs.responses,
        },
      },
    },
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    options: {
      pre: [{ method: rateLimitMiddleware }],
      handler: handler.deleteSongByIdHandler,
      tags: SwaggerSongsDocs.tags,
      description: SwaggerSongsDocs.delete_songs.description,
      notes: SwaggerSongsDocs.delete_songs.notes,
      validate: {
        params: SongParamsSchema,
      },
      plugins: {
        'hapi-swagger': {
          responses: SwaggerSongsDocs.delete_songs.responses,
        },
      },
    },
  },
];

module.exports = routes;
