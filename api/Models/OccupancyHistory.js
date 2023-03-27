import mongoose from "mongoose";

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
