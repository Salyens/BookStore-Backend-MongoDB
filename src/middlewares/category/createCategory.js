const createCategory = (req, res, next) => {
  const {
    body: { name },
  } = req;

  const trimmedName = name.trim();
  if (!trimmedName)
    return res.status(422).send({ message: "Invalid category's name" });
    return next();
};
module.exports = createCategory;
