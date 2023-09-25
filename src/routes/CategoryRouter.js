const router = require("express").Router();
const CategoryController = require("@controllers/CategoryController");
const { updateCategory, createCategory } = require("@middlewares/category");
const { checkRole } = require("@middlewares/user");
const verifyToken = require("@middlewares/auth/verifyToken");

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Everything about Categories
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Category's name
 *         status:
 *           type: boolean
 *           description: Category's status
 * 
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Returns the list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               - _id: "64feff86f18e04d1d3757262"
 *                 name: "Category Name"
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
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             example:
 *               _id: "65116495368459dbe880225e"
 *               name: "Category Name"
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
 *               message: "Invalid category's name"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 *
 * /category/{id}:
 *   patch:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Update a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               _id: "64feff86f18e04d1d3757262"
 *               name: "Category Name"
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
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Category not found"
 *
 *   delete:
 *     tags:
 *       - Category
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category successfully deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Category successfully deleted"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Category not found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */

router
  .route("/")
  .get([verifyToken], CategoryController.getAll)
  .post([verifyToken, checkRole, createCategory], CategoryController.create);

router
  .route("/:id")
  .patch([verifyToken, checkRole, updateCategory], CategoryController.update)
  .delete([verifyToken, checkRole], CategoryController.delete);

module.exports = router;
