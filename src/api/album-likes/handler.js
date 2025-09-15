const autoBind = require('auto-bind');

class AlbumLikesHandler {
  constructor(service) {
    this._service = service;
    autoBind(this);
  }

  async postAlbumLike(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._service.addAlbumLike(credentialId, albumId);
    const response = h.response({
      status: 'success',
      message: 'Album disukai',
    });
    response.code(201);
    return response;
  }

  async getAlbumLikeByAlbumId(request) {
    const { id: albumId } = request.params;

    const likes = await this._service.getAlbumLikes(albumId);
    return {
      status: 'success',
      data: {
        likes,
      },
    };
  }

  async deleteAlbumLikeByAlbumId(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;

    await this._service.deleteAlbumLike(credentialId, playlistId);

    return {
      status: 'success',
      message: 'Album dihapus dari disukai',
    };
  }
}

module.exports = AlbumLikesHandler;
