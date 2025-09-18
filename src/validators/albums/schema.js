const Joi = require('joi');

const AlbumsPayloadSchema = Joi.object({
  name: Joi.string().max(50).required().example('Hapier Than Ever'),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  cover: Joi.string().allow(null).example(null),
}).label('Album Request');

const AlbumParamsSchema = Joi.object({
  id: Joi.string().required(),
}).label('Album Params');

module.exports = { AlbumsPayloadSchema, AlbumParamsSchema };
