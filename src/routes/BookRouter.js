const router = require("express").Router();
const BookController = require("../controllers/BookController");
router
  .route("/")
  .get(BookController.getAll)
  .post(BookController.create);

router
  .route("/:id")
  .patch(BookController.update)
  .delete(BookController.delete);

module.exports = router;