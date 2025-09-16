const autoBind = require('auto-bind');

class AlbumLikesHandler {
  constructor(albumLikesService, albumsService) {
    this._albumLikesService = albumLikesService;
    this._albumsService = albumsService;
    autoBind(this);
  }

  async postAlbumLike(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumsService.verifyExistingAlbum(albumId);

    await this._albumLikesService.addAlbumLike(credentialId, albumId);
    const response = h.response({
      status: 'success',
      message: 'Album disukai',
    });
    response.code(201);
    return response;
  }

  async getAlbumLikeByAlbumId(request) {
    const { id: albumId } = request.params;

    await this._albumsService.verifyExistingAlbum(albumId);

    const likes = await this._albumLikesService.getAlbumLikes(albumId);
    return {
      status: 'success',
      data: {
        likes,
      },
    };
  }

  async deleteAlbumLikeByAlbumId(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumsService.verifyExistingAlbum(albumId);

    await this._albumLikesService.deleteAlbumLike(credentialId, albumId);

    return {
      status: 'success',
      message: 'Album dihapus dari disukai',
    };
  }
}

module.exports = AlbumLikesHandler;
