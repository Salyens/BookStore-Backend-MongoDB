const router = require("express").Router();
const AdminController = require("../controllers/AdminController");
const { loginAdminMiddleware } = require("../middlewares/admin");

router.route("/login").post([loginAdminMiddleware], AdminController.login);

module.exports = router;
