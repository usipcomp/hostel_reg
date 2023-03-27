const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.bgnb6c9.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
