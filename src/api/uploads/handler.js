const autoBind = require('auto-bind');

class UploadsHandler {
  constructor(storageService, albumsService, validator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id: albumId } = request.params;
    await this._albumsService.verifyExistingAlbum(albumId);
    await this._validator.validateImageHeaders(cover.hapi.headers);

    const fileLocation = await this._storageService.writeFile(cover, cover.hapi);
    await this._albumsService.putCoverAlbumById(albumId, fileLocation);
    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
