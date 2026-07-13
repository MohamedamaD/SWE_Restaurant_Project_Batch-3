exports.verifySchemaMiddleware = function (schema) {
  return function (request, response, next) {
    const { error, value } = schema.validate(request.body, {
      abortEarly: false,
    });

    if (error)
      return response
        .status(400)
        .json({ messages: error.details.map((detail) => detail.message) });

    request.value = value;
    next();
  };
};
