const Joi = require('joi');

const AlbumsPayloadSchema = Joi.object({
  name: Joi.string().max(50).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
}).label('AlbumRequest');

const AlbumParamsSchema = Joi.object({
  id: Joi.string().required(),
}).label('AlbumParams');

module.exports = { AlbumsPayloadSchema, AlbumParamsSchema };
