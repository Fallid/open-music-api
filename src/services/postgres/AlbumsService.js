const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../../../../joi-plugin/src/exceptions/InvariantError');
const { mapDBAlbumsToModel } = require('../../utils');
const NotFoundError = require('../../../../../joi-plugin/src/exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  // Create album service
  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;

    // query to database
    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updateAt],
    };

    const result = await this._pool.query(query);

    // verification the result
    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Albums tidak ditemukan');
    }

    return result.rows.map(mapDBAlbumsToModel)[0];
  }

  async putAlbumById(id, { name, year }) {
    const updateAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updateAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
