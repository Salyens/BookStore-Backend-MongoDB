const router = require("express").Router();
const categoryRouter = require("./CategoryRouter");
const authorRouter = require("./AuthorRouter");
const bookRouter = require("./BookRouter");
const adminRouter = require("./AdminRouter");

router.use("/admin", adminRouter);
router.use("/author", authorRouter);
router.use("/book", bookRouter);
router.use("/category", categoryRouter);
module.exports = router;
