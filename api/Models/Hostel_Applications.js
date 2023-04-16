const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationSchema = Schema(
  {
    roll_no: { type: String },
    name: { type: String },
    email: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    phone_no: { type: String },
    course: { type: String },
    branch: { type: String },
    semester: { type: String },
    back_papers: { type: Number },
    year_of_admission: { type: Number },
    distance: { type: Number },
    blood_group: {
      type: String,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    },
    region: { type: String, enum: ["Delhi", "Outside Delhi"] },
    sgpa: { type: Number },
    chronic_problems: { type: Array },
    preferences: { type: Array },
    father_name: { type: String },
    father_phone_no: { type: String },
    father_email: { type: String },
    father_occupation: { type: String },
    fathe_office_address: { type: String },
    father_office_no: { type: String },
    mother_name: { type: String },
    mother_phone_phone_no: { type: String },
    mother_email: { type: String },
    mother_occupation: { type: String },
    mother_office_address: { type: String },
    mother_office_phone_no: { type: String },
    acc_no: { type: String },
    acc_holder_name: { type: String },
    bank_name: { type: String },
    ifsc: { type: String },
    bank_branch: { type: String },
    bank_address: { type: String },
    home_address: { type: String },
    home_city: { type: String },
    home_state: { type: String },
    home_country: { type: String },
    home_pincode: { type: String },
    corr_address: { type: String },
    corr_city: { type: String },
    corr_state: { type: String },
    corr_country: { type: String },
    corr_pincode: { type: String },
    local_guardian_name: { type: String },
    local_guardian_address: { type: String },
    local_guardian_phone_no: { type: String },
    local_guardian_email: { type: String },
    sign: { type: String },
    discrepancy: { type: String },
    ProfilePic: { type: String },
    applicable:{
      type:Boolean,
      enum:[true,false],
      // default:true,
    }
  },
  { timestamps: true }
);
const Hostel_Applications = mongoose.model(
  "Hostel_Applications",
  ApplicationSchema
);
module.exports = Hostel_Applications;
