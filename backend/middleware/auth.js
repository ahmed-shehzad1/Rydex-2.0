const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in .env");
}

/**
 * Middleware: authenticate requests using Authorization: Bearer <token>
 * Attaches req.user (entire user object) when token is valid.
 */
module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload.id) return res.status(401).json({ message: "Invalid token" });

    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    // ✅ FIX: Attach entire user object so req.user._id works everywhere
    req.user = user;
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err && err.message ? err.message : err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};