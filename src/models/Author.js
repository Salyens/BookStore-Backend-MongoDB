
/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *           description: The name of your author
 *         status:
 *           type: boolean
 *           description: Will author be displayed
 *       example:
 *         name: A.Pushkin
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
