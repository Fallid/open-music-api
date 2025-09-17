const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const songId = await this._service.addSong(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });

    response.code(201);
    return response;
  }

  async getSongsHandler(request, h) {
    const { title = '', performer = '' } = request.query;
    await this._validator.validateSongSearch({ title, performer });
    const { isCache, result } = await this._service.getSongs(title, performer);

    const response = h.response({
      status: 'success',
      data: {
        songs: result,
      },
    });

    if (isCache) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'not-cache');
    }

    return response;
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    const { isCache, result } = await this._service.getSongById(id);

    const response = h.response({
      status: 'success',
      data: {
        song: result,
      },
    });

    if (isCache) {
      response.header('X-Data-Source', 'cache');
    } else {
      response.header('X-Data-Source', 'not-cache');
    }

    return response;
  }

  async putSongByIdHandler(request, _h) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._service.putSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Song berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request, _h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: `Song dengan id = ${id} berhasil dihapus`,
    };
  }
}

module.exports = SongsHandler;
