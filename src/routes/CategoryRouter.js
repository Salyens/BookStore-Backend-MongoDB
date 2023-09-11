const router = require("express").Router();
const CategoryController = require("@controllers/CategoryController");
const { updateCategory, createCategory } = require("@middlewares/category");
const { checkRole } = require("@middlewares/user");
const verifyToken = require("@middlewares/auth/verifyToken");

router
  .route("/")
  .get([verifyToken], CategoryController.getAll)
  .post([verifyToken, checkRole, createCategory], CategoryController.create);

router
  .route("/:id")
  .patch([verifyToken, checkRole, updateCategory], CategoryController.update)
  .delete([verifyToken, checkRole], CategoryController.delete);

module.exports = router;
