const Joi = require('joi');

const AlbumsPayloadSchema = Joi.object({
  name: Joi.string().max(50).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  cover: Joi.string().allow(null),
});

module.exports = { AlbumsPayloadSchema };
