const router = require("express").Router();
const CategoryController = require("@controllers/CategoryController");
const { updateCategory, createCategory } = require("@middlewares/category");
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
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category.
 * 
 * tags:
 *   - name: Category
 *     description: Everything about Categories
 * 
 * paths:
 *   /category:
 *     get:
 *       tags:
 *         - Category
 *       security:
 *         - bearerAuth: []
 *       summary: Get all categories
 *       responses:
 *         200:
 *           description: Returns the list of all categories
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Category'
 *     post:
 *       tags:
 *         - Category
 *       security:
 *         - bearerAuth: []
 *       summary: Create a new category
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       responses:
 *         201:
 *           description: Category successfully created
 *         400:
 *           description: Validation error
 * 
 *   /category/{id}:
 *     patch:
 *       tags:
 *         - Category
 *       security:
 *         - bearerAuth: []
 *       summary: Update a category
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the category to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       responses:
 *         200:
 *           description: Category successfully updated
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Category'
 *         400:
 *           description: Validation error
 *     delete:
 *       tags:
 *         - Category
 *       security:
 *         - bearerAuth: []
 *       summary: Delete a category
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the category to delete
 *       responses:
 *         200:
 *           description: Category successfully deleted
 *         404:
 *           description: Category not found
 *         400:
 *           description: Deletion error
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
