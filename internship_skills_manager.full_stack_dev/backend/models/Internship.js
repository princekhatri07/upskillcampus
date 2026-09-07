const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: String,
    endDate: String,
    status: {
      type: String,
      enum: ["Applied", "Ongoing", "Completed", "Rejected"],
      default: "Applied"
    },
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
