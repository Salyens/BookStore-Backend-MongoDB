const { Book, Author, Category } = require("../models");

exports.create = async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.body.authorId });
    if (!author)
      return res.status(404).send({ message: "Author is not found" });

    const category = await Category.findOne({ _id: req.body.categoryId });
    if (!category)
      return res.status(404).send({ message: "Category is not found" });

    const wholeBookInfo = {
      title: req.body.title,
      author,
      category,
      price: req.body.price,
      description: req.body.description,
    };

    const book = await Book.create(wholeBookInfo);
    return res.send(book);
  } catch (_) {
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
    await Book.updateOne({ _id: req.params.id }, body);
    return res.send({ message: "Book successfully updated" });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.delete = async (req, res) => {
  try {
    const { deletedCount } = await Book.deleteOne({ _id: req.params.id });
    if (!deletedCount)
      return res.status(404).send({ message: "Book is not found" });
    return res.send({ message: "Book successfully deleted" });
  } catch (e) {
    return res.status(400).send({ message: "Something is wrong" });
  }
};
