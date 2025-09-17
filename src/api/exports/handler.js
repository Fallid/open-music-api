const autoBind = require('auto-bind');

class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async postExportSongsHandler(request, h) {
    this._validator.validateExportSongsPayload(request.payload);
    const { id: userId } = request.auth.credentials;
    const { playlistId } = request.params;
    await this._playlistsService.verifyPlaylistExist(playlistId);
    await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
    const message = {
      userId,
      playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this._producerService.sendMessage('export:playlist-song', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda sedang kami proses',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
