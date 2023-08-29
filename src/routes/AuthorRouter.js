const router = require("express").Router();
const AuthorController = require("../controllers/AuthorController");
const { createAuthor, updateAuthor } = require("../middlewares/author");
const { checkRole } = require("../middlewares/user");
const verifyToken = require("../middlewares/auth/verifyToken");

router
  .route("/")
  .get(AuthorController.getAll)
  .post( [ verifyToken, checkRole, createAuthor], AuthorController.create);

router
  .route("/:id")
  .patch([verifyToken, checkRole, updateAuthor], AuthorController.update)
  .delete([verifyToken, checkRole], AuthorController.delete);

module.exports = router;
