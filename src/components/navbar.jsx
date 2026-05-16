import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { getAvatarUrl } from "../utils/avatarHelper";
import { Menu, X, LogOut, Home } from "lucide-react";
import "./Navbar.css"; 

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const base = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
      const res = await axios.get(`${base}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setUser(res.data);
    } catch (err) {
      console.log("Navbar check failed:", err.response?.data);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("authChanged", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("authChanged", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("authChanged")); 
    navigate("/login");
  }

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="rydex-navbar">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .rydex-navbar {
          background: linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%);
          border-bottom: 2px solid #e0f2e0;
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(15, 93, 62, 0.08);
        }

        .rydex-nav-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        /* BRAND */
        .rydex-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-size: 24px;
          font-weight: 700;
          color: #0f5d3e;
          transition: all 0.3s ease;
          letter-spacing: -0.5px;
        }

        .rydex-brand:hover {
          transform: scale(1.05);
          color: #1a7a52;
        }

        .brand-dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        /* DESKTOP LINKS */
        .rydex-links {
          display: flex;
          gap: 8px;
          align-items: center;
          flex: 1;
          margin-left: 40px;
        }

        .rydex-link {
          text-decoration: none;
          color: #555;
          font-weight: 500;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          white-space: nowrap;
        }

        .rydex-link:hover {
          color: #0f5d3e;
          background: rgba(26, 122, 82, 0.08);
          transform: translateY(-2px);
        }

        .rydex-link.active {
          color: #1a7a52;
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(26, 122, 82, 0.15);
        }

        /* AUTH SECTION */
        .rydex-auth {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-link, .btn-solid {
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-link.modern {
          color: #0f5d3e;
          background: transparent;
          border: 2px solid #1a7a52;
        }

        .btn-link.modern:hover {
          background: rgba(26, 122, 82, 0.1);
          transform: translateY(-2px);
        }

        .btn-solid.modern {
          background: linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 12px rgba(26, 122, 82, 0.2);
        }

        .btn-solid.modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(26, 122, 82, 0.3);
        }

        .btn-link.small {
          padding: 8px 14px;
          font-size: 13px;
        }

        .btn-link.danger {
          color: #dc2626;
          border-color: #fca5a5;
        }

        .btn-link.danger:hover {
          background: rgba(220, 38, 38, 0.08);
          border-color: #ef4444;
        }

        /* USER INFO */
        .rydex-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-info-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .user-info-link:hover {
          background: rgba(26, 122, 82, 0.08);
        }

        .user-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-meta img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e0f2e0;
          background: #f9fdf7;
          transition: all 0.3s ease;
        }

        .user-info-link:hover img {
          border-color: #1a7a52;
          box-shadow: 0 0 0 3px rgba(26, 122, 82, 0.1);
        }

        .user-name {
          font-weight: 600;
          color: #0f5d3e;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* HAMBURGER MENU (MOBILE) */
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #0f5d3e;
          font-size: 24px;
          transition: all 0.3s ease;
        }

        .hamburger-btn:hover {
          transform: scale(1.1);
          color: #1a7a52;
        }

        /* MOBILE MENU */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%);
          flex-direction: column;
          padding: 20px;
          gap: 8px;
          animation: slideDown 0.3s ease-out;
          overflow-y: auto;
          border-top: 2px solid #e0f2e0;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu.active {
          display: flex;
        }

        .mobile-menu .rydex-link {
          width: 100%;
          padding: 14px 16px;
          border-radius: 10px;
          text-align: left;
          font-size: 15px;
          border: 1px solid #e0f2e0;
          transition: all 0.3s ease;
        }

        .mobile-menu .rydex-link:hover {
          background: rgba(26, 122, 82, 0.1);
          border-color: #1a7a52;
        }

        .mobile-menu .rydex-link.active {
          background: linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%);
          color: white;
          border-color: #0f5d3e;
        }

        .mobile-menu-divider {
          height: 1px;
          background: #e0f2e0;
          margin: 12px 0;
        }

        .mobile-auth-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .mobile-auth-section .btn-link,
        .mobile-auth-section .btn-solid {
          width: 100%;
          justify-content: center;
          padding: 12px 16px;
        }

        .mobile-user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #f0fdf4 0%, #f9fdf7 100%);
          border: 2px solid #e0f2e0;
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .mobile-user-card img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #1a7a52;
        }

        .mobile-user-info h4 {
          margin: 0;
          color: #0f5d3e;
          font-weight: 700;
          font-size: 15px;
        }

        .mobile-user-info p {
          margin: 4px 0 0 0;
          color: #666;
          font-size: 12px;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .rydex-nav-inner {
            height: 60px;
            padding: 10px 16px;
          }

          .rydex-brand {
            font-size: 20px;
          }

          .rydex-links {
            display: none;
          }

          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            order: 3;
          }

          .rydex-auth {
            display: none;
          }

          .mobile-menu {
            max-height: calc(100vh - 70px);
          }
        }
      `}</style>

      <div className="rydex-nav-inner">
        {/* BRAND */}
        <Link to="/" className="rydex-brand">
          <span className="brand-dot" /> Rydex
        </Link>

        {/* DESKTOP LINKS */}
        <nav className="rydex-links">
          <NavLink to="/matches" className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}>
            🔍 Matches
          </NavLink>

          <NavLink to="/add" className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}>
            ➕ My Journey
          </NavLink>

          {user?.role === "driver" && (
            <NavLink to="/vehicles" className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}>
              🚗 Vehicles
            </NavLink>
          )}

          <NavLink to="/safe-ride" className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}>
            🛡️ SafeRide
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}>
            ℹ️ About Us
          </NavLink>

          {user && (
            <NavLink to="/my-routes" className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}>
              📋 My Routes
            </NavLink>
          )}
        </nav>

        {/* DESKTOP AUTH */}
        <div className="rydex-auth">
          {!user ? (
            <>
              <Link to="/login" className="btn-link modern">Login</Link>
              <Link to="/register" className="btn-solid modern">Register</Link>
            </>
          ) : (
            <div className="rydex-user">
              <Link to="/profile" className="user-info-link">
                <div className="user-meta">
                  <img 
                    src={getAvatarUrl(user)}
                    alt="Avatar" 
                  />
                  <span className="user-name">{user.name}</span>
                </div>
              </Link>
              
              <button onClick={handleLogout} className="btn-link small modern danger">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button 
          className="hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          {/* USER CARD */}
          {user && (
            <>
              <div className="mobile-user-card">
                <img src={getAvatarUrl(user)} alt="Avatar" />
                <div className="mobile-user-info">
                  <h4>{user.name}</h4>
                  <p>{user.role === "driver" ? "🚗 Driver" : "🙋 Passenger"}</p>
                </div>
              </div>
            </>
          )}

          {/* MOBILE LINKS */}
          <NavLink 
            to="/" 
            className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            <Home size={16} /> Home
          </NavLink>

          <NavLink 
            to="/matches" 
            className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            🔍 Matches
          </NavLink>

          <NavLink 
            to="/add" 
            className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            ➕ My Journey
          </NavLink>

          {user?.role === "driver" && (
            <NavLink 
              to="/vehicles" 
              className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              🚗 Vehicles
            </NavLink>
          )}

          <NavLink 
            to="/safe-ride" 
            className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            🛡️ SafeRide
          </NavLink>

          <NavLink 
            to="/about" 
            className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
            onClick={closeMobileMenu}
          >
            ℹ️ About Us
          </NavLink>

          {user && (
            <NavLink 
              to="/my-routes" 
              className={({ isActive }) => `rydex-link ${isActive ? "active" : ""}`}
              onClick={closeMobileMenu}
            >
              📋 My Routes
            </NavLink>
          )}

          <div className="mobile-menu-divider" />

          {/* AUTH SECTION */}
          <div className="mobile-auth-section">
            {!user ? (
              <>
                <Link to="/login" className="btn-link modern" onClick={closeMobileMenu}>Login</Link>
                <Link to="/register" className="btn-solid modern" onClick={closeMobileMenu}>Register</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn-link modern" onClick={closeMobileMenu}>👤 Profile</Link>
                <button onClick={handleLogout} className="btn-link small modern danger" style={{width: '100%', justifyContent: 'center'}}>
                  <LogOut size={16} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}