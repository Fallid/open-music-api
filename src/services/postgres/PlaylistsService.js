const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const {
  mapDBPlaylistToModel,
  mapDBPlaylistSongsToModel,
  mapDBSongsToModel,
} = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
  constructor(collaborationsService) {
    this._pool = new Pool();
    this._collaborationsService = collaborationsService;
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
      text: `SELECT pl.id, pl.name, usr.username FROM playlists pl
      LEFT JOIN collaborations cb ON cb.playlist_id = pl.id 
      LEFT JOIN users usr ON usr.id = pl.owner
      WHERE pl.owner = $1 OR cb.user_id = $1`,
      values: [owner],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapDBPlaylistToModel);
  }

  async deletePlaylist(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = result.rows[0];

    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationsService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }

  async verifyPlaylistExist(playlistId) {
    const query = {
      text: 'SELECT id FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Perminta Anda gagal. Playlist tidak ditemukan');
    }
  }

  async getPlaylistSongByPlaylistId({ owner, playlistId }) {
    const query = {
      text: `SELECT p.id, p.name, u.username, s.id AS song_id, s.title AS song_title, s.performer AS song_performer FROM playlists p
      INNER JOIN users u ON p.owner = u.id
      LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
      LEFT JOIN songs s ON s.id = ps.song_id
      LEFT JOIN collaborations cb ON cb.playlist_id = p.id
      WHERE (p.owner = $1 OR cb.user_id = $1) AND p.id = $2`,
      values: [owner, playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    // Extract songs data if available
    const songs = result.rows[0].song_id
      ? result.rows.map(mapDBSongsToModel)
      : [];

    // Construct playlist object
    const playlist = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      username: result.rows[0].username,
      songs,
    };

    return mapDBPlaylistSongsToModel(playlist);
  }
}

module.exports = PlaylistsService;
