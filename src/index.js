const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

const staticAssetsPath = path.join(__dirname, './upload');


dotenv.config();
app.use(express.json());
app.use(express.static(staticAssetsPath));
app.use(fileUpload({}));

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

app.use(routes);
