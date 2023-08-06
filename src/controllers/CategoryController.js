const { Category, Book } = require("../models");

exports.create = async (req, res) => {
  try {
    const {
      body: { name },
    } = req;

    const trimmedName = name.trim();
    if (!trimmedName)
      return res.status(422).send({ message: "Invalid category's name" });
    const category = await Category.create({ name });
    return res.send(category);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.send(categories);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = [];
    const { body } = req;
    if (body.hasOwnProperty("name") && !body.name) {
      errors.push("Category name shouldn't be empty");
    }
    if (body.hasOwnProperty("status") && typeof body.status !== "boolean") {
      errors.push("Wrong type of status");
    }

    if (errors.length) {
      return res.status(400).send({ errors });
    }

    await Category.updateOne({ _id: req.params.id }, body);
    await Book.updateMany(
      { "category._id": req.params.id },
      { $set: { category: body } }
    );

    return res.send({ message: "Category successfully updated" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { deletedCount } = await Category.deleteOne({ _id: req.params.id });
    if (!deletedCount)
      return res.status(404).send({ message: "Category is not found" });
    return res.send({ message: "Category successfully deleted" });
  } catch (e) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};
