const Joi = require('joi');

const PostPlaylistPayloadSchema = Joi.object({
  name: Joi.string().max(255).required(),
}).label('PlaylistCreateRequest');

const PlaylistParamsSchema = Joi.object({
  id: Joi.string().required(),
}).label('PlaylistParams');

module.exports = { PostPlaylistPayloadSchema, PlaylistParamsSchema };
