const dotenv = require("dotenv");
dotenv.config();
require("module-alias/register");
const { Author } = require("@models");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

const authorSeeder = async () => {
    const authors = Array.from({ length: 10 }, () => {
      const name = faker.person.firstName();
      return { name };
    });
  
    await Author.insertMany(authors);
    return authors;
  };

  try {
    authorSeeder();
    console.log("Success");
  } catch (error) {
    console.error(error);
  }
  

  module.exports = authorSeeder;