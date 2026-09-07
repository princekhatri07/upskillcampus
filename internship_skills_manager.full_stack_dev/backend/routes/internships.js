const router = require("express").Router();
const Internship = require("../models/Internship");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const items = await Internship.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", auth, async (req, res) => {
  const item = await Internship.create({ ...req.body, user: req.userId });
  res.status(201).json(item);
});

router.put("/:id", auth, async (req, res) => {
  const item = await Internship.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Internship not found" });
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Internship.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  });
  if (!item) return res.status(404).json({ message: "Internship not found" });
  res.json({ message: "Internship deleted" });
});

module.exports = router;
