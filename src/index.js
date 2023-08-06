const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes');
const app = express();

dotenv.config();
app.use(express.json());

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
