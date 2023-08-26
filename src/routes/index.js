const router = require("express").Router();
const categoryRouter = require("./CategoryRouter");
const authorRouter = require("./AuthorRouter");
const bookRouter = require("./BookRouter");
const userRouter = require("./UserRouter");

router.use("/user", userRouter);
router.use("/author", authorRouter);
router.use("/book", bookRouter);
router.use("/category", categoryRouter);
module.exports = router;
