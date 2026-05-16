import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Vehicles() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    make: "",
    model: "",
    color: "",
    plate: "",
    seats: 4
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const base = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          console.log("No token, redirecting to login");
          navigate("/login");
          return;
        }

        const res = await axios.get(`${base}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("User role:", res.data.role);

        if (res.data.role !== "driver") {
          setError("Only drivers can manage vehicles");
          setUser(res.data);
          setLoading(false);
          return;
        }

        setUser(res.data);
        setLoading(false);
        fetchVehicles();
      } catch (err) {
        console.error("Auth check failed:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load user data");
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [token, navigate, base]);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${base}/vehicles/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch vehicles error:", err);
      setVehicles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!form.make || !form.model || !form.plate) {
        setError("Please fill in all required fields");
        return;
      }

      await axios.post(`${base}/vehicles`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess("Vehicle added successfully!");
      setForm({
        make: "",
        model: "",
        color: "",
        plate: "",
        seats: 4
      });

      fetchVehicles();
    } catch (err) {
      console.error("Add vehicle error:", err);
      setError(err.response?.data?.message || "Failed to add vehicle");
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${base}/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Vehicle deleted!");
      fetchVehicles();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete vehicle");
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: "40px 20px", 
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          fontSize: "18px",
          color: "#0f5d3e",
          animation: "pulse 1.5s infinite"
        }}>
          ⏳ Loading vehicles...
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  if (user && user.role !== "driver") {
    return (
      <div style={{ 
        padding: "40px 20px", 
        textAlign: "center", 
        color: "#666",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.5s ease-out"
      }}>
        <div>
          <h2 style={{ color: "#ef4444", marginBottom: "10px" }}>🚫 Access Denied</h2>
          <p>Only drivers can manage vehicles.</p>
          <p>Switch your role to "Driver" in your profile settings.</p>
        </div>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "30px 20px", 
      maxWidth: "900px", 
      margin: "0 auto",
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .vehicles-header {
          animation: slideInDown 0.6s ease-out;
          margin-bottom: 30px;
        }

        .alert-banner {
          animation: slideInDown 0.4s ease-out;
        }

        .vehicle-card {
          animation: slideInUp 0.5s ease-out;
          transition: all 0.3s ease;
        }

        .vehicle-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(15, 93, 62, 0.15);
        }

        .form-container {
          animation: slideInUp 0.5s ease-out;
          transition: all 0.3s ease;
        }

        .form-container:hover {
          box-shadow: 0 10px 30px rgba(15, 93, 62, 0.1);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 93, 62, 0.2);
        }

        .btn-delete:hover {
          transform: scale(1.05);
        }

        .input-field {
          transition: all 0.3s ease;
        }

        .input-field:focus {
          border-color: #1a7a52 !important;
          box-shadow: 0 0 0 3px rgba(26, 122, 82, 0.1);
        }
      `}</style>

      {/* HEADER */}
      <div className="vehicles-header">
        <h1 style={{ 
          color: "#0f5d3e", 
          fontSize: "32px", 
          margin: "0 0 10px 0",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          🚗 My Vehicles
        </h1>
        <p style={{ color: "#666", margin: "0" }}>Manage your vehicles for rides</p>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="alert-banner" style={{ 
          background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", 
          color: "#991b1b", 
          padding: "15px 20px", 
          borderRadius: "10px", 
          marginBottom: "20px",
          border: "1px solid #fca5a5",
          boxShadow: "0 4px 12px rgba(153, 27, 27, 0.1)",
          animation: "shake 0.3s ease-out"
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* SUCCESS BANNER */}
      {success && (
        <div className="alert-banner" style={{ 
          background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
          color: "#166534", 
          padding: "15px 20px", 
          borderRadius: "10px", 
          marginBottom: "20px",
          border: "1px solid #86efac",
          boxShadow: "0 4px 12px rgba(22, 101, 52, 0.1)",
          animation: "slideInDown 0.4s ease-out"
        }}>
          ✅ {success}
        </div>
      )}

      {/* ADD VEHICLE FORM */}
      <form onSubmit={handleSubmit} className="form-container" style={{ 
        background: "linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%)", 
        padding: "30px", 
        borderRadius: "15px", 
        marginBottom: "30px",
        border: "2px solid #e0f2e0",
        boxShadow: "0 8px 24px rgba(15, 93, 62, 0.08)"
      }}>
        <h2 style={{ 
          color: "#0f5d3e", 
          fontSize: "22px",
          margin: "0 0 20px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          ➕ Add New Vehicle
        </h2>
        
        {/* MAKE FIELD */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600",
            color: "#1a7a52",
            fontSize: "14px"
          }}>Make *</label>
          <input
            placeholder="e.g., Toyota"
            value={form.make}
            onChange={(e) => setForm({ ...form, make: e.target.value })}
            className="input-field"
            style={{ 
              width: "100%", 
              padding: "12px 15px", 
              borderRadius: "8px", 
              border: "1.5px solid #d4edda", 
              boxSizing: "border-box",
              fontSize: "14px",
              fontFamily: "inherit",
              background: "#fafbf9"
            }}
            required
          />
        </div>

        {/* MODEL FIELD */}
        <div style={{ marginBottom: "18px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600",
            color: "#1a7a52",
            fontSize: "14px"
          }}>Model *</label>
          <input
            placeholder="e.g., Corolla"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="input-field"
            style={{ 
              width: "100%", 
              padding: "12px 15px", 
              borderRadius: "8px", 
              border: "1.5px solid #d4edda", 
              boxSizing: "border-box",
              fontSize: "14px",
              fontFamily: "inherit",
              background: "#fafbf9"
            }}
            required
          />
        </div>

        {/* TWO COLUMN ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "18px" }}>
          {/* COLOR FIELD */}
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "600",
              color: "#1a7a52",
              fontSize: "14px"
            }}>Color</label>
            <input
              placeholder="e.g., Silver"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="input-field"
              style={{ 
                width: "100%", 
                padding: "12px 15px", 
                borderRadius: "8px", 
                border: "1.5px solid #d4edda", 
                boxSizing: "border-box",
                fontSize: "14px",
                fontFamily: "inherit",
                background: "#fafbf9"
              }}
            />
          </div>

          {/* SEATS FIELD */}
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "600",
              color: "#1a7a52",
              fontSize: "14px"
            }}>Seats</label>
            <input
              type="number"
              min="1"
              max="8"
              value={form.seats}
              onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) })}
              className="input-field"
              style={{ 
                width: "100%", 
                padding: "12px 15px", 
                borderRadius: "8px", 
                border: "1.5px solid #d4edda", 
                boxSizing: "border-box",
                fontSize: "14px",
                fontFamily: "inherit",
                background: "#fafbf9"
              }}
            />
          </div>
        </div>

        {/* PLATE FIELD */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600",
            color: "#1a7a52",
            fontSize: "14px"
          }}>Plate Number *</label>
          <input
            placeholder="e.g., ABC-123"
            value={form.plate}
            onChange={(e) => setForm({ ...form, plate: e.target.value })}
            className="input-field"
            style={{ 
              width: "100%", 
              padding: "12px 15px", 
              borderRadius: "8px", 
              border: "1.5px solid #d4edda", 
              boxSizing: "border-box",
              fontSize: "14px",
              fontFamily: "inherit",
              background: "#fafbf9"
            }}
            required
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit" 
          className="btn"
          style={{ 
            background: "linear-gradient(135deg, #1a7a52 0%, #0f5d3e 100%)", 
            color: "white", 
            padding: "14px 28px", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "bold",
            width: "100%",
            boxShadow: "0 6px 20px rgba(26, 122, 82, 0.2)",
            transition: "all 0.3s ease"
          }}
        >
          ✨ Add Vehicle
        </button>
      </form>

      {/* VEHICLES LIST */}
      <div>
        <h2 style={{ 
          color: "#0f5d3e", 
          fontSize: "22px",
          margin: "0 0 20px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          📋 Your Vehicles ({vehicles.length})
        </h2>

        {vehicles.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "linear-gradient(135deg, #f9fdf7 0%, #ffffff 100%)",
            borderRadius: "12px",
            border: "2px dashed #d4edda",
            color: "#666",
            animation: "fadeIn 0.5s ease-out"
          }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🚗</div>
            <p style={{ margin: "0", fontSize: "16px" }}>No vehicles added yet.</p>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#999" }}>Add your first vehicle to get started!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {vehicles.map((v, index) => (
              <div 
                key={v._id} 
                className="vehicle-card"
                style={{ 
                  background: "linear-gradient(135deg, #ffffff 0%, #f9fdf7 100%)", 
                  border: "2px solid #e0f2e0", 
                  padding: "20px", 
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 4px 12px rgba(15, 93, 62, 0.08)",
                  animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div>
                  <h3 style={{ 
                    margin: "0 0 8px 0",
                    color: "#0f5d3e",
                    fontSize: "18px",
                    fontWeight: "bold"
                  }}>
                    🚙 {v.make} {v.model}
                  </h3>
                  <p style={{ 
                    margin: "0", 
                    fontSize: "14px", 
                    color: "#666",
                    display: "flex",
                    gap: "20px"
                  }}>
                    <span>📍 Plate: <strong>{v.plate}</strong></span>
                    <span>👥 Seats: <strong>{v.seats}</strong></span>
                    {v.color && <span>🎨 Color: <strong>{v.color}</strong></span>}
                  </p>
                </div>
                <button 
                  onClick={() => deleteVehicle(v._id)}
                  className="btn-delete"
                  style={{ 
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)", 
                    color: "white", 
                    border: "none", 
                    padding: "10px 16px", 
                    borderRadius: "8px", 
                    cursor: "pointer",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                    transition: "all 0.3s ease",
                    fontSize: "14px"
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}