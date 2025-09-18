const Joi = require('joi');

const AlbumLikesParamsSchema = Joi.object({
  id: Joi.string().max(50).required(),
});

module.exports = { AlbumLikesParamsSchema };
