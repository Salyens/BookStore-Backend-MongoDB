const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 1, required: true },
    status: { type: Boolean, default: true },
  },
  { versionKey: false }
);
const Author = mongoose.model("Author", AuthorSchema);
module.exports = {Author, AuthorSchema};
