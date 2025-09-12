const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().max(50).required(),
  password: Joi.string().max(255).required(),
}).label('LoginRequest');

const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).label('RefreshTokenRequest');

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).label('LogoutRequest');

module.exports = {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
