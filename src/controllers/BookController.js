const { Book, Author, Category } = require("../models");
const path = require("path");
const util = require("util");
const fs = require("fs");
const addPicture = require("../helpers/addPicture");

exports.create = async (req, res) => {
  try {
    let mimeType;
    let filePath;
    let fileName;
    const author = await Author.findOne({ _id: req.body.authorId });
    if (!author)
      return res.status(404).send({ message: "Author is not found" });

    const category = await Category.findOne({ _id: req.body.categoryId });
    if (!category)
      return res.status(404).send({ message: "Category is not found" });

    const { imgURL } = req.files;
    if (imgURL) {
      mimeType = imgURL.mimetype.split("/")[1];
      const imageBuffer = Buffer.from(imgURL.data, "base64");

      const rootDirectory = path.resolve(__dirname, "..");
      const uploadDir = rootDirectory + "/uploads";
      fileName = Date.now() + "." + mimeType;
      filePath = path.resolve(uploadDir, fileName);

      const a = await util.promisify(fs.writeFile)(filePath, imageBuffer);
      console.log(a);
    }
    const wholeBookInfo = { ...req.body, imgURL: fileName };

    const book = await Book.create(wholeBookInfo);
    return res.send(book);
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
    const fileName = addPicture(req.files.imgURL);
    const wholeBookInfo = { ...req.body, imgURL: fileName };

    await Book.updateOne({ _id: req.params.id }, wholeBookInfo);
    return res.send({ message: "Book successfully updated" });
  } catch (_) {
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
