const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { loginUserMiddleware } = require("../middlewares/user");
const verifyToken = require('../middlewares/auth/verifyToken')

router.route('/refresh-Token').get([verifyToken], UserController.generateTokenPairs);
router.route("/login").post([loginUserMiddleware], UserController.login);
router.route("/registration").post(UserController.registration)

module.exports = router;
