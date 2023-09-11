const mongoose = require("mongoose");
const { AuthorSchema } = require("./Author");
const { CategorySchema } = require("./Category");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, minlength: 1, required: true },
    author: {type: AuthorSchema},
    category: {type: CategorySchema},
    price: { type: String, minlength: 1, required: true },
    description: { type: String, minlength: 1, required: true },
    imgURL: { type: String, minlength: 1},
  },
  { versionKey: false }
);
const Book = mongoose.model("Book", BookSchema);
module.exports = { Book };
