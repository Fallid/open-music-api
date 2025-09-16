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

  async getAlbumLikeByAlbumId(request, h) {
    const { id: albumId } = request.params;

    await this._albumsService.verifyExistingAlbum(albumId);

    const { isCache, result } = await this._albumLikesService.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: { likes: parseInt(result.count, 10) },
    });
    console.log(isCache);
    if (isCache) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'not-cache');
    }
    return response;
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
