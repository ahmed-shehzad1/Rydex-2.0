import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth-bg.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    }
  }, [navigate]);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const base = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
      const res = await axios.post(`${base}/auth/login`, form);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

        window.dispatchEvent(new Event("authChanged"));
        navigate("/profile");
        return;
      } else {
        setError(res.data?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="card-header">
            <div className="brand-icon">🚗</div>
            <h2>Sign In</h2>
            <p className="subtitle">Welcome back to RideShare</p>
          </div>

          {error && (
            <div className="error-banner">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={submit} className="auth-form">
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

            <button 
              className="btn btn-primary" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="auth-divider"></div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register" className="link-green">Create one</Link></p>
            <Link to="/forgot-password" className="link-secondary">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
