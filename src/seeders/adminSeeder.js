const bcrypt = require("bcrypt");
const SALT = 10;
const mongoose = require("mongoose");
const { User } = require("../models");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

const adminSeeder = async () => {
  const admins = [
    {
      name: "root",
      email: "sff@mail.ru",
      password: bcrypt.hashSync("123456", SALT),
      role: "ADMIN",
      lastLogin: 0,
    },
  ];

  await User.insertMany(admins);
};
adminSeeder();
