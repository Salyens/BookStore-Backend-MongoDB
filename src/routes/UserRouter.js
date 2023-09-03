const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { loginUserMiddleware } = require("../middlewares/user");
const verifyToken = require("../middlewares/auth/verifyToken");
const {
  checkEmail,
  checkName,
  checkPassword,
} = require("../middlewares/registration");

router
  .route("/refresh-Token")
  .get([verifyToken], UserController.generateTokenPairs);
router.route("/login").post([loginUserMiddleware], UserController.login);
router
  .route("/update")
  .post([verifyToken, checkName, checkEmail], UserController.update);
router
  .route("/registration")
  .post([checkName, checkEmail, checkPassword], UserController.registration);

module.exports = router;
