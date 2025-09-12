const Joi = require('joi');

const SongsPayloadSchema = Joi.object({
  title: Joi.string().max(50).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  genre: Joi.string().max(35).required(),
  performer: Joi.string().max(40).required(),
  duration: Joi.number(),
  albumId: Joi.string(),
}).label('SongRequest');

const SongQuerySchema = Joi.object({
  title: Joi.string().max(50).empty(''),
  performer: Joi.string().max(40).empty(''),
}).label('SongQueryParams');

const SongParamsSchema = Joi.object({
  id: Joi.string().required(),
}).label('SongParams');

module.exports = { SongsPayloadSchema, SongQuerySchema, SongParamsSchema };
