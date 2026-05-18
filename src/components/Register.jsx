import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth";
import "../styles/auth-bg.css";

export default function Register({ onRegistered }) {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "passenger", 
    gender: "male",
    vehicle: {} 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const recaptchaPromiseRef = useRef(null);

  const DEBUG_VISIBLE_WIDGET = true;
  const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let captchaToken = null;

    if (SITE_KEY) {
      if (!recaptchaRef.current) {
        setError("reCAPTCHA widget not ready. Try refreshing the page.");
        setLoading(false);
        return;
      }

      try {
        if (DEBUG_VISIBLE_WIDGET) {
          const immediate = recaptchaRef.current.getValue && recaptchaRef.current.getValue();
          if (immediate) {
            captchaToken = immediate;
          } else {
            recaptchaPromiseRef.current = {};
            recaptchaPromiseRef.current.promise = new Promise((resolve, reject) => {
              recaptchaPromiseRef.current.resolve = resolve;
              recaptchaPromiseRef.current.reject = reject;
              recaptchaPromiseRef.current.timeout = setTimeout(() => {
                reject(new Error("reCAPTCHA timed out waiting for manual click"));
                recaptchaPromiseRef.current = null;
              }, 30000);
            });
            console.log("Please click the visible reCAPTCHA widget now...");
            captchaToken = await recaptchaPromiseRef.current.promise;
          }
        } else {
          const timeoutMs = 20000;
          if (typeof recaptchaRef.current.executeAsync === "function") {
            const exec = recaptchaRef.current.executeAsync();
            captchaToken = await Promise.race([
              exec,
              new Promise((_, reject) => setTimeout(() => reject(new Error("reCAPTCHA timed out")), timeoutMs))
            ]);
          } else {
             recaptchaRef.current.execute();
          }
        }
        
        try { recaptchaRef.current.reset(); } catch (e) { /* ignore */ }

      } catch (err) {
        console.error("reCAPTCHA execution error:", err);
        setError("Captcha failed: " + (err?.message || "unknown error"));
        setLoading(false);
        return;
      }
    }

    try {
      const payload = { ...form, captcha: captchaToken };
      const data = await register(payload);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        
        window.dispatchEvent(new Event("authChanged"));
        
        navigate("/profile");
        return;
      }
      
      onRegistered && onRegistered(data);

    } catch (err) {
      console.error("Register request error:", err);
      setError(err?.response?.data?.message || err?.message || "Registration failed");
    } finally {
      if (!window.location.pathname.includes("/profile")) {
        setLoading(false);
      }
    }
  }

  function onRecaptchaChange(token) {
    if (recaptchaPromiseRef.current?.resolve) {
      clearTimeout(recaptchaPromiseRef.current.timeout);
      recaptchaPromiseRef.current.resolve(token);
      recaptchaPromiseRef.current = null;
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="card-header">
            <div className="brand-icon">🚗</div>
            <h2>Create Account</h2>
            <p className="subtitle">Join RideShare today</p>
          </div>

          {error && (
            <div className="error-banner">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={submit} className="auth-form register-form">
            <div className="form-group">
              <label className="field">
                <span className="field-label">👤 Full Name</span>
                <input 
                  className="field-input" 
                  required 
                  placeholder="John Doe" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field">
                <span className="field-label">📧 Email</span>
                <input 
                  className="field-input" 
                  required 
                  type="email" 
                  placeholder="your@email.com" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="field">
                <span className="field-label">🔐 Password</span>
                <div className="password-wrapper">
                  <input 
                    className="field-input" 
                    required 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••" 
                    value={form.password} 
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </label>
            </div>

            <div className="form-row">
              <label className="field">
                <span className="field-label">⚧ Gender</span>
                <select 
                  className="field-input" 
                  value={form.gender} 
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  disabled={loading}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label className="field">
                <span className="field-label">🎯 Role</span>
                <select 
                  className="field-input" 
                  value={form.role} 
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  disabled={loading}
                >
                  <option value="passenger">Passenger</option>
                  <option value="driver">Driver</option>
                </select>
              </label>
            </div>

            {form.role === "driver" && (
              <div className="driver-section">
                <p className="driver-label">🚙 Vehicle Details</p>
                <div className="form-row">
                  <label className="field">
                    <span className="field-label">Make</span>
                    <input 
                      className="field-input" 
                      placeholder="Toyota" 
                      value={form.vehicle.make || ""} 
                      onChange={(e) => setForm({...form, vehicle:{...form.vehicle, make:e.target.value}})}
                      disabled={loading}
                    />
                  </label>
                  <label className="field">
                    <span className="field-label">Model</span>
                    <input 
                      className="field-input" 
                      placeholder="Camry" 
                      value={form.vehicle.model || ""} 
                      onChange={(e) => setForm({...form, vehicle:{...form.vehicle, model:e.target.value}})}
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>
            )}

            {SITE_KEY && (
              <div className="recaptcha-wrapper">
                <ReCAPTCHA
                  sitekey={SITE_KEY}
                  size={DEBUG_VISIBLE_WIDGET ? "normal" : "invisible"}
                  ref={recaptchaRef}
                  onChange={onRecaptchaChange}
                />
              </div>
            )}

            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="auth-divider"></div>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login" className="link-green">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
