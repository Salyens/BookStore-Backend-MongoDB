const router = require("express").Router();
const BookController = require("@controllers/BookController");
const { createBook, updateBook } = require("@middlewares/book");
const { checkRole } = require("@middlewares/user");
const verifyToken = require("@middlewares/auth/verifyToken");

/**
 * @swagger
 * tags:
 *   - name: Book
 *     description: Everything about Books
 * 
 * /book:
 *   get:
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     summary: Get books
 *     responses:
 *       200:
 *         description: Returns the list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Books not found
 *       400:
 *         description: Error
 *   post:
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               imgURL:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - authorId
 *               - categoryId
 *               - price
 *               - description
 *               - imgURL
 *     responses:
 *       201:
 *         description: Book successfully created
 *       400:
 *         description: Validation error
 *
 * /book/{id}:
 *   patch:
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     summary: Update a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               price:
 *                 type: string
 *               description:
 *                 type: string
 *               imgURL:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error
 *
 *   delete:
 *     tags:
 *       - Book
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *       404:
 *         description: Book not found
 *       400:
 *         description: Deletion error
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
