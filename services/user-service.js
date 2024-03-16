const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const { v4 } = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../middlewares/api-error");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const activationLink = v4();
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const user = await UserModel.create({
      email,
      password: bcrypt.hashSync(password, 10),
      activationLink,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink: activationLink });
    if (!user) {
      throw ApiError.BadRequest("Invalid link");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.UnauthorizedError(
        `User with email ${email} does not exist`
      );
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw ApiError.UnauthorizedError("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
    return;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError("No client refresh tokens");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    if (!userData || !dbToken) {
      throw ApiError.UnauthorizedError("Invalid refresh token");
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }
}

module.exports = new UserService();

