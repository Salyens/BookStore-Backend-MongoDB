const { IMG_WHITE_LIST } = require("@constants");

const createBook = (req, res, next) => {
  const {
    body: { title, price, description, imgURL },
  } = req;
  const errors = [];

  const trimmedTitle = title.trim();
  if (!trimmedTitle) errors.push("Invalid title");

  const trimmedDescription = description.trim();
  if (!trimmedDescription) errors.push("Invalid description");
  if (!Boolean(Number(price))) errors.push("Invalid price");

  if (req.files && req.files.imgURL) {
    if(!IMG_WHITE_LIST.includes(req.files.imgURL.mimetype)) errors.push("Invalid mimetype");
  }

  if (errors.length) {
    return res.status(400).send({ errors });
  }
  return next();
};
module.exports = createBook;
