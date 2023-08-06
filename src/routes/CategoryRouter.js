const router = require("express").Router();
const CategoryController = require("../controllers/CategoryController");
router
  .route("/")
  .get(CategoryController.getAll)
  .post(CategoryController.create);

router
  .route("/:id")
  .patch(CategoryController.update)
  .delete(CategoryController.delete);

module.exports = router;
