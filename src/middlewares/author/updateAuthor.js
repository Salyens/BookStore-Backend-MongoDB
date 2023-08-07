const { validationError } = require("../../helpers/messages");

const updateAuthor = (req, res, next) => {
  const errors = [];
  const { body } = req;

  if (body.hasOwnProperty("name") && !body.name) {
    errors.push("Author name shouldn't be empty");
  }
  if (body.hasOwnProperty("status") && typeof body.status !== "boolean") {
    errors.push("Wrong type of status");
  }

  if (errors.length) {
    return res.status(400).send({ errors });
  }
  return next();
};
module.exports = updateAuthor;
