const mongoose = require("mongoose");
const { AuthorSchema } = require("../models/Author");
const { CategorySchema } = require("../models/Category");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, minlength: 1, required: true },
    author: {type: AuthorSchema},
    category: {type: CategorySchema},
    price: { type: Number, minlength: 1, required: true },
    description: { type: String, minlength: 1, required: true },
    imgURL: { type: String, minlength: 1, required: true },
  },
  { versionKey: false }
);
const Book = mongoose.model("Book", BookSchema);
module.exports = { Book };
