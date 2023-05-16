const mongoose = require("mongoose")

const { Schema } = mongoose;

const AdminsSchema = Schema({
  AdminID: { type: Number },
  Password: { type: String },
});
const Admins = mongoose.model("admins",AdminsSchema)
module.exports = Admins;