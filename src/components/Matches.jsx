import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MessageCircle, Check, X, ArrowRight, Clock, CarFront, User } from "lucide-react"; 
import { toast } from 'react-toastify';
import Chat from "../components/Chat"; 
import { getAvatarUrl } from "../utils/avatarHelper";
import "../styles/Matches.css";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [myRoute, setMyRoute] = useState(null); 
  const [myUserId, setMyUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chat State
  const [showChat, setShowChat] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState(null); 
  const [chatPartnerName, setChatPartnerName] = useState(""); 

  const base = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated. Please login.");
        setLoading(false);
        return;
      }

      // 1. Get my user info
      const me = await axios.get(`${base}/auth/me`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyUserId(me.data._id);

      // 2. Get my routes
      const myRouteRes = await axios.get(`${base}/routes/mine/list`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // ✅ FIX: Check if owned routes exist
      if (!myRouteRes.data.owned || myRouteRes.data.owned.length === 0) {
        setMyRoute(null);
        setMatches([]);
        setLoading(false);
        return;
      }

      const myRoute = myRouteRes.data.owned[0];
      setMyRoute(myRoute);

      // 3. Get matches
      try {
        const matchRes = await axios.post(`${base}/routes/match`, {}, { 
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log("✅ Matches received:", matchRes.data);
        setMatches(Array.isArray(matchRes.data) ? matchRes.data : []);
      } catch (matchErr) {
        console.error("❌ Match endpoint error:", matchErr);
        if (matchErr.response?.status === 404) {
          console.error("Route not found. Make sure you have an active route.");
        }
        setMatches([]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("❌ Load data error:", err);
      setError(err.response?.data?.message || "Failed to load matches");
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleRequest = async (routeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${base}/routes/${routeId}/join`, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Request sent successfully!");
      loadData(); 
    } catch (err) { 
      toast.error(err.response?.data?.message || "Failed to send request"); 
    }
  };

  const handleAccept = async (partnerId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!myRoute?._id) {
        toast.error("No active route found");
        return;
      }

      const userId = partnerId?._id || partnerId;
      
      console.log("Accepting user:", userId, "Route:", myRoute._id);
      
      await axios.post(`${base}/routes/${myRoute._id}/accept/${userId}`, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Connected successfully!");
      loadData();
    } catch (err) { 
      console.error("❌ Accept error:", err.response?.data);
      toast.error(err.response?.data?.message || "Error accepting request."); 
    }
  };

  const handleReject = async (partnerId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!myRoute?._id) {
        toast.error("No active route found");
        return;
      }

      const userId = partnerId?._id || partnerId;
      
      await axios.post(`${base}/routes/${myRoute._id}/reject/${userId}`, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.info("Request rejected.");
      loadData();
    } catch (err) { 
      console.error("❌ Reject error:", err.response?.data);
      toast.error(err.response?.data?.message || "Error rejecting request."); 
    }
  };

  const openChat = (routeId, partnerName) => {
    setActiveRouteId(routeId);
    setChatPartnerName(partnerName);
    setShowChat(true);
  };

  // --- RENDER ---

  if (loading) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%)"
      }}>
        <div style={{
          fontSize: "18px",
          color: "#0f5d3e",
          animation: "pulse 1.5s infinite"
        }}>
          ⏳ Scanning network...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%)"
      }}>
        <div style={{
          background: "#fee2e2",
          padding: "20px",
          borderRadius: "10px",
          color: "#991b1b",
          maxWidth: "400px"
        }}>
          <h3>⚠️ Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!myRoute) {
    return (
      <div style={{
        padding: "60px 20px",
        textAlign: "center",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%)"
      }}>
        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          border: "2px solid #e0f2e0",
          maxWidth: "400px"
        }}>
          <h2 style={{ color: "#0f5d3e", margin: "0 0 10px 0" }}>🚗 Start Here</h2>
          <p style={{ color: "#666", margin: "0 0 20px 0" }}>
            You must post a route on the map to find matches.
          </p>
          <Link 
            to="/add" 
            style={{
              display: "inline-block",
              marginTop: "20px",
              textDecoration: "none",
              background: "linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(26, 122, 82, 0.2)"
            }}
          >
            Go to Map
          </Link>
        </div>
      </div>
    );
  }

  const isMyRoleDriver = myRoute.role === "driver";

  return (
    <div style={{
      padding: "30px 20px",
      maxWidth: "1000px",
      margin: "0 auto",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%)"
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .match-card {
          background: linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%);
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #e0f2e0;
          box-shadow: 0 4px 12px rgba(15, 93, 62, 0.08);
          transition: all 0.3s ease;
        }

        .match-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(15, 93, 62, 0.15);
        }

        .route-name {
          font-weight: 600;
          color: #0f5d3e;
          font-size: 13px;
        }

        .badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge.connected {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          color: #15803d;
          border: 1px solid #86efac;
        }

        .badge.pending {
          background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
          color: #0369a1;
          border: 1px solid #7dd3fc;
        }

        .badge.incoming {
          background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
          color: #92400e;
          border: 1px solid #fbbf24;
        }

        .join-btn {
          width: 100%;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(26, 122, 82, 0.2);
        }

        .join-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(26, 122, 82, 0.3);
        }

        .join-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .matches-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {showChat && (
        <Chat 
          routeId={activeRouteId} 
          partnerName={chatPartnerName} 
          myId={myUserId}
          onClose={() => setShowChat(false)} 
        />
      )}

      {/* HEADER */}
      <div className="fade-in" style={{ marginBottom: "30px" }}>
        <h1 style={{
          color: "#0f5d3e",
          fontSize: "32px",
          margin: "0 0 10px 0",
          fontWeight: "700"
        }}>
          {isMyRoleDriver ? "🙋 Passengers Nearby" : "🚗 Drivers Going Your Way"}
        </h1>
        <p style={{ color: "#666", margin: "0 0 20px 0" }}>
          Found {matches.length} match{matches.length !== 1 ? "es" : ""}
        </p>
        <button 
          onClick={loadData}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "2px solid #1a7a52",
            background: "white",
            color: "#1a7a52",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(26, 122, 82, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "white";
          }}
        >
          🔄 Refresh List
        </button>
      </div>

      {/* MATCHES GRID */}
      <div className="matches-grid">
        {matches.length === 0 && (
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "40px 20px",
            background: "white",
            borderRadius: "12px",
            border: "2px dashed #d4edda",
            color: "#666"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
            <p>No matches found nearby.</p>
            <p style={{ fontSize: "14px", color: "#999" }}>Try adjusting your route or check back later.</p>
          </div>
        )}

        {matches.map((otherRoute) => {
          const otherUser = otherRoute.owner;
          if (!otherUser) return null;

          // --- STATUS LOGIC ---
          let status = "none";

          const isMatched = 
            myRoute.passengers.some(p => (p._id || p) === otherUser._id) || 
            otherRoute.passengers.some(p => (p._id || p) === myUserId);
          
          if (isMatched) {
            status = "matched";
          } else if (otherRoute.requests.some(r => (r._id || r) === myUserId)) {
            status = "pending";
          } else if (myRoute.requests.some(r => (r._id || r) === otherUser._id)) {
            status = "incoming";
          }

          return (
            <div key={otherRoute._id} className="match-card fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                <div className="route-name" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  {otherRoute.role === "driver" ? <CarFront size={14} /> : <User size={14} />}
                  {otherRoute.role === "driver" ? "Driver" : "Passenger"}
                </div>
                {status === "matched" && <span className="badge connected">✅ Connected</span>}
                {status === "pending" && <span className="badge pending">⏳ Pending</span>}
                {status === "incoming" && <span className="badge incoming">📬 Offer Received</span>}
              </div>

              {/* AVATAR & NAME */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "15px 0" }}>
                <img 
                  src={getAvatarUrl(otherUser)}
                  alt="avatar" 
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "2px solid #e0f2e0",
                    backgroundColor: "#f9fdf7",
                    objectFit: "cover"
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "1.1rem", margin: "0", color: "#0f5d3e", fontWeight: "700" }}>
                    {otherUser.name || "User"}
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#666", margin: "2px 0" }}>
                    {otherRoute.name}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ marginTop: "15px" }}>
                {status === "matched" && (
                  <button 
                    className="join-btn"
                    onClick={() => openChat(isMyRoleDriver ? myRoute._id : otherRoute._id, otherUser.name)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "linear-gradient(135deg, #0b79ff 0%, #0563d4 100%)" }}
                  >
                    <MessageCircle size={18} /> Chat
                  </button>
                )}

                {status === "incoming" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "0.8rem", color: "#ea580c", fontWeight: "bold", marginBottom: "5px" }}>
                      {isMyRoleDriver ? "👤 User wants to join" : "🚗 Driver offered a ride"}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button 
                        onClick={() => handleAccept(otherUser._id)}
                        className="join-btn"
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                        }}
                      >
                        <Check size={16} /> Accept
                      </button>
                      <button 
                        onClick={() => handleReject(otherUser._id)}
                        className="join-btn"
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                        }}
                      >
                        <X size={16} /> Reject
                      </button>
                    </div>
                  </div>
                )}

                {status === "pending" && (
                  <button 
                    className="join-btn"
                    disabled
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      background: "#e5e7eb",
                      color: "#999"
                    }}
                  >
                    <Clock size={16} /> Request Sent
                  </button>
                )}

                {status === "none" && (
                  <button 
                    className="join-btn"
                    onClick={() => handleRequest(otherRoute._id)}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
                  >
                    {isMyRoleDriver ? "Offer Ride" : "Request Ride"} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}