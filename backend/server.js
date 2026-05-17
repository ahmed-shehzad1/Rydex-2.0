require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// --- 1. CONFIGURATION ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://rydex-2-0-92fi.vercel.app",
  "https://rydex-2-0.vercel.app"
];
// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

mongoose.set("strictQuery", true);

// --- 2. DATABASE CONNECTION ---
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not set in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// --- 3. ROUTES ---
try {
  app.use("/api/auth", require("./routes/auth"));
  // app.use("/api/profile", require("./routes/profile")); // Uncomment if you have this file
  app.use("/api/routes", require("./routes/routes"));
  
  // 👇 THIS LINE FIXES THE 404 ERROR 👇
  app.use("/api/chat", require("./routes/chat")); 

} catch (error) {
  console.error("❌ Error loading routes:", error.message);
  console.error("👉 Check that 'auth.js', 'routes.js', and 'chat.js' exist in backend/routes/");
}

// Health Check
app.get("/", (req, res) => res.send("API is running"));
app.get("/api/health", (req, res) => res.json({ ok: true }));

// --- 4. SERVER & SOCKET SETUP ---
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"]
});

// --- 5. SOCKET LOGIC ---
io.on("connection", (socket) => {
  // console.log(`🔌 User Connected: ${socket.id}`);

  socket.on("join_chat", (routeId) => {
    if (!routeId) return;
    socket.join(routeId);
  });

  socket.on("send_message", (data) => {
    if (data && data.routeId) {
      socket.to(data.routeId).emit("receive_message", data);
    }
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected", socket.id);
  });
});

const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
// --- 6. START SERVER ---
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});