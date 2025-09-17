const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBSongToModel } = require('../../utils');

class SongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  // Create song service
  async addSong({
    title, year, genre, performer, duration, albumId = null,
  }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Songs gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  // Get all songs service
  async getSongs(title = '', performer = '') {
    const cacheKey = `song:search:${title}:${performer}`;

    try {
      const cached = await this._cacheService.get(cacheKey);
      return {
        isCache: true,
        result: JSON.parse(cached),
      };
    } catch (error) {
      const query = {
        text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 and performer ILIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };

      const { rows } = await this._pool.query(query);

      await this._cacheService.set(cacheKey, JSON.stringify(rows));

      return {
        isCache: false,
        result: rows,
      };
    }
  }

  // Get song detail by id service
  async getSongById(id) {
    try {
      const cached = await this._cacheService.get(`song:${id}`);
      return {
        isCache: true,
        result: JSON.parse(cached),
      };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM songs WHERE id = $1',
        values: [id],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Song tidak ditemukan');
      }

      const mappedSong = result.rows.map(mapDBSongToModel)[0];

      await this._cacheService.set(`song:${id}`, JSON.stringify(mappedSong));

      return {
        isCache: false,
        result: mappedSong,
      };
    }
  }

  async putSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4,  duration = $5, album_id = $6, updated_at = $7  WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal  memperbarui song. Id tidak ditemukan');
    }

    await this._cacheService.delete(`song:${id}`);
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }

    await this._cacheService.delete(`song:${id}`);
  }
}

module.exports = SongsService;
