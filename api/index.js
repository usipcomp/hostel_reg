const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());

mongoose.connect(
  "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.bgnb6c9.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.json());

const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
});

app.post("/hostelreg/applications", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
