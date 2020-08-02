const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useFindAndModify: true,
  },
  () => {
    console.log("Connected");
  }
);

// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
