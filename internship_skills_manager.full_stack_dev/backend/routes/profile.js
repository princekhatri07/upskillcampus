const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

router.put("/", auth, async (req, res) => {
  const allowed = ["name", "bio", "phone", "github", "linkedin"];
  const updates = {};

  allowed.forEach((key) => {
    if (req.body[key] !== undefined) updates[key] = req.body[key];
  });

  const user = await User.findByIdAndUpdate(req.userId, updates, {
    new: true
  }).select("-password");

  res.json(user);
});

module.exports = router;
