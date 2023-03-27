import mongoose from "mongoose";

const { Schema } = mongoose;

const PriceSchema = Schema({
  Type: { type: String, enum: ["1S", "2S", "3SAC", "3SNAC"] },
  Price: { type: Number },
});
