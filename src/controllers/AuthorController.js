const { Author } = require("../models");

exports.create = async (req, res) => {
  try {
    const {
      body: { name },
    } = req;

    const trimmedName = name.trim();
    if (!trimmedName) return res.status(422).send({ message: "Invalid author's name" });
    const author = await Author.create({ name });
    return res.send(author);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const authors = await Author.find({});
    return res.send(authors);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
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

    await Author.updateOne({ _id: req.params.id }, body);
    return res.send({ message: "Author successfully updated" });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { deletedCount } = await Author.deleteOne({ _id: req.params.id });
    if (!deletedCount)
      return res.status(404).send({ message: "Author is not found" });
    return res.send({ message: "Author successfully deleted" });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};
