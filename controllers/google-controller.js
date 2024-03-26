const { googleAuth } = require("../services/user-service");
const { jwtDecode } = require("jwt-decode");
const UserService = require("../services/user-service");

class GoogleController {
  async authHandler(req, res, next) {
    try {
      const code = req.query.code;
      const token = await googleAuth(code);
      const { email, given_name, family_name } = jwtDecode(token);
      const user = await UserService.getByEmail(email);
      let userData;
      if (!user) {
        userData = await UserService.registration(
          given_name,
          family_name,
          email,
          "454544"
        );
      } else {
        userData = await UserService.login(email, "454544");
      }
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.redirect(`${process.env.CLIENT_URL}/profile`);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new GoogleController();
