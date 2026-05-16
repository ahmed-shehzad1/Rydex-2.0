/**
 * Middleware: Check if user is a driver
 * Applied to vehicle and route creation endpoints
 */
module.exports = function isDriver(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "driver") {
    return res.status(403).json({ 
      message: "Only drivers can access this feature" 
    });
  }

  next();
};