const router = require("express").Router();
const categoryRouter = require('./CategoryRouter')
const authorRouter = require('./AuthorRouter')
const bookRouter = require('./BookRouter')

router.use('/author', authorRouter);
router.use('/book', bookRouter);
router.use('/category', categoryRouter);
module.exports = router;