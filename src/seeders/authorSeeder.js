const { Author } = require("../models");
const { faker } = require("@faker-js/faker");

const authorSeeder = async () => {
    const authors = Array.from({ length: 10 }, () => {
      const name = faker.person.firstName();
      return { name };
    });
  
    await Author.insertMany(authors);
    return authors;
  };

  module.exports = authorSeeder;