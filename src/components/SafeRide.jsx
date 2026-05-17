import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MessageCircle, Check, X, ArrowRight, Clock, Shield, Heart, AlertCircle, Play, BookOpen } from "lucide-react"; 
import { toast } from 'react-toastify';
import Chat from "../components/Chat"; 
import { getAvatarUrl } from "../Utils/avatarHelper";
import "../styles/Matches.css";

export default function SafeRide() {
  const [matches, setMatches] = useState([]);
  const [myRoute, setMyRoute] = useState(null); 
  const [myUserId, setMyUserId] = useState(null);
  const [myUserGender, setMyUserGender] = useState(null);
  const [myUserRole, setMyUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showChat, setShowChat] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState(null); 
  const [chatPartnerName, setChatPartnerName] = useState(""); 

  const base = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const me = await axios.get(`${base}/auth/me`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyUserId(me.data._id);
      setMyUserGender(me.data.gender);
      setMyUserRole(me.data.role);

      const myRouteRes = await axios.get(`${base}/routes/mine/list`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyRoute(myRouteRes.data.owned[0] || null);

      const allRoutesRes = await axios.get(`${base}/routes`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const safeMatches = allRoutesRes.data.filter(route => {
        const otherUser = route.owner;
        
        if (!otherUser) return false;
        if (otherUser.gender !== "female") return false;
        if (otherUser._id === me.data._id) return false;
        
        const isValidMatch = me.data.role === "driver" 
          ? route.role === "passenger" 
          : route.role === "driver";
        
        return isValidMatch;
      });

      setMatches(safeMatches);
      setLoading(false);
    } catch (err) {
      console.error("Load data error:", err);
      setLoading(false);
    }
  };

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
      await axios.post(`${base}/routes/${myRoute._id}/accept/${userId}`, {}, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Connected with a trusted rider! 👩");
      loadData();
    } catch (err) { 
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
      toast.error(err.response?.data?.message || "Error rejecting request."); 
    }
  };

  const openChat = (routeId, partnerName) => {
    setActiveRouteId(routeId);
    setChatPartnerName(partnerName);
    setShowChat(true);
  };

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
          ⏳ Finding safe matches...
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
          border: "2px solid #d1fae5",
          maxWidth: "400px"
        }}>
          <h2 style={{ color: "#0f5d3e", margin: "0 0 10px 0" }}>🛡️ SafeRide</h2>
          <p style={{ color: "#666", margin: "0 0 20px 0" }}>
            Post a route first to use SafeRide.
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

  const isMyRoleDriver = myRoute.role === 'driver';

  return (
    <div style={{
      padding: "30px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4 0%, #f9fdf7 100%)"
    }}>
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .safe-header {
          animation: slideInDown 0.6s ease-out;
          margin-bottom: 40px;
        }

        .match-card {
          animation: slideInUp 0.5s ease-out;
          transition: all 0.3s ease;
        }

        .match-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(26, 122, 82, 0.15);
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
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          color: #065f46;
          border: 1px solid #6ee7b7;
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

        .matches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }

        .safety-tips {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }

        .tip-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          border-left: 5px solid #1a7a52;
          box-shadow: 0 4px 12px rgba(26, 122, 82, 0.08);
          animation: fadeIn 0.6s ease-out;
          transition: all 0.3s ease;
        }

        .tip-card:hover {
          box-shadow: 0 8px 20px rgba(26, 122, 82, 0.12);
          transform: translateY(-2px);
        }

        .tip-card h4 {
          margin: 0 0 12px 0;
          color: #0f5d3e;
          font-size: 16px;
          font-weight: 700;
        }

        .tip-card p {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.6;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }

        .video-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(26, 122, 82, 0.08);
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease-out;
          border: 2px solid #e0f2e0;
        }

        .video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(26, 122, 82, 0.15);
        }

        .video-thumbnail {
          width: 100%;
          height: 140px;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        }

        .video-thumbnail:hover .play-btn {
          transform: scale(1.1);
        }

        .play-btn {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .video-info {
          padding: 16px;
        }

        .video-info h4 {
          margin: 0 0 8px 0;
          color: #0f5d3e;
          fontWeight: "600";
          font-size: 14px;
        }

        .video-info p {
          margin: 0;
          color: #666;
          font-size: 13px;
          line-height: 1.5;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        .blog-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(26, 122, 82, 0.08);
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease-out;
          border: 2px solid #e0f2e0;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(26, 122, 82, 0.15);
        }

        .blog-header {
          height: 120px;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .blog-content {
          padding: 16px;
        }

        .blog-content h4 {
          margin: 0 0 8px 0;
          color: #0f5d3e;
          font-size: 15px;
          font-weight: 700;
        }

        .blog-content p {
          margin: 0;
          color: #666;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .matches-grid {
            grid-template-columns: 1fr;
          }

          .safety-tips {
            grid-template-columns: 1fr;
          }

          .video-grid {
            grid-template-columns: 1fr;
          }

          .blog-grid {
            grid-template-columns: 1fr;
          }

          .safe-header {
            margin-bottom: 30px;
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
      <div className="safe-header">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "12px"
        }}>
          <Shield size={32} color="#1a7a52" />
          <h1 style={{ 
            color: "#0f5d3e", 
            fontSize: "36px", 
            margin: "0",
            fontWeight: "700"
          }}>
            🛡️ SafeRide
          </h1>
        </div>
        <p style={{ color: "#666", margin: "0 0 20px 0", fontSize: "15px" }}>
          {isMyRoleDriver 
            ? "👩 Connect with women passengers only - trusted rides for everyone" 
            : "👩 Connect with women drivers only - safe journey guaranteed"}
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
            padding: "50px 20px",
            background: "white",
            borderRadius: "12px",
            border: "2px dashed #d1fae5",
            color: "#666"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>👩</div>
            <p style={{ fontWeight: "600", margin: "0 0 8px 0", color: "#0f5d3e", fontSize: "18px" }}>No women riders found</p>
            <p style={{ fontSize: "14px", margin: "0", color: "#999" }}>
              Try refreshing later or check the Matches page for all rides.
            </p>
          </div>
        )}

        {matches.map((otherRoute, index) => {
          const otherUser = otherRoute.owner;
          if (!otherUser) return null;

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
            <div 
              key={otherRoute._id} 
              className="match-card"
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                border: "2px solid #e0f2e0",
                boxShadow: "0 4px 12px rgba(26, 122, 82, 0.08)",
                animation: `slideInUp 0.5s ease-out ${index * 0.05}s both`
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", fontWeight: "600", color: "#0f5d3e", fontSize: "13px" }}>
                  <Shield size={14} color="#1a7a52" />
                  👩 Verified Woman
                </div>
                {status === "matched" && <span className="badge connected">✅ Connected</span>}
                {status === "pending" && <span className="badge pending">⏳ Pending</span>}
                {status === "incoming" && <span className="badge incoming">📬 Offer</span>}
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
                    border: "3px solid #1a7a52",
                    backgroundColor: "#f0fdf4",
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

              {/* BUTTONS */}
              <div style={{ marginTop: "15px" }}>
                {status === "matched" && (
                  <button 
                    className="join-btn"
                    onClick={() => openChat(isMyRoleDriver ? myRoute._id : otherRoute._id, otherUser.name)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                  >
                    <MessageCircle size={18} /> Chat with {otherUser.name.split(' ')[0]}
                  </button>
                )}

                {status === "incoming" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ fontSize: "0.8rem", color: "#047857", fontWeight: "bold", marginBottom: "5px" }}>
                      {isMyRoleDriver ? "👩 Woman wants to join" : "👩 Woman driver offered a ride"}
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
                          gap: "5px"
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

      {/* SAFETY TIPS SECTION */}
      <div style={{ marginBottom: "50px" }}>
        <h2 style={{ 
          color: "#0f5d3e", 
          fontSize: "26px", 
          margin: "0 0 24px 0",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <AlertCircle size={28} color="#1a7a52" /> Safety Tips for Women
        </h2>
        <div className="safety-tips">
          <div className="tip-card">
            <h4>🛡️ Share Your Location</h4>
            <p>Always share your ride details with a trusted friend or family member before starting your journey. Use your phone's location sharing feature.</p>
          </div>
          <div className="tip-card">
            <h4>📞 Keep Communication Open</h4>
            <p>Use our in-app chat to communicate with your ride partner before pickup. Keep messages professional and discuss pickup location details.</p>
          </div>
          <div className="tip-card">
            <h4>✅ Verify Driver Details</h4>
            <p>Check driver ratings, vehicle details, and confirm their identity before getting in the car. Trust verified women drivers on SafeRide.</p>
          </div>
          <div className="tip-card">
            <h4>🚨 Trust Your Gut</h4>
            <p>If something doesn't feel right, cancel the ride immediately. Your safety and comfort are our top priority. No ride is worth compromising your safety.</p>
          </div>
        </div>
      </div>

     {/* ===== EDUCATIONAL VIDEOS SECTION ===== */}
<div style={{ marginBottom: "50px" }}>
  <h2 style={{ 
    color: "#0f5d3e", 
    fontSize: "26px", 
    margin: "0 0 24px 0",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}>
    <Play size={28} color="#1a7a52" /> Safety Educational Videos
  </h2>

  <div className="video-grid">

    {/* VIDEO 1 */}
    <a
      href="https://www.youtube.com/watch?v=8h2Y9b2Q5mY"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="video-card">
        <div className="video-thumbnail">
          <div className="play-btn">
            <Play size={24} color="#1a7a52" fill="#1a7a52" />
          </div>
        </div>
        <div className="video-info">
          <h4>Personal Safety Essentials</h4>
          <p>Learn essential safety tips for solo travelers and shared transportation methods</p>
        </div>
      </div>
    </a>

    {/* VIDEO 2 */}
    <a
      href="https://www.youtube.com/watch?v=6NaXztStA0Q"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="video-card">
        <div className="video-thumbnail">
          <div className="play-btn">
            <Play size={24} color="#1a7a52" fill="#1a7a52" />
          </div>
        </div>
        <div className="video-info">
          <h4>Ride Sharing Safety</h4>
          <p>Best practices for safe ride sharing including verification and communication tips</p>
        </div>
      </div>
    </a>

    {/* VIDEO 3 */}
    <a
      href="https://www.youtube.com/watch?v=5fUV9xjEvAg"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="video-card">
        <div className="video-thumbnail">
          <div className="play-btn">
            <Play size={24} color="#1a7a52" fill="#1a7a52" />
          </div>
        </div>
        <div className="video-info">
          <h4>Emergency Response Guide</h4>
          <p>What to do in unexpected situations and how to contact authorities quickly</p>
        </div>
      </div>
    </a>

  </div>
</div>

{/* ===== BLOG SECTION ===== */}
<div>
  <h2 style={{ 
    color: "#0f5d3e", 
    fontSize: "26px", 
    margin: "0 0 24px 0",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}>
    <BookOpen size={28} color="#1a7a52" /> Women's Safety Resources
  </h2>

  <div className="blog-grid">

    {/* BLOG 1 */}
    <a
      href="https://www.unwomen.org/en/news/stories"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="blog-card">
        <div className="blog-header">
          <Heart size={40} color="#1a7a52" />
        </div>
        <div className="blog-content">
          <h4>Empowering Women Through Safe Travel</h4>
          <p>Discover how community-driven platforms are improving women’s transportation safety worldwide.</p>
        </div>
      </div>
    </a>

    {/* BLOG 2 */}
    <a
      href="https://www.safecity.in"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="blog-card">
        <div className="blog-header">
          <Shield size={40} color="#1a7a52" />
        </div>
        <div className="blog-content">
          <h4>Building Trust in Ride Sharing</h4>
          <p>Learn how verification systems create safer transportation experiences for women.</p>
        </div>
      </div>
    </a>

    {/* BLOG 3 */}
    <a
      href="https://www.who.int/news-room"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="blog-card">
        <div className="blog-header">
          <AlertCircle size={40} color="#1a7a52" />
        </div>
        <div className="blog-content">
          <h4>Quick Safety Checklist</h4>
          <p>A guide to safety measures before, during, and after your ride.</p>
        </div>
      </div>
    </a>

    {/* BLOG 4 */}
    <a
      href="https://www.unwomen.org/en"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div className="blog-card">
        <div className="blog-header">
          <Heart size={40} color="#1a7a52" />
        </div>
        <div className="blog-content">
          <h4>Community Stories: Women Drivers</h4>
          <p>Inspiring stories of women changing transportation and empowering communities.</p>
        </div>
      </div>
    </a>

  </div>
</div>

      {/* BLOG SECTION */}
      <div>
        <h2 style={{ 
          color: "#0f5d3e", 
          fontSize: "26px", 
          margin: "0 0 24px 0",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <BookOpen size={28} color="#1a7a52" /> Women's Safety Resources
        </h2>
        <div className="blog-grid">
          <div className="blog-card">
            <div className="blog-header">
              <Heart size={40} color="#1a7a52" />
            </div>
            <div className="blog-content">
              <h4>Empowering Women Through Safe Travel</h4>
              <p>Discover how community-driven platforms are revolutionizing safe transportation for women worldwide and improving lives.</p>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-header">
              <Shield size={40} color="#1a7a52" />
            </div>
            <div className="blog-content">
              <h4>Building Trust in Ride Sharing</h4>
              <p>Understand the importance of verified communities and how verification systems build safer transportation experiences for all.</p>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-header">
              <AlertCircle size={40} color="#1a7a52" />
            </div>
            <div className="blog-content">
              <h4>Quick Safety Checklist</h4>
              <p>A comprehensive guide to safety measures you should take before, during, and after your ride to stay protected always.</p>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-header">
              <Heart size={40} color="#1a7a52" />
            </div>
            <div className="blog-content">
              <h4>Community Stories: Women Drivers</h4>
              <p>Read inspiring stories from women drivers who are changing the landscape of transportation and empowering their communities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}