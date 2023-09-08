const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { loginUser } = require("../middlewares/user");
const verifyToken = require("../middlewares/auth/verifyToken");
const registrationValid = require("../middlewares/registration/registrationValid");
const updateProfile = require("../middlewares/user/updateProfile");

router
  .route("/refresh-Token")
  .get([verifyToken], UserController.generateTokenPairs);
router.route("/login").post([loginUser], UserController.login);
router.route("/update-profile").post([verifyToken, updateProfile], UserController.update);
router
  .route("/registration")
  .post([registrationValid], UserController.registration);

module.exports = router;
