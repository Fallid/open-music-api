const Joi = require('joi');

const PostPlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().max(50).required(),
}).label('AddSongToPlaylistRequest');

const DeletePlaylistSongPayloadSchema = Joi.object({
  songId: Joi.string().max(50).required(),
}).label('RemoveSongFromPlaylistRequest');

module.exports = { PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema };
