const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    technologies: String,
    githubLink: String,
    liveLink: String,
    status: { type: String, default: "Completed" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
