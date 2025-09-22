const SwaggerAuthorizationResponse = {
  403: {
    description: 'Error: Unauthorized',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', example: 403 },
        status: { type: 'string', example: 'fail' },
        message: { type: 'string', example: 'Anda tidak berhak mengakses resource ini' },
      },
    },
  },
};

module.exports = SwaggerAuthorizationResponse;
