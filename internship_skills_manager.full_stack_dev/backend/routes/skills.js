const router = require("express").Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Skill.find({ user: req.userId }).sort({ createdAt: -1 }));
});

router.post("/", auth, async (req, res) => {
  res.status(201).json(await Skill.create({ ...req.body, user: req.userId }));
});

router.put("/:id", auth, async (req, res) => {
  const item = await Skill.findOneAndUpdate(
    { _id: req.params.id, user: req.userId }, req.body, { new: true }
  );
  if (!item) return res.status(404).json({ message: "Skill not found" });
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Skill.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!item) return res.status(404).json({ message: "Skill not found" });
  res.json({ message: "Skill deleted" });
});

module.exports = router;
