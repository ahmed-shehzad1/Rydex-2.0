const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  make: {
    type: String,
    required: true
  },

  model: {
    type: String,
    required: true
  },

  color: {
    type: String,
    default: ""
  },

  plate: {
    type: String,
    required: true,
    unique: true
  },

  seats: {
    type: Number,
    default: 4
  },

  ac: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vehicle", VehicleSchema);