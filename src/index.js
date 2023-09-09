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

app.use(express.json());
app.use(express.static(staticAssetsPath));
app.use(fileUpload({}));
app.use(routes);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Book Store API",
      version: "0.1.0",
      description: "This is a simple CRUD API for Book Store",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/AuthorRouter.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

app.listen(process.env.PORT, () =>
  console.log(`App is listening port ${process.env.port}`)
);
