import mongoose from "mongoose";

const { Schema } = mongoose;

const HostelSchema = new Schema({
  HostelID: [{ type: Number }],
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
