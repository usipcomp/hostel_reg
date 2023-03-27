import mongoose from "mongoose";

const { Schema } = mongoose;

const BedSchema = Schema({
  BedID: { type: Number },
  BedNo: { type: String },
  RoomNo: { type: Number },
  RoomType: {
    type: String,
    enum: ["1S", "2S", "3SAC", "3SNAC"],
  },
  HostelID: { type: Number },
  Occupancy: { type: Boolean, enum: [true, false], default: false },
  Floor: { type: Number },
  ApplicationID: { type: Number },
});
