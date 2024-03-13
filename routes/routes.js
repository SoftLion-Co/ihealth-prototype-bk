const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
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
router.get("/users/:email", authMiddleware, userController.getUsers);

module.exports = router;
