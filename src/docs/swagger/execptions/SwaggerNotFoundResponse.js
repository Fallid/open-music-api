const SwaggerNotFoundResponse = (message) => ({
  description: 'Error: Not Found',
  schema: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 404 },
      status: { type: 'string', example: 'fail' },
      message: { type: 'string', example: message },
    },
  },
});

module.exports = SwaggerNotFoundResponse;
