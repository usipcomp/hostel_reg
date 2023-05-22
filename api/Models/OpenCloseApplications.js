const mongoose = require("mongoose")

const { Schema } = mongoose;

const OpenCloseApplicationsSchema = Schema({
  btechFourthYr: { type: Boolean },
  btechThirdYr: { type: Boolean },
  btechSecondYr: { type: Boolean },
  btechFirstYr: { type: Boolean },
  mtechThirdYr: { type: Boolean },
  mtechSecondYr: { type: Boolean },
  mtechFirstYr: { type: Boolean },
  acceptResponses:{type:Boolean}
});
const OpenCloseApplications = mongoose.model("opencloseapplications",OpenCloseApplicationsSchema)
module.exports = OpenCloseApplications;