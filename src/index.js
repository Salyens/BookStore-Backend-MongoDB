const dotenv = require("dotenv");
dotenv.config();
require("module-alias/register");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const staticAssetsPath = path.join(__dirname, "./upload");


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Bookstore - OpenAPI",
      version: "1.0.0",
      description: "This project, entitled 'BookStore,' serves as a comprehensive platform managing various elements related to books. It utilizes robust technologies to efficiently handle operations concerning authors, categories, books, and users. Users can register, log in, and update their profiles, ensuring personalized experiences. The application is meticulously crafted, emphasizing user-friendly interactions and straightforward navigation. It's implemented using Swagger for seamless API integration, offering precise insights into each API’s functionality. The detailed categorization aids in effortless exploration and management of books and authors, optimizing the user's journey in discovering and handling literary resources."
    },
    externalDocs: {
      description: "Find this project on GitHub",
      url: "https://github.com/Salyens/BookStore-Backend-MongoDB"
    },
  },
  apis: [
    path.join(__dirname, "./models/Author.js"),
    path.join(__dirname, "./routes/AuthorRouter.js"),
    path.join(__dirname, "./models/Category.js"),
    path.join(__dirname, "./routes/CategoryRouter.js"),
    path.join(__dirname, "./models/Book.js"),
    path.join(__dirname, "./routes/BookRouter.js"),
    path.join(__dirname, "./models/User.js"),
    path.join(__dirname, "./routes/UserRouter.js"),
  ],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.static(staticAssetsPath));
app.use(fileUpload({}));
app.use(routes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

app.listen(process.env.PORT, () =>
  console.log(`App is listening port ${process.env.PORT}`)
);
