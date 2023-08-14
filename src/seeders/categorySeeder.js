const { Category } = require("../models");
const { faker } = require("@faker-js/faker");


const categorySeeder = async () => {
    const categories = Array.from({ length: 10 }, () => {
      const name = faker.lorem.words();
      return { name };
    });
  
    await Category.insertMany(categories);
    return categories;
  };
  module.exports = categorySeeder;
