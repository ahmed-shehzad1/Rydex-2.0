const express = require("express");
const router = express.Router();
const Route = require("../models/Route");
const auth = require("../middleware/auth");
const isDriver = require("../middleware/isDriver");

// --- HELPER: Distance Calculator ---
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// ==========================================
// 1. CREATE ROUTE (BOTH DRIVERS & PASSENGERS)
// ==========================================
router.post("/", auth, async (req, res) => {
  try {
    const {
      coordinates,
      role,
      date,
      name,
      vehicle,
      seats,
      femaleOnly
    } = req.body;

    // ✅ NEW: VALIDATION - Check if user is trying to create driver route but isn't a driver
    if (role === "driver" && req.user.role !== "driver") {
      return res.status(403).json({ 
        message: "Only registered drivers can create driver routes. Switch to driver role in your profile." 
      });
    }

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
      return res.status(400).json({ message: "Valid coordinates are required." });
    }

    const startPoint = coordinates[0];
    const endPoint = coordinates[coordinates.length - 1];

    const newRoute = new Route({
      owner: req.user._id,
      role: role || "passenger",
      date: date || new Date(),
      coordinates,
      name: name || "My Route",
      vehicle: vehicle || {},
      seats: seats || (role === "driver" ? 4 : 0),
      femaleOnly: femaleOnly || false,
      start: startPoint,
      destination: endPoint
    });

    const savedRoute = await newRoute.save();
    res.status(201).json(savedRoute);

  } catch (err) {
    console.error("Error creating route:", err);
    res.status(500).json({ message: "Server Error" });
  }
});
// ==========================================
// 2. FIND MATCHES - FIXED WITH GENDER
// ==========================================
router.post("/match", auth, async (req, res) => {
  try {
    const myRoute = await Route.findOne({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .populate("owner", "name email avatar gender role");
    
    if (!myRoute) {
      return res.status(404).json({ message: "No route found. Please post a route first." });
    }

    const targetRole = myRoute.role === 'driver' ? 'passenger' : 'driver';

    // ✅ FIX: Populate with gender field
    const candidates = await Route.find({ 
      role: targetRole,
      start: { $exists: true },
      destination: { $exists: true }
    }).populate('owner', 'name email avatar gender role vehicle').limit(100);

    const matches = candidates.filter(candidate => {
      const startDist = getDistanceFromLatLonInKm(
        myRoute.start[1], myRoute.start[0],
        candidate.start[1], candidate.start[0]
      );

      const destDist = getDistanceFromLatLonInKm(
        myRoute.destination[1], myRoute.destination[0],
        candidate.destination[1], candidate.destination[0]
      );

      return startDist < 15 && destDist < 15;
    });

    res.json(matches);

  } catch (err) {
    console.error("Error matching routes:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ==========================================
// 3. JOIN & LEAVE & REQUESTS
// ==========================================

// A. REQUEST TO JOIN
router.post("/:id/join", auth, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });

    if (route.passengers.includes(req.user._id) || route.requests.includes(req.user._id)) {
      return res.status(400).json({ message: "You have already requested or joined this ride" });
    }

    if (route.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot join your own route" });
    }

    route.requests.push(req.user._id);
    await route.save();

    res.json({ message: "Request sent to driver" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// B. ACCEPT REQUEST
router.post("/:id/accept/:userId", auth, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    
    if (!route) return res.status(404).json({ message: "Route not found" });

    if (route.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userIdToAccept = req.params.userId;

    // ✅ Only check seats if the route owner is a DRIVER
    if (route.role === "driver" && route.passengers.length >= route.seats) {
      return res.status(400).json({ message: "Car is full!" });
    }

    route.requests = route.requests.filter(id => id.toString() !== userIdToAccept);
    
    if (!route.passengers.includes(userIdToAccept)) {
      route.passengers.push(userIdToAccept);
    }
    
    await route.save();
    res.json({ message: "Connected successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// C. REJECT REQUEST (Driver Only)
router.post("/:id/reject/:userId", auth, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    
    if (!route) return res.status(404).json({ message: "Route not found" });

    if (route.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    route.requests = route.requests.filter(id => id.toString() !== req.params.userId);
    
    await route.save();
    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// D. LEAVE ROUTE (For passengers who want to cancel)
router.post("/:id/leave", auth, async (req, res) => {
  try {
      const route = await Route.findById(req.params.id);
      if (!route) return res.status(404).json({ message: "Route not found" });

      route.passengers = route.passengers.filter(id => id.toString() !== req.user._id.toString());
      route.requests = route.requests.filter(id => id.toString() !== req.user._id.toString());
      
      await route.save();
      res.json({ message: "You left the route" });
  } catch (err) {
      res.status(500).json({ message: "Server Error" });
  }
});
// ==========================================
// 4. UTILITY ROUTES
// ==========================================

// GET ALL ROUTES (For the Map)
router.get("/", async (req, res) => {
  try {
    // ✅ FIX: Now populating owner with GENDER field
    const routes = await Route.find()
      .populate("owner", "name vehicle role avatar gender")  // ✅ Added gender
      .populate("requests", "name email avatar _id gender")
      .populate("passengers", "name email avatar _id gender")
      .limit(50);
      
    res.json(routes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET MY ROUTES (For Dashboard)
router.get("/mine/list", auth, async (req, res) => {
  try {
    // ✅ FIX: Now populating with gender
    const owned = await Route.find({ owner: req.user._id })
      .populate("requests", "name email avatar _id gender")
      .populate("passengers", "name email avatar _id gender")
      .sort({ createdAt: -1 });

    const joined = await Route.find({ passengers: req.user._id })
      .populate('owner', 'name vehicle avatar gender role')  // ✅ Added gender
      .sort({ createdAt: -1 });

    res.json({ owned, joined });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
// ==========================================
// 5. DELETE A ROUTE (Owner Only)
// ==========================================
router.delete("/:id", auth, async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    if (route.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this route" });
    }

    await route.deleteOne();
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
