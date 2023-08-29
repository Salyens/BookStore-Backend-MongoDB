const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { loginUserMiddleware } = require("../middlewares/user");

router.route("/login").post([loginUserMiddleware], UserController.login);

module.exports = router;
