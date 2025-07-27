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
}

module.exports = AlbumsService;
