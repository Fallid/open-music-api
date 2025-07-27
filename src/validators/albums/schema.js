const Joi = require('joi');

const AlbumsPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().max(new Date().getFullYear()).required(),
});

module.exports = { AlbumsPayloadSchema };
