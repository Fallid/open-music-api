const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { PlaylistActivityAction } = require('../../utils/enum');

class PlaylistSongsService {
  constructor(playlistActivitesService) {
    this._pool = new Pool();
    this._playlistActivitiesService = playlistActivitesService;
  }

  async verifyNewSongInPlaylist(songId) {
    const query = {
      text: 'SELECT song_id FROM playlist_songs WHERE song_id = $1',
      values: [songId],
    };
    const result = await this._pool.query(query);
    if (result.rowCount > 0) {
      throw new InvariantError(
        'Gagal menambahkan song. Song sudah ada di playlist.',
      );
    }
  }

  async verifyNonExistingSongInPlaylist(songId) {
    const query = {
      text: 'SELECT id FROM songs WHERE id = $1',
      values: [songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal menambahkan song. Song tidak ditemukan');
    }
  }

  async addPlaylistSong(playlistId, songId, userId) {
    await this.verifyNewSongInPlaylist(songId);
    await this.verifyNonExistingSongInPlaylist(songId);
    await this._playlistActivitiesService.addPlaylistActivity({
      playlistId,
      songId,
      userId,
      action: PlaylistActivityAction.ADD,
    });
    const id = `playlist_song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Song gagal ditambahkan ke dalam playlist');
    }

    return result.rows[0];
  }

  async deletePlaylistSongByPlaylistIdAndSongId(playlistId, songId, userId) {
    await this._playlistActivitiesService.addPlaylistActivity({
      playlistId,
      songId,
      userId,
      action: PlaylistActivityAction.DELETE,
    });

    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist song gagal dihapus');
    }
    return result;
  }
}

module.exports = PlaylistSongsService;
