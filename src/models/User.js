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
