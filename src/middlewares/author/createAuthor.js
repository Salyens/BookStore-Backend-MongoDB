const { validationError } = require("@helpers/messages");

const createAuthor = (req, res, next) => {
  const {
    body: { name },
  } = req;

  const trimmedName = name.trim();
  if (!trimmedName)
    return res.status(422).send({ message: validationError("author", "name") });
  return next();
};
module.exports = createAuthor;
