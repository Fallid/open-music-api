const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapDBAlbumsToModel, mapDBSongsToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyExistingAlbum(albumId) {
    const query = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  // Create album service
  async addAlbum({ name, year, cover }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    // query to database
    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3, $4, $5, $5) RETURNING id',
      values: [id, name, year, cover, createdAt],
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
      text: `SELECT 
      a.id, a.name, a.year, a.cover,
      s.id as song_id, s.title as song_title, s.performer as song_performer 
      FROM albums a 
      LEFT JOIN songs s ON s.album_id = a.id
      WHERE a.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Albums tidak ditemukan');
    }

    const songs = result.rows[0].song_id ? result.rows.map(mapDBSongsToModel) : [];

    const album = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      year: result.rows[0].year,
      cover: result.rows[0].cover,
      songs,
    };

    return mapDBAlbumsToModel(album);
  }

  async putAlbumById(id, { name, year, cover }) {
    const updateAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, cover = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [name, year, cover, updateAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async putCoverAlbumById(id, cover) {
    const updateAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET cover = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [cover, updateAt, id],
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
