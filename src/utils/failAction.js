const failAction = (request, h, err) => {
  // Ambil pesan error dari Joi
  const message = err.details ? err.details[0].message : err.message;
  const response = h.response({
    statusCode: 400,
    status: 'fail',
    message,
  });
  response.code(400);
  return response.takeover();
};

module.exports = failAction;
