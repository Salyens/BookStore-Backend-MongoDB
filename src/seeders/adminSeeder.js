const dotenv = require("dotenv");
dotenv.config();
require("module-alias/register");
const bcrypt = require("bcrypt");
const SALT = 10;
const mongoose = require("mongoose");
const { User } = require("@models");

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
      email: "ssd34ff@mail.ru",
      password: bcrypt.hashSync("123456", SALT),
      role: "ADMIN",
      lastLogin: 0,
    },
  ];

  await User.insertMany(admins);
};

try {
  adminSeeder();
  console.log("Success");
} catch (error) {
  console.error(error);
}
