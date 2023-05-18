const mongoose = require("mongoose")

const { Schema } = mongoose;

const OpenCloseApplicationsSchema = Schema({
  acceptResponses: { type: Boolean },
});
const OpenCloseApplications = mongoose.model("opencloseapplications",OpenCloseApplicationsSchema)
module.exports = OpenCloseApplications;