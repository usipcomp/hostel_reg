const mongoose = require("mongoose");

const { Schema } = mongoose;

const OccupancyHistorySchema = Schema({
  BedID: { type: Number },
  StudentRollNo: { type: String },
  StudentYear: {
    type: Number,
  },
  FromDate: { type: Date },
  ToDate: { type: Date },
  ApplicationNumber: { type: Number },
});
const Occupancy = mongoose.model("occupancy_history",OccupancyHistorySchema);
module.exports = Occupancy;