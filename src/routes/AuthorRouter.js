const router = require("express").Router();
const AuthorController = require("../controllers/AuthorController");
const { createAuthor, updateAuthor } = require("../middlewares/author");
const verifyToken = require("../middlewares/auth/verifyToken");

router
  .route("/")
  .get(AuthorController.getAll)
  .post([verifyToken, createAuthor], AuthorController.create);

router
  .route("/:id")
  .patch([verifyToken, updateAuthor], AuthorController.update)
  .delete(AuthorController.delete);

module.exports = router;
