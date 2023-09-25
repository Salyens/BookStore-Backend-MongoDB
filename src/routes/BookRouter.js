const router = require("express").Router();
const BookController = require("@controllers/BookController");
const { createBook, updateBook } = require("@middlewares/book");
const { checkRole } = require("@middlewares/user");
const verifyToken = require("@middlewares/auth/verifyToken");

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
 *         - imgURL
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book.
 *         authorId:
 *           type: string
 *           description: The ID of the author of the book.
 *         categoryId:
 *           type: string
 *           description: The ID of the category of the book.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the book.
 *         description:
 *           type: string
 *           description: The description of the book.
 *         imgURL:
 *           type: string
 *           description: The URL of the image of the book.
 *           format: binary
 * tags:
 *   - name: Book
 *     description: Everything about Books
 * paths:
 *   /book:
 *     get:
 *       tags:
 *         - Book
 *       security:
 *         - bearerAuth: []
 *       summary: Get books
 *       responses:
 *         200:
 *           description: Returns the list of all books
 *           content:
 *             application/json:
 *               example:
 *                 - _id: "64feff86f18e04d1d3757262"
 *                   title: "Book Title"
 *                   authorId: "64feff86f18e04d1d3757263"
 *                   categoryId: "64feff86f18e04d1d3757264"
 *                   price: 20.00
 *                   description: "Description of the book."
 *                   imgURL: "http://example.com/img.jpg"
 *         400:
 *           description: Bad Request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong"
 *         404:
 *           description: Books not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "Books not found"
 *     post:
 *       tags:
 *         - Book
 *       security:
 *         - bearerAuth: []
 *       summary: Create a new book
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *         200:
 *           description: Book successfully created
 *           content:
 *             application/json:
 *               example:
 *                 _id: "64feff86f18e04d1d3757262"
 *                 title: "Book Title"
 *                 authorId: "64feff86f18e04d1d3757263"
 *                 categoryId: "64feff86f18e04d1d3757264"
 *                 price: 20.00
 *                 description: "Description of the book."
 *                 imgURL: "http://example.com/img.jpg"
 *         400:
 *           description: Bad Request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong"
 *         422:
 *           description: Unprocessable Entity
 *           content:
 *             application/json:
 *               example:
 *                 message: "Invalid book data"
 *   /book/{id}:
 *     patch:
 *       tags:
 *         - Book
 *       security:
 *         - bearerAuth: []
 *       summary: Update a book
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the book to update
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       responses:
 *         200:
 *           description: Book successfully updated
 *           content:
 *             application/json:
 *               example:
 *                 _id: "64feff86f18e04d1d3757262"
 *                 title: "Updated Book Title"
 *                 authorId: "64feff86f18e04d1d3757263"
 *                 categoryId: "64feff86f18e04d1d3757264"
 *                 price: 25.00
 *                 description: "Updated description of the book."
 *                 imgURL: "http://example.com/updated_img.jpg"
 *         400:
 *           description: Bad Request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong"
 *         404:
 *           description: Book not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "Book not found"
 *     delete:
 *       tags:
 *         - Book
 *       security:
 *         - bearerAuth: []
 *       summary: Delete a book
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the book to delete
 *       responses:
 *         200:
 *           description: Book successfully deleted
 *           content:
 *             application/json:
 *               example:
 *                 message: "Book successfully deleted"
 *         400:
 *           description: Bad Request
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong"
 *         404:
 *           description: Book not found
 *           content:
 *             application/json:
 *               example:
 *                 message: "Book not found"
 */


router
  .route("/")
  .get(BookController.getAll)
  .post([verifyToken, checkRole, createBook],BookController.create);

router
  .route("/:id")
  .patch([verifyToken, checkRole, updateBook], BookController.update)
  .delete([verifyToken, checkRole], BookController.delete);

module.exports = router;
