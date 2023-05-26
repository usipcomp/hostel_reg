const mongoose = require("mongoose");

const { Schema } = mongoose;

const OccupancyHistorySchema = Schema({
  BedID: { type: String },
  StudentRollNo: { type: String },
  StudentYear: {
    type: Number,
  },
  FromDate: { type: Date },
  ToDate: { type: Date },
  ApplicationNumber: mongoose.Schema.ObjectId,
});
const Occupancy = mongoose.model("occupancy_history", OccupancyHistorySchema);
module.exports = Occupancy;
