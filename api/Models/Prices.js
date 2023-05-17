const mongoose = require("mongoose")

const { Schema } = mongoose;

const PriceSchema = Schema({
  Type: { type: String, enum: ["1S", "2S", "3SAC", "3SNAC"] },
  Price: { type: Number },
});
const Prices = mongoose.model("prices",PriceSchema);
module.exports = Prices;