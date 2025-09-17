const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
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

  async addAlbumLike(userId, albumId) {
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

    await this._cacheService.delete(`album_like:${albumId}`);

    return result.rows[0];
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`album_like:${albumId}`);
      return {
        isCache: true, // memberi tahu ini dari cache
        result: JSON.parse(result),
      };
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };

      // tidak perlu verifikasi karena sudah diverif pada verifyExistingAlbum
      const result = await this._pool.query(query);
      const likeCount = result.rows[0];

      await this._cacheService.set(`album_like:${albumId}`, JSON.stringify(likeCount));
      return {
        isCache: false, // bahwa ini bukan dari cache
        result: result.rows[0],
      };
    }
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menghapus album dari disukai');
    }

    await this._cacheService.delete(`album_like:${albumId}`);
  }
}

module.exports = AlbumLikesService;
