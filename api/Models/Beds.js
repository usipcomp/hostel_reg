const mongoose = require("mongoose");

const { Schema } = mongoose;

const BedSchema = Schema({
  BedID: { type: String },
  HostelID: { type: String },
  RoomType: {
    type: String,
    enum: ["1S", "2S", "3SAC", "3SNAC"],
  },
  Occupancy: { type: Boolean, enum: [true, false], default: false },
  Floor: { type: String },
  ApplicationID: mongoose.Schema.ObjectId,
  Year: [{ type: Number }],
  Gender: { type: String, enum: ["Male", "Female"] },
});
const Beds = mongoose.model("beds", BedSchema);
module.exports = Beds;
