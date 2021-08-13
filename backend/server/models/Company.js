const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyOwner: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  logo: { type: String },
  deals: [{ type: Schema.Types.ObjectId, ref: "Deal" }],
});

module.exports = mongoose.model("Company", CompanySchema);