const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
const { updateCategory, createCategory } = require("../middlewares/category");


router
  .route("/")
  .get(CategoryController.getAll)
  .post([createCategory], CategoryController.create);

router
  .route("/:id")
  .patch([updateCategory], CategoryController.update)
  .delete(CategoryController.delete);

module.exports = router;
