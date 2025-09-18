const SwaggerAuthenticationResponse = {
  401: {
    description: 'Error: Unauthorized',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'integer', example: 401 },
        error: { type: 'string', example: 'Unauthorized' },
        message: { type: 'string', example: 'Missing authentication' },
      },
    },
  },
};

module.exports = SwaggerAuthenticationResponse;
