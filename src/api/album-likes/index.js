const AlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Album like',
  version: '1.0.0',
  register: async (server, { service }) => {
    const albumLikesHandler = new AlbumLikesHandler(service);
    server.route(routes(albumLikesHandler));
  },
};
