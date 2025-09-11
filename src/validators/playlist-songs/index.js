const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistSongPayloadSchema } = require('./schema');

const PlaylistSongsValidator = {
  validatePlaylistSongsPayload: (payload) => {
    const valdateResult = PostPlaylistSongPayloadSchema.validate(payload);
    if (valdateResult.error) {
      throw new InvariantError(valdateResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
