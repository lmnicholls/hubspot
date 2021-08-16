const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  owner: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String },
  state_region: { type: String },
  postalCode: { type: String },
  logo: { type: String },
  industry: { type: String },
  dateCreated: {
    type: Date,
    default: new Date(),
    required: true,
    immutable: true,
  },
  lastActivityDate: { type: Date, default: new Date(), required: true },
  deals: [{ type: Schema.Types.ObjectId, ref: "Deal" }],
});

module.exports = mongoose.model("Company", CompanySchema);
