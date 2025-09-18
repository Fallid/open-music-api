const Joi = require('joi');

const ExportSongsPayloadSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
}).label('Export Request');

const ExportSongsParamsSchema = Joi.object({
  playlistId: Joi.string().required().example('playlist-123').description('ID playlist'),
}).label('Export Params');

module.exports = { ExportSongsPayloadSchema, ExportSongsParamsSchema };
