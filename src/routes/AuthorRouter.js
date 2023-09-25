const router = require("express").Router();
const AuthorController = require("@controllers/AuthorController");
const { createAuthor, updateAuthor } = require("@middlewares/author");
const { checkRole } = require("@middlewares/user");
const verifyToken = require("@middlewares/auth/verifyToken");

/**
 * @swagger
 * tags:
 *   - name: Author
 *     description: Everything about Authors
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Author's name
 *         status:
 *           type: boolean
 *           description: Author's status
 * 
 * /author:
 *   get:
 *     tags:
 *       - Author
 *     security:
 *       - bearerAuth: []
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: Returns the list of all authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *             example:
 *               - _id: "64feff86f18e04d1d3757262"
 *                 name: "Author Name"
 *                 status: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *
 *   post:
 *     tags:
 *       - Author
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author successfully created
 *         content:
 *           application/json:
 *             example:
 *               _id: "65116495368459dbe880225e"
 *               name: "Author Name"
 *               status: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *       422:
 *         description: Unprocessable Entity
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid author's name"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *
 * /author/{id}:
 *   patch:
 *     tags:
 *       - Author
 *     security:
 *       - bearerAuth: []
 *     summary: Update an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Author successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *             example:
 *               _id: "64feff86f18e04d1d3757262"
 *               name: "Author Name"
 *               status: true
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Author not found"
 *
 *   delete:
 *     tags:
 *       - Author
 *     security:
 *       - bearerAuth: []
 *     summary: Delete an author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Author successfully deleted"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *       404:
 *         description: Author not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Author not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */


router
.route("/")
.get([verifyToken], AuthorController.getAll)
.post([verifyToken, checkRole, createAuthor],AuthorController.create);

router
  .route("/:id")
  .patch([verifyToken, checkRole, updateAuthor], AuthorController.update)
  .delete([verifyToken, checkRole], AuthorController.delete);

module.exports = router;
