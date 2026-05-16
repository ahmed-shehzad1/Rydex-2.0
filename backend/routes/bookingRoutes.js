const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");
const Route = require("../models/Route");

// CREATE BOOKING REQUEST
router.post("/:routeId", auth, async (req, res) => {
  try {
    const route = await Route.findById(req.params.routeId);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    const existing = await Booking.findOne({
      route: route._id,
      passenger: req.user._id
    });

    if (existing) {
      return res.status(400).json({ message: "Already requested" });
    }

    const booking = new Booking({
      route: route._id,
      passenger: req.user._id
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET MY BOOKINGS
router.get("/mine", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user._id })
      .populate("route")
      .populate("passenger", "name email");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ACCEPT BOOKING
router.put("/:id/accept", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("route");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.route.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "accepted";
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;