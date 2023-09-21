/**
 * @swagger
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
 */

const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, minlength: 1, required: true },
    status: { type: Boolean, default: true },
  },
  { versionKey: false }
);
const Author = mongoose.model("Author", AuthorSchema);
module.exports = { Author, AuthorSchema };
