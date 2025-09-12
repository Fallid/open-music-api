const autoBind = require('auto-bind');
const { PlaylistActivityAction } = require('../../utils/enum');

class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, playlistActivitiesService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._playlistActivitiesService = playlistActivitiesService;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePostPlaylistSongsPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const playlistSong = await this._playlistSongsService.addPlaylistSong(playlistId, songId);
    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan ke playlist',
      data: {
        playlistSong,
      },
    });
    response.code(201);

    await this._playlistActivitiesService.addPlaylistActivity({
      playlistId, songId, userId: credentialId, action: PlaylistActivityAction.ADD,
    });
    return response;
  }

  async deletePlaylistSongsHandler(request) {
    this._validator.validateDeletePlaylistSongsPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongByPlaylistIdAndSongId(playlistId, songId);

    await this._playlistActivitiesService.addPlaylistActivity({
      playlistId, songId, userId: credentialId, action: PlaylistActivityAction.DELETE,
    });

    return {
      status: 'success',
      message: 'Song berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
