const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 10, // max requests
  duration: 1, // per second
});

const rateLimitMiddleware = async (request, h) => {
  try {
    const key = request.info.remoteAddress;
    await rateLimiter.consume(key);
    return h.continue;
  } catch (rejRes) {
    return h
      .response({
        statusCode: 429,
        status: 'fail',
        message: 'Too Many Requests',
      })
      .code(429)
      .takeover();
  }
};

module.exports = rateLimitMiddleware;
