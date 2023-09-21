const { Author, Book } = require("@models");

exports.create = async (req, res) => {
  try {
    const author = await Author.create(req.body);
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
    const authorId = req.params.id;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).send({ message: "Author not found" });
    }
    
    await Author.updateOne({ _id: authorId }, req.body);
    await Book.updateMany(
      { "category._id": authorId },
      { $set: { "category.name": req.body.name, "category.status": req.body.status } }
    );
    
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
