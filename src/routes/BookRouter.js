const router = require("express").Router();
const BookController = require("../controllers/BookController");
const { createBook, updateBook } = require("../middlewares/book");
const { checkRole } = require("../middlewares/user");
const verifyToken = require("../middlewares/auth/verifyToken");

router
  .route("/")
  .get(BookController.getAll)
  .post([verifyToken, checkRole, createBook], BookController.create);

router
  .route("/:id")
  .patch([verifyToken, checkRole, updateBook], BookController.update)
  .delete([verifyToken, checkRole], BookController.delete);

module.exports = router;