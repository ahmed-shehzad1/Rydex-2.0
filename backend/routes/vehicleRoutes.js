const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isDriver = require("../middleware/isDriver"); // ✅ NEW
const Vehicle = require("../models/Vehicle");

// ✅ FIX: Only drivers can create vehicles
router.post("/", auth, isDriver, async (req, res) => {
  try {
    const vehicle = new Vehicle({
      owner: req.user._id,
      ...req.body
    });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET MY VEHICLES
router.get("/mine", auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user._id });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ FIX: Only drivers can update their vehicles
router.put("/:id", auth, isDriver, async (req, res) => {
  try {
    const updated = await Vehicle.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ FIX: Only drivers can delete their vehicles
router.delete("/:id", auth, isDriver, async (req, res) => {
  try {
    const deleted = await Vehicle.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;