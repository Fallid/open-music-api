require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
// error handler
const ClientError = require('./exceptions/ClientError');
// albums plugin
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validators/albums');
// songs plugin
const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validators/songs');
// users plugin
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validators/users');
// authentications plugin
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validators/authentications');
// playlist plugin
const playlists = require('./api/playlists');
const PlaylistsService = require('./services/postgres/PlaylistsService');
const PlaylistsValidator = require('./validators/playlists');
// playlist songs plugin
const playlistSongs = require('./api/playlist-songs');
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService');
const PlaylistSongsValidator = require('./validators/playlist-songs');
// playlist activity plugin
const playlistActivities = require('./api/playlist-activities');
const PlaylistActivitiesService = require('./services/postgres/PlaylistActivitiesService');
// collaboration plugin
const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validators/collaborations');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationsService();
  const playlistsService = new PlaylistsService(collaborationsService);
  const playlistActivitiesService = new PlaylistActivitiesService();
  const playlistSongsService = new PlaylistSongsService(playlistActivitiesService);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // plugin external
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'OpenMusicAPI Documentation',
          version: '1.0.0',
          description: 'RESTful API untuk aplikasi manajemen musik yang memungkinkan pengguna mengelola album, lagu, playlist, kolaborasi, dan autentikasi',
        },
        documentationPath: '/documentation',
        jsonPath: '/swagger.json',
        // Taruh aset UI di bawah /documentation untuk menghindari 404 di balik proxy/tunnel
        swaggerUIPath: '/documentation/swaggerui/',
        grouping: 'tags',
        sortTags: 'alpha',
        sortEndpoints: 'method',
        swaggerUI: true,
        documentationPage: true,
        definitionPrefix: 'useLabel',
        reuseDefinitions: true,
        // Tambah definisi keamanan JWT untuk Swagger UI
        securityDefinitions: {
          jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Masukkan token dengan format: Bearer <token>',
          },
        },
      },
    },
  ]);

  // strategy autentikasi jwt
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE, // 4 jam
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  // plugin local
  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        service: playlistsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: playlistSongs,
      options: {
        playlistSongsService,
        playlistsService,
        playlistActivitiesService,
        validator: PlaylistSongsValidator,
      },
    },
    {
      plugin: playlistActivities,
      options: {
        playlistActivitiesService,
        playlistsService,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // konteks response dari request
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // Periksa jika ini adalah error dari server (termasuk error yang dibungkus Hapi)
    if (response.isServer) {
      console.error(response); // Tampilkan log error asli untuk debugging
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server bejalan pada ${server.info.uri}`);
  console.log(`API Documentation tersedia di ${server.info.uri}/documentation`);
};

init();
