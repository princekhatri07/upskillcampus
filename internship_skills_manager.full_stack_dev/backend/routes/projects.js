const router = require("express").Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Project.find({ user: req.userId }).sort({ createdAt: -1 }));
});

router.post("/", auth, async (req, res) => {
  res.status(201).json(await Project.create({ ...req.body, user: req.userId }));
});

router.put("/:id", auth, async (req, res) => {
  const item = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.userId }, req.body, { new: true }
  );
  if (!item) return res.status(404).json({ message: "Project not found" });
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Project.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!item) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
});

module.exports = router;
