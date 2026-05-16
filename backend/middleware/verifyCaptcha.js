const axios = require("axios");

module.exports = async function verifyCaptcha(req, res, next) {
  try {
    const token = req.body.captcha || req.headers["x-recaptcha-token"];

    // If RECAPTCHA_SECRET is not set (dev), skip verification
    if (!process.env.RECAPTCHA_SECRET) {
      console.warn("RECAPTCHA_SECRET not set — skipping verification (dev mode)");
      return next();
    }

    if (!token) return res.status(400).json({ message: "Captcha required" });

    const secret = process.env.RECAPTCHA_SECRET;

    // Use form-encoded body which is the recommended format
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const resp = await axios.post("https://www.google.com/recaptcha/api/siteverify", params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000 // guard: 10s timeout for outbound request
    });

    const data = resp.data;
    console.log("reCAPTCHA siteverify response:", data);

    if (!data || !data.success) {
      // if data['error-codes'] exists, include them for debugging (don't leak secrets)
      const errors = data["error-codes"] ? data["error-codes"].join(", ") : "";
      return res.status(400).json({ message: "Captcha verification failed" + (errors ? ` (${errors})` : "") });
    }

    // If using v3, you may want to inspect action and score:
    // if (data.action !== "register" || data.score < 0.5) { ... }

    return next();
  } catch (err) {
    console.error("Captcha verify error:", err?.response?.data || err.message || err);
    return res.status(500).json({ message: "Captcha verification error" });
  }
};