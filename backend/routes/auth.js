const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Ensure you have this installed: npm install bcryptjs
const User = require("../models/User");

// Middleware Imports
const verifyCaptcha = require("../middleware/verifyCaptcha");
const auth = require("../middleware/auth"); 
// ==========================================
// 1. REGISTER USER
// ==========================================
router.post("/register", verifyCaptcha, async (req, res) => {
  try {
    const { name, email, password, role, gender, vehicle } = req.body;
    
    // Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // --- MANUAL PASSWORD HASHING ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ FIX: Now saves role and gender!
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword,
      role: role || "passenger",      // ✅ NEW
      gender: gender || "male",       // ✅ NEW
      driverDetails: {
        vehicle: vehicle || {}
      }
    });

    await user.save();

    // Generate Token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || "secret_key_123",
      { expiresIn: "7d" }
    );

    // ✅ FIX: Return full user data including role and gender
    return res.json({ 
      message: "Registered successfully", 
      token, 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,      // ✅ NEW
        gender: user.gender   // ✅ NEW
      } 
    });

  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
});
// ==========================================
// 2. LOGIN USER
// ==========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // --- MANUAL PASSWORD CHECK ---
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      process.env.JWT_SECRET || "secret_key_123", 
      { expiresIn: "7d" }
    );

  return res.json({ 
  message: "Logged in successfully", 
  token, 
  user: { 
    _id: user._id, 
    name: user.name, 
    email: user.email, 
    role: user.role,      // ✅ ADD
    gender: user.gender   // ✅ ADD
  } 
});

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// ==========================================
// 3. GET CURRENT USER (Protected)
// ==========================================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// PUT /api/auth/profile - Update User Profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { 
      name, phone, bio, avatar, // Basic
      cnic, dob,                // Verification
      driverDetails             // Car Info object
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update Basic Fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (cnic) user.cnic = cnic;
    if (dob) user.dob = dob;

    // Update Driver Details (Merge intelligently)
    if (driverDetails) {
      if (driverDetails.licenseNumber) user.driverDetails.licenseNumber = driverDetails.licenseNumber;
      
      if (driverDetails.vehicle) {
        user.driverDetails.vehicle = { 
          ...user.driverDetails.vehicle, 
          ...driverDetails.vehicle 
        };
      }
    }

    await user.save();
    
    // Return user without password
    const userPayload = user.toObject();
    delete userPayload.password;
    res.json(userPayload);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;