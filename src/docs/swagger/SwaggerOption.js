const SwaggerOptions = {
  info: {
    title: 'OpenMusicAPI Documentation',
    version: '3.0.0',
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
      description: 'Masukkan token dengan format: Bearer (token)',
    },
  },
};

module.exports = { SwaggerOptions };
