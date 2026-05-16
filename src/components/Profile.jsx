import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Car, Shield, Save } from "lucide-react";
import { toast } from 'react-toastify'; // Import Toast
import "../styles/auth-bg.css"; 

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personal"); // 'personal' or 'driver'
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", bio: "", avatar: "",
    cnic: "", dob: "",
    driverDetails: {
      licenseNumber: "",
      vehicle: { make: "", model: "", year: "", color: "", plate: "", ac: true }
    }
  });

  // Load User Data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Merge with default structure to avoid crashes
      const u = res.data;
      setFormData({
        ...formData,
        ...u,
        driverDetails: {
          licenseNumber: u.driverDetails?.licenseNumber || "",
          vehicle: { ...formData.driverDetails.vehicle, ...(u.driverDetails?.vehicle || {}) }
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      driverDetails: {
        ...formData.driverDetails,
        vehicle: { ...formData.driverDetails.vehicle, [name]: val }
      }
    });
  };

  const handleDriverChange = (e) => {
    setFormData({
      ...formData,
      driverDetails: {
        ...formData.driverDetails,
        [e.target.name]: e.target.value
      }
    });
  };

  // --- UPDATED AVATAR SYSTEM ---
  // Matches the style used in Matches.jsx
  const generateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const url = `https://api.dicebear.com/9.x/adventurer/svg?seed=${randomSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    setFormData({ ...formData, avatar: url });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`${API_BASE}/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Success Toast
      toast.success("Profile updated successfully!");
    } catch (err) {
      // Error Toast
      toast.error(err.response?.data?.message || "Error updating profile.");
    }
  };

  if (loading) return <div className="p-loading">Loading Profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-section">
          <img 
            // Fallback to generating one based on email if empty
            src={formData.avatar || `https://api.dicebear.com/9.x/adventurer/svg?seed=${formData.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
            alt="Avatar" 
            className="avatar-img" 
            style={{backgroundColor: '#f0f0f0'}}
          />
          <button className="btn-text" onClick={generateAvatar}>🎲 New Random Avatar</button>
        </div>
        <div className="header-text">
            <h1>{formData.name}</h1>
            <p>{formData.email}</p>
        </div>
      </div>

      <div className="tabs">
        <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>
          <User size={18} /> Personal
        </button>
        <button className={activeTab === 'driver' ? 'active' : ''} onClick={() => setActiveTab('driver')}>
          <Car size={18} /> Driver Info
        </button>
      </div>

      <div className="form-content">
        
        {/* --- PERSONAL TAB --- */}
        {activeTab === 'personal' && (
          <div className="fade-in">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Bio / About Me</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="I am punctual and love music..." />
            </div>

            <div className="row">
                <div className="form-group">
                    <label>Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="0300-1234567" />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob ? formData.dob.split('T')[0] : ""} onChange={handleChange} />
                </div>
            </div>

            <div className="secure-section">
                <h3><Shield size={16}/> Private Verification</h3>
                <div className="form-group">
                    <label>CNIC (National ID)</label>
                    <input name="cnic" value={formData.cnic} onChange={handleChange} placeholder="00000-0000000-0" />
                    <small>Only visible to Rydex Admin</small>
                </div>
            </div>
          </div>
        )}

        {/* --- DRIVER TAB --- */}
        {activeTab === 'driver' && (
          <div className="fade-in">
            <div className="alert-box">
                ℹ️ Fill this only if you plan to offer rides.
            </div>

            <div className="form-group">
                <label>Driving License Number</label>
                <input name="licenseNumber" value={formData.driverDetails.licenseNumber} onChange={handleDriverChange} placeholder="DL-12345" />
            </div>

            <h3>Vehicle Details</h3>
            <div className="row">
                <div className="form-group">
                  <label>Make</label>
                  <select name="make" value={formData.driverDetails.vehicle.make} onChange={handleVehicleChange}>
                      <option value="">Select...</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="KIA">KIA</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <input name="model" value={formData.driverDetails.vehicle.model} onChange={handleVehicleChange} placeholder="e.g. Alto, City" />
                </div>
            </div>

            <div className="row">
                <div className="form-group">
                  <label>Color</label>
                  <input name="color" value={formData.driverDetails.vehicle.color} onChange={handleVehicleChange} placeholder="e.g. White" />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input type="number" name="year" value={formData.driverDetails.vehicle.year || ""} onChange={handleVehicleChange} placeholder="2022" />
                </div>
            </div>

            <div className="form-group">
                <label>License Plate (Number)</label>
                <div className="plate-input">
                    <div className="plate-region">PUNJAB</div>
                    <input name="plate" value={formData.driverDetails.vehicle.plate} onChange={handleVehicleChange} placeholder="ABC-123" />
                </div>
            </div>
          </div>
        )}

        <button className="btn-save" onClick={handleSave}>
            <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}