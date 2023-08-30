const { Book, Author, Category } = require("../models");
const path = require("path");
const fs = require("fs");
const addPicture = require('../helpers/addPicture')

exports.create = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    const author = await Author.findOne({ _id: req.body.authorId });
    if (!author)
      return res.status(404).send({ message: "Author is not found" });

    const category = await Category.findOne({ _id: req.body.categoryId });
    if (!category)
      return res.status(404).send({ message: "Category is not found" });

    const wholeBookInfo = {
      title,
      author,
      category,
      price,
      description,
    };

    const createBook = async () => {
      const book = await Book.create(wholeBookInfo);
      return res.send(book);
    };

    addPicture(req, wholeBookInfo, true);
    createBook();

  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const book = await Book.find({});
    return res.send(book);
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
    const wholeBookInfo = { ...req.body };

    if (req.files.imgURL) {
      const book = await Book.findOne({ _id: req.params.id });
      if (!book) return res.status(404).send({ message: "Book is not found" });

      const filePath = path.resolve(__dirname, `../upload/${book.imgURL}`);
      fs.unlink(filePath, () => {});

      addPicture(req, wholeBookInfo);
    }

    await Book.updateOne({ _id: req.params.id }, wholeBookInfo);
    return res.send({ message: "Book successfully updated" });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    if (!book) return res.status(404).send({ message: "Book is not found" });

    const filePath = path.resolve(__dirname, `../upload/${book.imgURL}`);
    const { deletedCount } = await Book.deleteOne({ _id: req.params.id });

    fs.unlink(filePath, () => {});

    if (!deletedCount)
      return res.status(404).send({ message: "Book hasn't been deleted" });
    return res.send({ message: "Book successfully deleted" });
  } catch (_) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};
