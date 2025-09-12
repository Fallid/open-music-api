const Joi = require('joi');

const UsersPayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().max(255).required(),
  fullname: Joi.string().max(255).required(),
});

module.exports = UsersPayloadSchema;
