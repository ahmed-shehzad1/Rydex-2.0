import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Car, User, Trash2, XCircle, AlertTriangle, MapPin, Users } from "lucide-react";
import { toast } from 'react-toastify';
import "./AddRoute.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function MyRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("driving");
  const [confirmingId, setConfirmingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // ✅ Get current user
      const userRes = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentUser(userRes.data);
      console.log("Current user:", userRes.data);

      // ✅ Get user's own routes (both driver & passenger)
      const myRoutesRes = await axios.get(`${API_BASE}/routes/mine/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("My routes:", myRoutesRes.data);
      
      // Combine owned and joined routes
      const ownedRoutes = myRoutesRes.data.owned || [];
      const joinedRoutes = myRoutesRes.data.joined || [];
      
      setRoutes([...ownedRoutes, ...joinedRoutes]);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load your rides.");
      setLoading(false);
    }
  };

  // ✅ FIX 1: Correctly separate driving and passenger routes
  const drivingRoutes = routes.filter(
    (r) => r.owner?._id === currentUser?._id && r.role === "driver"
  );

  const passengerRoutes = routes.filter((r) => {
    const isMyPassengerRoute = r.owner?._id === currentUser?._id && r.role === "passenger";
    const isBookedByMe = r.passengers?.some(p => {
      const passengerId = p._id || p;
      return passengerId === currentUser?._id;
    });
    
    console.log("Checking route:", r.name, "Owner:", r.owner?._id, "Role:", r.role, "IsMyPassenger:", isMyPassengerRoute, "IsBooked:", isBookedByMe);
    
    return isMyPassengerRoute || isBookedByMe;
  });

  console.log("Driving routes:", drivingRoutes);
  console.log("Passenger routes:", passengerRoutes);

  // ✅ FIX 2: Smart cancel/delete
  const handleCancel = async (routeId, ownerId) => {
    const isOwner = ownerId === currentUser?._id;
    const token = localStorage.getItem("token");

    try {
      if (isOwner) {
        // DELETE - Owner deleting their route
        await axios.delete(`${API_BASE}/routes/${routeId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Trip deleted successfully.");
      } else {
        // LEAVE - Passenger leaving a route
        await axios.post(`${API_BASE}/routes/${routeId}/leave`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.info("Booking cancelled.");
      }
      
      setConfirmingId(null);
      fetchData();
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error(err.response?.data?.message || "Error processing request");
    }
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
          ⏳ Loading your rides...
        </div>
      </div>
    );
  }

  const displayList = activeTab === "driving" ? drivingRoutes : passengerRoutes;

  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "30px 20px",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 100%)"
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

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .routes-header {
          animation: slideInDown 0.6s ease-out;
          margin-bottom: 30px;
        }

        .tabs-container {
          animation: slideInDown 0.6s ease-out 0.1s both;
          margin-bottom: 30px;
        }

        .route-card {
          animation: slideInUp 0.5s ease-out;
          transition: all 0.3s ease;
        }

        .route-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(15, 93, 62, 0.12);
        }

        .btn-tab {
          transition: all 0.3s ease;
        }

        .btn-tab:hover {
          transform: translateY(-2px);
        }

        .empty-state {
          animation: slideInUp 0.6s ease-out;
        }
      `}</style>

      {/* HEADER */}
      <div className="routes-header">
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "8px"
        }}>
          <h1 style={{
            color: "#0f5d3e",
            fontSize: "36px",
            margin: "0",
            fontWeight: "700"
          }}>
            📋 My Rides
          </h1>
          <div style={{
            background: "linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%)",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold"
          }}>
            Total: {displayList.length}
          </div>
        </div>
        <p style={{ color: "#666", margin: "0", fontSize: "15px" }}>
          Manage your active rides and bookings
        </p>
      </div>

      {/* TABS */}
      <div className="tabs-container" style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={() => setActiveTab("driving")}
          className="btn-tab"
          style={{
            padding: "14px 24px",
            borderRadius: "10px",
            border: "2px solid transparent",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: activeTab === "driving"
              ? "linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%)"
              : "white",
            color: activeTab === "driving" ? "white" : "#0f5d3e",
            boxShadow: activeTab === "driving"
              ? "0 8px 20px rgba(26, 122, 82, 0.2)"
              : "0 2px 8px rgba(0,0,0,0.05)",
            border:
  activeTab === "driving"
    ? "2px solid #0f5d3e"
    : "2px solid #e0f2e0",
          }}
        >
          <span style={{ marginRight: "8px" }}>🚗</span>
          I'm Driving ({drivingRoutes.length})
        </button>
        <button
          onClick={() => setActiveTab("passenger")}
          className="btn-tab"
          style={{
            padding: "14px 24px",
            borderRadius: "10px",
            border: "2px solid transparent",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: activeTab === "passenger"
              ? "linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%)"
              : "white",
            color: activeTab === "passenger" ? "white" : "#0f5d3e",
            boxShadow: activeTab === "passenger"
              ? "0 8px 20px rgba(26, 122, 82, 0.2)"
              : "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <span style={{ marginRight: "8px" }}>🙋‍♂️</span>
          I'm a Passenger ({passengerRoutes.length})
        </button>
      </div>

      {/* ROUTES LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {displayList.length === 0 ? (
          <div className="empty-state" style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%)",
            padding: "60px 40px",
            borderRadius: "15px",
            border: "2px dashed #d4edda",
            textAlign: "center",
            color: "#888"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>
              {activeTab === "driving" ? "🚗" : "🙋"}
            </div>
            <p style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0", color: "#0f5d3e" }}>
              No rides found
            </p>
            <p style={{ fontSize: "14px", margin: "0", color: "#999" }}>
              {activeTab === "driving"
                ? "You haven't created any driving trips yet."
                : "You haven't booked any passenger seats yet."}
            </p>
          </div>
        ) : (
          displayList.map((route, index) => {
            const isOwner = route.owner?._id === currentUser?._id;
            const isConfirming = confirmingId === route._id;
            const passengerCount = route.passengers?.length || 0;

            // ✅ FIX 3: Correct logic for displaying passenger info
            const routeRole = route.role;
            const showPassengerInfo = isOwner && routeRole === "driver";

            return (
              <div
                key={route._id}
                className="route-card"
                style={{
                  animation: `slideInUp 0.5s ease-out ${index * 0.05}s both`,
                  background: "linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%)",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(15, 93, 62, 0.08)",
                  border: "2px solid #e0f2e0",
                  transition: "all 0.3s ease"
                }}
              >
                {/* HEADER ROW */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      margin: "0 0 6px 0",
                      color: "#0f5d3e",
                      fontSize: "20px",
                      fontWeight: "700"
                    }}>
                      {route.name || "Untitled Trip"}
                    </h3>
                  </div>

                  <span style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: isOwner ? "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)" : "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                    color: isOwner ? "#0369a1" : "#15803d",
                    border: isOwner ? "1px solid #7dd3fc" : "1px solid #86efac"
                  }}>
                    {isOwner ? "🚗 My Trip" : "🎫 Booked Seat"}
                  </span>
                </div>

                {/* CAR INFO */}
                {route.owner?.driverDetails?.vehicle?.model && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "14px",
                    color: "#333",
                    marginBottom: "14px",
                    background: "linear-gradient(135deg, #f0fdf4 0%, #f9fdf7 100%)",
                    padding: "12px 14px",
                    borderRadius: "9px",
                    border: "1px solid #e0f2e0",
                    transition: "all 0.2s ease"
                  }}>
                    <Car size={18} style={{ color: "#1a7a52", flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: "700", color: "#0f5d3e" }}>
                        {route.owner.driverDetails.vehicle.color} {route.owner.driverDetails.vehicle.make} {route.owner.driverDetails.vehicle.model}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                        📍 Plate: {route.owner.driverDetails.vehicle.plate}
                      </div>
                    </div>
                  </div>
                )}

                {/* INFO GRID */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  {/* DRIVER INFO */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    background: "linear-gradient(135deg, #f0fdf4 0%, #f9fdf7 100%)",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e0f2e0",
                    color: "#555"
                  }}>
                    <User size={16} style={{ color: "#1a7a52", flexShrink: 0 }} />
                    <span>
                      {isOwner ? (
                        <span><span style={{ color: "#0f5d3e", fontWeight: "600" }}>You</span> are the {routeRole === "driver" ? "driver" : "passenger"}</span>
                      ) : (
                        <span>{routeRole === "driver" ? "Driver: " : "Owner: "}<span style={{ color: "#0f5d3e", fontWeight: "600" }}>{route.owner?.name}</span></span>
                      )}
                    </span>
                  </div>

                  {/* DATE INFO */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    background: "linear-gradient(135deg, #f0fdf4 0%, #f9fdf7 100%)",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e0f2e0",
                    color: "#555"
                  }}>
                    <Clock size={16} style={{ color: "#1a7a52", flexShrink: 0 }} />
                    <span>{new Date(route.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>

                {/* PASSENGERS INFO (Only show for drivers) */}
                {showPassengerInfo && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    background: "linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%)",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #fde68a",
                    color: "#92400e",
                    marginBottom: "16px"
                  }}>
                    <Users size={16} style={{ flexShrink: 0 }} />
                    <span>
                      <span style={{ fontWeight: "600" }}>{passengerCount}</span> passenger{passengerCount !== 1 ? "s" : ""} booked
                    </span>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  {!isConfirming ? (
                    <button
                      onClick={() => setConfirmingId(route._id)}
                      style={{
                        background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                        color: "#dc2626",
                        border: "1px solid #fca5a5",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600",
                        fontSize: "13px",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 8px rgba(220, 38, 38, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 16px rgba(220, 38, 38, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.1)";
                      }}
                    >
                      {isOwner ? <Trash2 size={16} /> : <XCircle size={16} />}
                      {isOwner ? "Delete Trip" : "Cancel Booking"}
                    </button>
                  ) : (
                    <div style={{
                      display: "flex",
                      gap: "8px"
                    }}>
                      <button
                        onClick={() => handleCancel(route._id, route.owner?._id)}
                        style={{
                          background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                          color: "white",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontWeight: "700",
                          fontSize: "13px",
                          boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        <AlertTriangle size={16} /> Confirm
                      </button>

                      <button
                        onClick={() => setConfirmingId(null)}
                        style={{
                          background: "white",
                          color: "#555",
                          border: "1px solid #d4d4d8",
                          padding: "10px 16px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "13px",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#f5f5f5";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "white";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}