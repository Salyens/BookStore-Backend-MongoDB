/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: The user's email address.
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: examplePassword
 *         role:
 *           type: string
 *           description: The user's role. Default is "USER".
 *           example: USER
 *         lastLogin:
 *           type: object
 *           description: The timestamp of the user's last login.
 *           example: 0
 */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 1, required: true },
    email: { type: String, unique: true, minlength: 1, required: true },
    password: { type: String, minlength: 8, required: true },
    role: { type: String, default: "USER", required: true },
    lastLogin: { type: Object, required: true, default: 0 },
  },
  { versionKey: false }
);
const User = mongoose.model("User", UserSchema);
module.exports = { User, UserSchema };
