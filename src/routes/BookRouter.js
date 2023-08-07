const router = require("express").Router();
const BookController = require("../controllers/BookController");
const { createBook, updateBook } = require("../middlewares/book");

router
  .route("/")
  .get(BookController.getAll)
  .post([createBook], BookController.create);

router
  .route("/:id")
  .patch([updateBook], BookController.update)
  .delete(BookController.delete);

module.exports = router;