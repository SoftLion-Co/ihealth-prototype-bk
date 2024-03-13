const { sign, verify } = require("jsonwebtoken");
const TokenModel = require("../models/token-model");
const tokenModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }
  async saveToken(user, refreshToken) {
    const tokenData = await TokenModel.findOne({ user });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    await tokenModel.deleteOne({ refreshToken });
    return;
  }

  validateAccessToken(token) {
    try {
      const userData = verify(token, process.env.JWT_ACCESS_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = verify(token, process.env.JWT_REFRESH_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    const userData = await tokenModel.findOne({ refreshToken });
    return userData;
  }
}

module.exports = new TokenService();
