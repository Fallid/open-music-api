const autoBind = require('auto-bind');

class PlaylistActivitiesHandler {
  constructor(playlistActivitiesService, playlistsService) {
    this._playlistActivitiesService = playlistActivitiesService;
    this._playlistsService = playlistsService;

    autoBind(this);
  }

  async getPlaylistActivitiesByPlaylistId(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: playlistId } = request.params;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const playlist = await this._playlistActivitiesService.getPlaylistActivitiesByPlaylistId(
      playlistId,
      credentialId,
    );
    return {
      status: 'success',
      data: playlist,
    };
  }
}

module.exports = PlaylistActivitiesHandler;
