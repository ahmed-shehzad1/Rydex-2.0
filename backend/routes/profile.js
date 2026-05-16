const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// GET /api/profile (protected)
router.get("/", auth, async (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/profile (protected) - update profile
router.put("/", auth, async (req, res) => {
  try {
    const { name, vehicle, role } = req.body;
    const allowed = {};
    if (typeof name === "string") allowed.name = name;
    if (role === "driver" || role === "passenger") allowed.role = role;
    if (vehicle && typeof vehicle === "object") allowed.vehicle = vehicle;

    const updated = await User.findByIdAndUpdate(req.user._id, { $set: allowed }, { new: true }).select("-password");
    res.json({ user: updated });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;