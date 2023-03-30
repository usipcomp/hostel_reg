const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const Student = require("./Models/Student");
const session = require("express-session");
const MongoStore = require("connect-mongo");

dotenv.config();
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.MONGO_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGOOSE_URL,
      ttl: 12 * 60 * 60,
    }),
  })
);

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
});

app.post("/applications", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//Login

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
