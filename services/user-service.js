const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const ActivationModel = require("../models/activation-model");
const Model = require("../models/user-model");
const { v4 } = require("uuid");
const mailService = require("./mailSenderService");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../middlewares/api-error");
const { default: axios } = require("axios");
const qs = require("qs");
const userModel = require("../models/user-model");

class UserService {
  async edit(firstName, lastName, email, password, authType) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const activationLink = v4();
    if (password) {
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`
      );
    }
  }

  async registration(firstName, lastName, email, password, authType) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const activationLink = v4();
    if (password) {
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`
      );
    }

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: password ? bcrypt.hashSync(password, 10) : null,
      isActivated: password ? false : true,
      authType,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    await ActivationModel.create({ user: userDto.id, link: activationLink });

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const link = await ActivationModel.findOne({ link: activationLink });
    const user = await UserModel.findById(link?.user);
    if (!user) {
      throw ApiError.BadRequest("Invalid link");
    }
    user.isActivated = true;
    await link?.deleteOne();
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.UnauthorizedError(
        `User with email ${email} does not exist`
      );
    }
    const userDto = new UserDto(user);
    if (password && user.password) {
      if (!bcrypt.compareSync(password, user.password)) {
        throw ApiError.UnauthorizedError("Invalid password");
      }
    }

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
  
  async googleAuth(code) {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: process.env.GOOGLE_CLIENT,
      client_secret: process.env.GOOGLE_KEY,
      redirect_uri: "http://localhost:5000/api/auth/google",
      grant_type: "authorization_code",
    };
    try {
      const res = await axios.post(url, qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { id_token } = res.data;
      return id_token;
    } catch (error) {
      console.log(error.response);
    }
  }
  async githubAuth(code) {
    const tokenUrl = "https://github.com/login/oauth/access_token";
    const userUrl = "https://api.github.com/user";
    const values = {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_KEY,
      code,
    };
    try {
      const token = await axios.post(tokenUrl, qs.stringify(values), {
        headers: {
          Accept: "application/json",
        },
      });
      const { access_token } = token.data;
      console.log(access_token);
      const res = await axios.get(userUrl, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  }
}

module.exports = new UserService();

