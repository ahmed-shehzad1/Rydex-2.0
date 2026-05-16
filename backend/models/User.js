const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // --- 1. PUBLIC IDENTITY ---
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" }, 
  phone: { type: String, default: "" },
  bio: { type: String, maxlength: 200, default: "" }, 
  
  role: {
  type: String,
  enum: ["driver", "passenger"],
  default: "passenger"
},

gender: {
  type: String,
  enum: ["male", "female"],
  default: "male"
},

  // --- 2. VERIFICATION ---
  cnic: { type: String, default: "" }, 
  dob: { type: Date }, 
  isVerified: { type: Boolean, default: false },

  // --- 3. DRIVER PROFILE ---
  driverDetails: {
    licenseNumber: { type: String, default: "" },
    vehicle: {
      make: { type: String, default: "" }, 
      model: { type: String, default: "" }, 
      year: { type: Number }, 
      color: { type: String, default: "" }, 
      plate: { type: String, default: "" }, 
      ac: { type: Boolean, default: true }, 
    }
  },

  date: { type: Date, default: Date.now },
});

// 👇 CRITICAL FIX: Ensure this says "User" (Capital U)
module.exports = mongoose.model("User", UserSchema);