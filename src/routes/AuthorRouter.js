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
 *       201:
 *         description: Author successfully created
 *       400:
 *         description: Validation error
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
 *       400:
 *         description: Validation error
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
 *       404:
 *         description: Author not found
 *       400:
 *         description: Deletion error
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
