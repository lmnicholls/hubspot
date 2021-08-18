const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealSchema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  stage: {
    status: { type: String, required: true },
    lastActivity: { type: Date, default: new Date() },
  },
  stageHistory: [{ type: String }],
  amount: { type: Number, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  dateCreated: {
    type: Date,
    default: new Date(),
    required: true,
    immutable: true,
  },
  lastActivityDate: { type: Date, default: new Date(), required: true },
  expectedCloseDate: { type: Date },
});

module.exports = mongoose.model("Deal", DealSchema);
