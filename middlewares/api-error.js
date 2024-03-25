module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message, errors = []) {
    return new ApiError(401, message, errors);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static InternalServerError(message, errors = []) {
	return new ApiError(500, message, errors);
 }

 static NotFoundError(message, errors = []) {
	return new ApiError(404, message, errors);
 }

  static ShopifyError(message, errors = []) {
    return new ApiError(503, message, errors);
  }
};
