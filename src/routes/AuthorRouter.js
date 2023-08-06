const router = require("express").Router();
const AuthorController = require("../controllers/AuthorController");
router
  .route("/")
  .get(AuthorController.getAll)
  .post(AuthorController.create);

router
  .route("/:id")
  .patch(AuthorController.update)
  .delete(AuthorController.delete);

module.exports = router;
