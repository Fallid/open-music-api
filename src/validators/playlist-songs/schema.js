const Joi = require('joi');

const PostPlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().max(50).required(),
});

const DeletePlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().max(50).required(),
});

module.exports = { PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema };
