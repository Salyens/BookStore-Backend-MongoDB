const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 1, required: true },
    email: { type: String, unique: true, minlength: 1, required: true },
    password: { type: String, minlength: 6, required: true },
    lastLogin: { type: Number, required: true },
  },
  { versionKey: false }
);
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = { Admin, AdminSchema };
