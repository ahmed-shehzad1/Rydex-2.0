const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  // Link to the User who created the route
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ FIXED: Capital U
    required: true
  },

  role: { 
    type: String, 
    enum: ["driver", "passenger"], 
    required: true 
  },
  
  // Array of Users who have booked a seat
  passengers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" // ✅ FIXED: Capital U
  }],

  // Array of Users who want to join (Pending)
  requests: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" // ✅ FIXED: Capital U
  }],

  coordinates: { type: [[Number]], required: true }, 
  start: { type: [Number] }, 
  destination: { type: [Number] }, 

  name: { type: String, default: "Trip" },
  date: { type: Date, default: Date.now },
  seats: { type: Number, default: 3 },
  
  femaleOnly: {
    type: Boolean,
    default: false
  },

  vehicle: {
    make: String,
    model: String,
    color: String,
    plate: String
  },

  createdAt: { type: Date, default: Date.now }
});

// ✅ FIXED: Export as "Route" (capital) for consistency
module.exports = mongoose.model("Route", RouteSchema);