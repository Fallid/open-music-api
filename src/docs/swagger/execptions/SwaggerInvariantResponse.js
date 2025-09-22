const SwaggerInvariantResponse = {
  400: {
    description: 'Error: Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', example: 400 },
        status: { type: 'string', example: 'fail' },
        message: { type: 'string', example: 'Invalid request payload input' },
      },
    },
  },
};

module.exports = SwaggerInvariantResponse;
