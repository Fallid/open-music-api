const autoBind = require('auto-bind');

class PlaylistSongsHandler {
  constructor(
    playlistSongsService,
    playlistsService,
    validator,
  ) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePostPlaylistSongsPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlistSong = await this._playlistSongsService.addPlaylistSong(
      playlistId,
      songId,
      credentialId,
    );
    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan ke playlist',
      data: {
        playlistSong,
      },
    });
    response.code(201);

    return response;
  }

  async deletePlaylistSongsHandler(request) {
    this._validator.validateDeletePlaylistSongsPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongByPlaylistIdAndSongId(
      playlistId,
      songId,
      credentialId,
    );

    return {
      status: 'success',
      message: 'Song berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
