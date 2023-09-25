/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authorId
 *         - categoryId
 *         - price
 *         - description
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         authorId:
 *           type: string
 *           description: ID of the author of the book
 *         categoryId:
 *           type: string
 *           description: ID of the book's category
 *         price:
 *           type: string
 *           description: Price of the book
 *         description:
 *           type: string
 *           description: Description of the book
 *         imgURL:
 *           type: string
 *           format: binary
 *           description: Image file for the book cover
 */

const mongoose = require("mongoose");
const { AuthorSchema } = require("./Author");
const { CategorySchema } = require("./Category");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, minlength: 1, required: true },
    author: { type: AuthorSchema },
    category: { type: CategorySchema },
    price: { type: String, minlength: 1, required: true },
    description: { type: String, minlength: 1, required: true },
    imgURL: { type: String, minlength: 1 },
  },
  { versionKey: false }
);
const Book = mongoose.model("Book", BookSchema);
module.exports = { Book };
