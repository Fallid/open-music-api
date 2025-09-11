const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBPlaylistToModel } = require('../../utils');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, owner, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `SELECT pl.id, pl.name, usr.username FROM playlists AS pl
        LEFT JOIN users AS usr ON usr.id = pl.owner
        WHERE pl.owner = $1`,
      values: [owner],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist tidak ditemukan');
    }

    return result.rows.map(mapDBPlaylistToModel);
  }
}

module.exports = PlaylistsService;
