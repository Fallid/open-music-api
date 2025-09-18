const SwaggerAuthorizationResponse = {
  403: {
    description: 'Error: Unauthorized',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', example: 403 },
        error: { type: 'string', example: 'Unauthorized' },
        message: { type: 'string', example: 'Missing authentication' },
      },
    },
  },
};

module.exports = SwaggerAuthorizationResponse;
