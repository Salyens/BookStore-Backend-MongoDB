const { Book, Author, Category } = require("../models");


exports.create = async (req, res) => {
  try {
    const {
      body: { title, authorId, categoryId, price, description, imgURL },
    } = req;
    const errors = [];

    const author = await Author.findOne({_id: authorId});
    if(!author) return res.status(404).send({ message: "Author is not found" });

    const category = await Category.findOne({_id: categoryId});
    if(!category) return res.status(404).send({ message: "Category is not found" });

    const trimmedTitle = title.trim();
    if (!trimmedTitle) errors.push('Invalid title');

    const trimmedDescription = description.trim();
    if (!trimmedDescription) errors.push('Invalid description');
    
    if(typeof price !== 'number' || price < 0) errors.push('Invalid price');

    if (errors.length) {
      return res.status(400).send({ errors });
    }

    const book = await Book.create({ title, author, category, price, description, imgURL });
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
  } catch (e) {
    console.log(e);
    return res.status(400).send({ message: "Something is wrong" });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = [];
    const { body } = req;
    if (body.hasOwnProperty("name") && !body.title) {
      errors.push("Book title shouldn't be empty");
    }
    if (body.hasOwnProperty("author") && !body.author) {
      errors.push("Book author shouldn't be empty");
    }
    if (body.hasOwnProperty("price") && !body.price) {
      errors.push("Book price shouldn't be empty");
    }
    if (body.hasOwnProperty("description") && !body.description) {
      errors.push("Book description shouldn't be empty");
    }
    if (body.hasOwnProperty("imgURL") && !body.imgURL) {
      errors.push("Book imgURL shouldn't be empty");
    }

    if (errors.length) {
      return res.status(400).send({ errors });
    }

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