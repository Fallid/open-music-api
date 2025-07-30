const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBSongToModel } = require('../../utils');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  // Create song service
  async addSong({
    title, year, genre, performer, duration, albumId = null,
  }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updateAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Songs gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  // Get all songs service
  async getSongs({ title, performer }) {
    let query = 'SELECT id, title, performer FROM songs';
    const queryValues = [];
    if (title !== '' && performer !== '') {
      query += ' WHERE title ILIKE $1 AND performer ILIKE $2';
      queryValues.push(`%${title}%`, `%${performer}%`);
    } else if (title !== '') {
      query += ' WHERE title ILIKE $1';
      queryValues.push(`%${title}%`);
    } else if (performer !== '') {
      query += ' WHERE performer ILIKE $1';
      queryValues.push(`%${performer}%`);
    }

    const querySearch = {
      text: query,
      values: queryValues,
    };

    const result = await this._pool.query(querySearch);
    return result.rows;
  }

  // Get song detail by id service
  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }

    return result.rows.map(mapDBSongToModel)[0];
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
  }
}

module.exports = SongsService;
