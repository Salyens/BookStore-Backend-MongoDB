const { Book, Author, Category } = require("../models");
const path = require("path");
const util = require("util");
const fs = require("fs");
const addPicture = require("../helpers/addPicture");

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
      description
    };

    const addImgURL = async() => {
      const { imgURL } = req.files;
      const mimeType = imgURL.mimetype.split("/")[1];
      const imageBuffer = Buffer.from(imgURL.data, "base64");

      const folderName = "upload";
      const folderPath = path.resolve(__dirname, `../${folderName}`);

      const subFolderName = "book_pictures";
      const subFolderPath = path.resolve(folderPath, subFolderName);

      const fileName = Date.now() + "." + mimeType;
      const filePath = path.resolve(subFolderPath, fileName);

      let folderExists = false;

      const checkExistUpload = async () => {
        fs.access(folderPath, fs.constants.F_OK, (err) => {
          if (!err) folderExists = true;
        });
      };

      const createFolders = async () => {
        fs.mkdir(folderPath, () => {});
        fs.mkdir(subFolderPath, () => {});
      };

      checkExistUpload();
      if (!folderExists) createFolders();

      wholeBookInfo['imgURL'] = `/${subFolderName}/${fileName}`;
      await util.promisify(fs.writeFile)(filePath, imageBuffer);
    }
    
    const createBook = async() => {
      const book = await Book.create(wholeBookInfo);
      return res.send(book);
    }

    addImgURL();
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
