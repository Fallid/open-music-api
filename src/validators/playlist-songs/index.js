const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema } = require('./schema');

const PlaylistSongsValidator = {
  validatePostPlaylistSongsPayload: (payload) => {
    const validateResult = PostPlaylistSongPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
  validateDeletePlaylistSongsPayload: (payload) => {
    const validateResult = DeletePlaylistSongPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
