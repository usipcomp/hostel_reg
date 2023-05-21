const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs")

dotenv.config({path:__dirname+'/.env'});
app.use(cors());
var MONGOOSE_URL="mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.a82quus.mongodb.net/test";
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database Connected");
}); 
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{
    console.log(file)
    cb(null,file.originalname)
  }
})
const upload = multer({storage:storage});
app.get("/upload/:filename",(req,res)=>{
  const searchQuery = req.params.filename;
  const bufferdata = fs.readFileSync("./images/"+searchQuery)
  res.status(201).json({img:bufferdata});
})
// app.use("/",express.static(path.join(__dirname,"/images"),(req,res)=>{
//   console.log(__dirname)
// }))
// console.log(__dirname)

app.post("/upload",upload.single('image'),(req,res)=>{
  res.status(200).send("uploaded")
})
app.use("/hostelreg/applications/auth", require("./routes/auth"));

//Login
app.use("/hostelreg/login", require("./routes/login"));

//Hostels

app.use("/hostels", require("./routes/hostel"));

app.listen(4000, () => {
  console.log("Listening on Port 4000");
});
