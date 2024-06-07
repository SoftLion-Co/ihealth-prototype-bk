const { jwtDecode } = require("jwt-decode");
const UserService = require("../services/UserService");

class ForeignAuth {
  async google(req, res, next) {
    try {
      const code = req.query.code;
      const token = await UserService.googleAuth(code);
      const { email, given_name, family_name } = jwtDecode(token);
      const nickname = `@${email}`
      const user = await UserService.getByEmail(nickname);
      let userData;
      if (!user) {
        userData = await UserService.registration(
          given_name,
          family_name,
          nickname,
          null,
          "google"
        );
      } else {
        userData = await UserService.login(nickname);
      }
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } catch (e) {
      next(e);
    }
    return res.redirect(`${process.env.CLIENT_URL}/profile`);
  }
  async github(req, res, next) {
    try {
      const code = req.query.code;
      const { id, name } = await UserService.githubAuth(code);
      const githubId = `@githubId${id}`;
      const user = await UserService.getByEmail(githubId);
      let userData;
      if (!user) {
        userData = await UserService.registration(
          name,
          "",
          githubId,
          null,
          "github"
        );
      } else {
        userData = await UserService.login(githubId);
      }
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } catch (e) {
      next(e);
    }
    return res.redirect(`${process.env.CLIENT_URL}/profile`);
  }
}

module.exports = new ForeignAuth();
