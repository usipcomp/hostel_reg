const mongoose = require("mongoose");

const { Schema } = mongoose;

const HostelSchema = new Schema({
  HostelID: { type: String },
  Name: { type: String },
  Type: {
    type: String,
    enum: ["B", "G"],
    default: "B",
  },
  oneS: { type: Number },
  twoS: { type: Number },
  threeSAC: { type: Number },
  threeSNAC: { type: Number },
});

const Hostel = mongoose.model("Hostel", HostelSchema);
module.exports = Hostel;
