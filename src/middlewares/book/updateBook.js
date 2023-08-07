const updateBook = (req, res, next) => {
    const errors = [];
    const { body } = req;
    if (body.hasOwnProperty("name") && !body.title) {
      errors.push("Book title shouldn't be empty");
    }
    if (body.hasOwnProperty("author") && !body.author) {
      errors.push("Book author shouldn't be empty");
    }
    if (body.hasOwnProperty("price") && !body.price) {
      errors.push("Book price shouldn't be empty");
    }
    if (body.hasOwnProperty("description") && !body.description) {
      errors.push("Book description shouldn't be empty");
    }
    if (body.hasOwnProperty("imgURL") && !body.imgURL) {
      errors.push("Book imgURL shouldn't be empty");
    }
    if (errors.length) {
      return res.status(400).send({ errors });
    }
    return next();
}
module.exports = updateBook;