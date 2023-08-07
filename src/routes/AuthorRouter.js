const router = require("express").Router();
const AuthorController = require("../controllers/AuthorController");
const { createAuthor, updateAuthor } = require("../middlewares/author");

router
  .route("/")
  .get(AuthorController.getAll)
  .post([createAuthor], AuthorController.create);

router
  .route("/:id")
  .patch([updateAuthor], AuthorController.update)
  .delete(AuthorController.delete);

module.exports = router;
