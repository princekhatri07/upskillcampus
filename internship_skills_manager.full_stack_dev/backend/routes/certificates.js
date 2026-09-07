const router = require("express").Router();
const Certificate = require("../models/Certificate");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.json(await Certificate.find({ user: req.userId }).sort({ createdAt: -1 }));
});

router.post("/", auth, async (req, res) => {
  res.status(201).json(await Certificate.create({ ...req.body, user: req.userId }));
});

router.put("/:id", auth, async (req, res) => {
  const item = await Certificate.findOneAndUpdate(
    { _id: req.params.id, user: req.userId }, req.body, { new: true }
  );
  if (!item) return res.status(404).json({ message: "Certificate not found" });
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  const item = await Certificate.findOneAndDelete({
    _id: req.params.id, user: req.userId
  });
  if (!item) return res.status(404).json({ message: "Certificate not found" });
  res.json({ message: "Certificate deleted" });
});

module.exports = router;
