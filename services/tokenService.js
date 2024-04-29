const { sign, verify } = require("jsonwebtoken");
const tokenModel = require("../models/tokenModel");
const config = require("../config/config");

class TokenService {
  generateTokens(payload) {
    const accessToken = sign(payload, config.auth.jwtAccessKey, {
      expiresIn: "30m",
    });
    const refreshToken = sign(payload, config.auth.jwtRefreshKey, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }
  async saveToken(user, refreshToken) {
    const tokenData = await tokenModel.findOne({ user });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    await tokenModel.deleteOne({ refreshToken });
    return;
  }

  validateAccessToken(token) {
    try {
      const userData = verify(token, config.auth.jwtAccessKey);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = verify(token, config.auth.jwtRefreshKey);
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
