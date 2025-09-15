const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyAlbumLike(userId, albumId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE  user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const result = await this._pool.query(query);
    if (result.rowCount > 0) {
      throw new InvariantError('Kamu sudah like album ini');
    }
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

  async addAlbumLike(userId, albumId) {
    await this.verifyExistingAlbum(albumId);
    await this.verifyAlbumLike(userId, albumId);
    const id = `album_like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menyukai playlist');
    }

    return result.rows[0];
  }

  async getAlbumLikes(albumId) {
    await this.verifyExistingAlbum(albumId);

    const query = {
      text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);
    // tidak perlu verifikasi karena sudah diverif pada verifyExistingAlbum
    return result.rowCount;
  }

  async deleteAlbumLike(userId, albumId) {
    await this.verifyExistingAlbum(albumId);

    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus album dari disukai');
    }

    return result;
  }
}

module.exports = AlbumLikesService;
