const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBPlaylistSongActivitiesToModel } = require('../../utils');

class PlaylistActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistActivity({
    playlistId, songId, userId, action,
  }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: `INSERT INTO playlist_song_activities
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Activity gagal ditambahkan');
    }
  }

  async getPlaylistActivitiesByPlaylistId(playlistId, owner) {
    const query = {
      text: `SELECT p.id, s.id AS song_id, u.username, s.title ,psa.action, psa.time FROM playlists p
      INNER JOIN users u on p.owner = u.id
      INNER JOIN playlist_song_activities psa on psa.playlist_id = p.id
      LEFT JOIN songs s ON s.id = psa.song_id
      LEFT JOIN collaborations cb ON cb.playlist_id = p.id
      WHERE (p.owner = $1 OR cb.user_id = $1) OR p.id = $2`,
      values: [owner, playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist Activities tidak ditemukan');
    }

    return mapDBPlaylistSongActivitiesToModel(result.rows);
  }
}

module.exports = PlaylistActivitiesService;
