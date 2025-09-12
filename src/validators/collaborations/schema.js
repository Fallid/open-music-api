const Joi = require('joi');

const collaborationsPayloadSchema = Joi.object({
  playlist_id: Joi.string().required(),
  user_id: Joi.string().required(),
});

module.exports = { collaborationsPayloadSchema };
