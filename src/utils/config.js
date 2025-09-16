const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  s3: {
    bucketName: process.env.AWS_BUCKET_NAME,
  },
  redis: {
    host: process.env.REDIS_SERVER,
  },
};

module.exports = config;
