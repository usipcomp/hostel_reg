const mongoose = require("mongoose");
const BedsInfo = require("../Assets/Beds.js");
const Beds = require("../Models/Beds");

var MONGOOSE_URL =
  "mongodb+srv://usipcompcentre2022august:usip123p1@cluster0.a82quus.mongodb.net/test";
mongoose.connect(MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedBeds = async () => {
  for (let i = 0; i < 10; i++) {
    const currentBed = BedsInfo[i];
    let yearsInfo = [];

    if (typeof currentBed.Year === "string") {
      yearsInfo = currentBed.Year.split(",");
      const newBed = new Beds({
        BedID: currentBed["SeatNo."],
        BedNo: currentBed.HID,
        RoomType: currentBed["Room Type"],
        Occupancy: false,
        Floor: currentBed.Floor,
        Gender: currentBed.Gender,
      });
      for (let i = 0; i < yearsInfo.length; i++) {
        newBed.Year.push(parseInt(yearsInfo[i]));
      }
      try {
        const savedBed = await newBed.save();
        console.log(savedBed);
      } catch (err) {
        console.log(err);
      }
    } else {
      const newBed = new Beds({
        BedID: currentBed["SeatNo."],
        BedNo: currentBed.HID,
        RoomType: currentBed["Room Type"],
        Occupancy: false,
        Floor: currentBed.Floor,
        Year: currentBed.Year,
        Gender: currentBed.Gender,
      });
      try {
        const savedBed = await newBed.save();
        console.log(savedBed);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database Connected");
  seedBeds();
});
