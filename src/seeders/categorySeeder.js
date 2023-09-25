const dotenv = require("dotenv");
dotenv.config();
require("module-alias/register");
const { Category } = require("../models");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

const categorySeeder = async () => {
    const categories = Array.from({ length: 10 }, () => {
      const name = faker.lorem.words();
      return { name };
    });
    console.log(categories);

    await Category.insertMany(categories);
    return categories;
  };

  try {
    categorySeeder();
    console.log("Success");
  } catch (error) {
    console.error(error);
  }
  module.exports = categorySeeder;
