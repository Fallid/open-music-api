const Joi = require('joi');

const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown().label('Upload Headers');

const AlbumCoverParamsSchema = Joi.object({
  id: Joi.string().required().example('album-Y6TjHaLVEturco5K').description('Album ID'),
}).label('Upload Params');

const UploadImagePayloadSchema = Joi.object({
  cover: Joi.any()
    .meta({ swaggerType: 'file' })
    .description('Cover album image file')
    .example('cover.jpg'),
}).label('Upload Request');

module.exports = { ImageHeadersSchema, AlbumCoverParamsSchema, UploadImagePayloadSchema };
