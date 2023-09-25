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
 *           description: Category name
 *         status:
 *           type: boolean
 *           description: Category status
 */

const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, minlength: 1, required: true },
    status: { type: Boolean, default: true },
  },
  { versionKey: false }
);
const Category = mongoose.model("Category", CategorySchema);
module.exports = { Category, CategorySchema };
