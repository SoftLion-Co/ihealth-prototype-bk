const tokenService = require("../services/token-service");
const ApiError = require("./api-error");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError("No auth header"));
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError("No access token"));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError("Invalid token"));
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError(error.message));
  }
};
