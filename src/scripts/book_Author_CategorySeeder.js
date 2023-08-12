const bcrypt = require("bcrypt");
const SALT = 10;
const mongoose = require("mongoose");
const { Book, Author, Category } = require("../models");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

dotenv.config();

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

const categorySeeder = async () => {
  const categories = Array.from({ length: 10 }, () => {
    const name = faker.lorem.words();
    return { name };
  });

  await Category.insertMany(categories);
  return categories;
};

const bookSeeder = async () => {
  const categories = await categorySeeder();
  const authors = await authorSeeder();

  const books = Array.from({ length: 100 }, () => {
    const categoryRandomIndex = Math.floor(Math.random() * 9);
    const authorsRandomIndex = Math.floor(Math.random() * 9);

    const title = faker.lorem.sentence();
    const author = authors[authorsRandomIndex];
    const category = categories[categoryRandomIndex];
    const price = Math.floor(Math.random() * 100 + 1);
    const description = faker.lorem.paragraph();

    return { title, author, category, price, description };
  });

  await Book.insertMany(books);
};

try {
  bookSeeder();
  console.log("Success");
} catch (error) {
  console.error(error);
}
