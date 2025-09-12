const Joi = require('joi');

const SongsPayloadSchema = Joi.object({
  title: Joi.string().max(50).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear())
    .required(),
  genre: Joi.string().max(35).required(),
  performer: Joi.string().max(40).required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

const SongQuerySchema = Joi.object({
  title: Joi.string().max(50).empty(''),
  performer: Joi.string().max(40).empty(''),
});

module.exports = { SongsPayloadSchema, SongQuerySchema };
