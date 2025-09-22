const SwaggerAuthenticationResponse = (message = 'Missing authentication') => ({
  description: 'Error: Unauthorized',
  schema: {
    type: 'json',
    properties: {
      statusCode: { type: 'integer', example: 401 },
      status: { type: 'string', example: 'fail' },
      message: { type: 'string', example: message },
    },
  },

});

module.exports = SwaggerAuthenticationResponse;
