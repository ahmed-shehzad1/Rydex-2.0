const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Chat = require('../models/Chat');

// ✅ FIX 1: Populate sender with avatar for consistent UI
router.get('/:routeId', auth, async (req, res) => {
  try {
    const { routeId } = req.params;

    const messages = await Chat.find({ routeId })
      .populate("sender", "name email avatar _id") // ✅ Added avatar
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    // ✅ FIX 2: Return empty array for 404 (no chat history yet)
    if (err.name === 'CastError') {
      return res.json([]);
    }
    res.status(500).send('Server Error');
  }
});

// ✅ FIX 3: Send message with proper populate
router.post('/send', auth, async (req, res) => {
  try {
    const { routeId, content } = req.body;

    if (!routeId || !content) {
      return res.status(400).json({ message: "Missing routeId or content" });
    }

    const newMessage = new Chat({
      routeId,
      sender: req.user._id, // ✅ Use _id consistently
      content
    });

    const savedMessage = await newMessage.save();

    // ✅ FIX 4: Populate with avatar after saving
    await savedMessage.populate("sender", "name email avatar _id");

    res.json(savedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;