const Joi = require('joi');

const PostPlaylistPayloadSchema = Joi.object({
  name: Joi.string().max(255).required(),
});

module.exports = { PostPlaylistPayloadSchema };
