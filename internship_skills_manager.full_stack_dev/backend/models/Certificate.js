const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    organization: String,
    date: String,
    link: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
