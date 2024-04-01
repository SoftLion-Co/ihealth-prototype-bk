const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const foreignAuthController = require("../controllers/foreign-auth-controller");
const router = require("express").Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isString().isLength(6),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users/:email", userController.getUsers);
router.get("/auth/google", foreignAuthController.google);
router.get("/auth/github", foreignAuthController.github);

module.exports = router;
