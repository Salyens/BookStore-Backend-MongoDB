const dotenv = require("dotenv");
dotenv.config();
require("module-alias/register");
const mongoose = require("mongoose");
const { Book } = require("@models");
const { faker } = require("@faker-js/faker");
const categorySeeder = require("./categorySeeder");
const authorSeeder = require("./authorSeeder");


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

const bookSeeder = async () => {
  const categories = await categorySeeder();
  const authors = await authorSeeder();

  const books = Array.from({ length: 10 }, () => {
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
