import React, { useState, useEffect, useRef } from "react";
import Map, { Source, Layer } from "react-map-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import "./AddRoute.css";
import { Trash2, MapPin, Navigation, AlertTriangle } from "lucide-react"; 
import { toast } from 'react-toastify';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const API_BASE = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

export default function AddRoute() {
  const [role, setRole] = useState("passenger");
  const [userRole, setUserRole] = useState(null); // ✅ NEW: Track actual user role
  
  // DRAFT ROUTE
  const [draftStart, setDraftStart] = useState(null);
  const [draftDest, setDraftDest] = useState(null);
  const [draftLine, setDraftLine] = useState([]); 

  // SAVED ROUTE
  const [mySavedRoute, setMySavedRoute] = useState(null);

  // UI STATE FOR DELETION
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const [viewState, setViewState] = useState({ longitude: 73.0479, latitude: 33.6844, zoom: 12 });
  const mapRef = useRef(null);

  useEffect(() => {
    fetchUserRole(); // ✅ NEW: Load user role on mount
    fetchMyRoute();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : null;
  }

  // ✅ NEW: Fetch user role to validate driver status
  async function fetchUserRole() {
    const config = getAuthHeader();
    if (!config) return;
    try {
      const res = await axios.get(`${API_BASE}/auth/me`, config);
      setUserRole(res.data.role);
    } catch (err) {
      console.error("Error fetching user role:", err);
      setUserRole("passenger");
    }
  }

  // --- 1. FETCH & DISPLAY OWN ROUTE ---
  async function fetchMyRoute() {
    const config = getAuthHeader();
    if (!config) return;
    try {
      const res = await axios.get(`${API_BASE}/routes/mine/list`, config);
      if (res.data.owned && res.data.owned.length > 0) {
          const r = res.data.owned[0];
          const coords = r.geometry?.coordinates || r.coordinates || [];
          setMySavedRoute({ ...r, _coords: coords });

          if (coords.length > 0) {
             setViewState({
                 longitude: coords[0][0],
                 latitude: coords[0][1],
                 zoom: 11
             });
          }
      } else {
          setMySavedRoute(null);
      }
    } catch (err) { console.error("Error loading my route:", err); }
  }

  // --- 2. CREATE NEW ROUTE LOGIC ---
  async function fetchRouteAndDraw() {
    if (!draftStart || !draftDest) return null;
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${draftStart[0]},${draftStart[1]};${draftDest[0]},${draftDest[1]}?geometries=geojson&overview=full&access_token=${MAPBOX_TOKEN}`;
    try {
      const r = await fetch(url);
      const d = await r.json();
      
      if (!d.routes || !d.routes.length) { 
        toast.error("No path found. Try different points."); 
        return null; 
      }
      
      const coords = d.routes[0].geometry.coordinates;
      setDraftLine(coords);
      return coords;
    } catch (err) { return null; }
  }

  async function handleSave() {
    if (!draftStart || !draftDest) { 
      toast.info("Please click the map to set Start and End points."); 
      return; 
    }
    
    // ✅ NEW: Validate driver role before creating driver route
    if (role === "driver" && userRole !== "driver") {
      toast.error("❌ Only registered drivers can create driver routes. Switch to driver role in your profile.");
      return;
    }
    
    let coords = draftLine;
    if (!coords || coords.length === 0) {
        coords = await fetchRouteAndDraw();
        if(!coords) return;
    }

    const config = getAuthHeader();
    if(!config) { 
      toast.error("Please login first."); 
      return; 
    }

    try {
      await axios.post(`${API_BASE}/routes`, 
        { 
          coordinates: coords,
          role: role, 
          name: role === 'driver' ? "My Drive" : "My Commute",
          seats: role === 'driver' ? 3 : 0
        }, config
      );
      
      toast.success("Route Posted! Go to Matches page.");
      
      setDraftStart(null); 
      setDraftDest(null); 
      setDraftLine([]);
      fetchMyRoute();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving route");
    }
  }

  async function handleDelete() {
    if(!mySavedRoute) return;
    
    const config = getAuthHeader();
    try {
      await axios.delete(`${API_BASE}/routes/${mySavedRoute._id}`, config);
      setMySavedRoute(null);
      setIsConfirmingDelete(false);
      
      toast.success("Route deleted successfully."); 
    } catch (err) { 
      toast.error("Error deleting route. Please try again."); 
    }
  }

  // --- MAP CLICKS ---
  function handleMapClick(e) {
    if(mySavedRoute) {
        toast.info("You already have an active route. Delete it to create a new one.");
        return; 
    }

    const coords = [e.lngLat.lng, e.lngLat.lat];
    if (!draftStart) setDraftStart(coords);
    else if (!draftDest) {
        setDraftDest(coords);
        setTimeout(() => fetchRouteAndDraw(), 100); 
    }
  }

  return (
    <div className="ar-root">
      <div className="ar-map-wrap">
        <Map
          ref={mapRef}
          initialViewState={viewState}
          onMove={(e) => setViewState(e.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onClick={handleMapClick}
        >
           {/* DRAFT */}
           {draftStart && <Source id="s" type="geojson" data={{type:"Feature", geometry:{type:"Point", coordinates:draftStart}}}><Layer id="s-l" type="circle" paint={{"circle-color":"#0b79ff", "circle-radius":8}} /></Source>}
           {draftDest && <Source id="d" type="geojson" data={{type:"Feature", geometry:{type:"Point", coordinates:draftDest}}}><Layer id="d-l" type="circle" paint={{"circle-color":"#ff5252", "circle-radius":8}} /></Source>}
           {draftLine.length > 0 && <Source id="r" type="geojson" data={{type:"Feature", geometry:{type:"LineString", coordinates:draftLine}}}><Layer id="r-l" type="line" paint={{"line-color":"#0b79ff", "line-width":4, "line-dasharray":[2,1]}} /></Source>}

           {/* SAVED */}
           {mySavedRoute && mySavedRoute._coords && (
             <Source id="saved" type="geojson" data={{type:"Feature", geometry:{type:"LineString", coordinates:mySavedRoute._coords}}}>
                <Layer id="saved-l" type="line" paint={{"line-color":"#10b981", "line-width":6}} />
             </Source>
           )}
        </Map>

        <div className="ar-controls">
            
            {mySavedRoute ? (
                // --- VIEW: IF ROUTE EXISTS ---
                <div className="fade-in">
                    <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
                        <div style={{background:'#dcfce7', padding:8, borderRadius:'50%', color:'#166534'}}><Navigation size={20}/></div>
                        <div>
                            <h4 style={{margin:0, color:'#166534'}}>Active Route</h4>
                            <div style={{fontSize:'0.8rem', color:'#666'}}>{mySavedRoute.role === 'driver' ? 'Driving' : 'Riding'}</div>
                        </div>
                    </div>
                    
                    <div style={{fontSize:'0.85rem', color:'#555', marginBottom:15, padding:10, background:'#f9fafb', borderRadius:8}}>
                        Your route is visible to others. Go to the <strong>Matches</strong> page to find people.
                    </div>

                    {!isConfirmingDelete ? (
                        <button 
                            onClick={() => setIsConfirmingDelete(true)} 
                            className="btn" 
                            style={{background:'#fff', border:'2px solid #ef4444', color:'#ef4444', width:'100%', display:'flex', justifyContent:'center', gap:8, fontWeight:'bold'}}
                        >
                            <Trash2 size={16}/> Cancel Route
                        </button>
                    ) : (
                        <div style={{display:'flex', gap:5}}>
                             <button 
                                onClick={handleDelete} 
                                className="btn danger" 
                                style={{flex:1, display:'flex', justifyContent:'center', gap:8, fontWeight:'bold', background:'#ef4444', color:'white', border:'none'}}
                            >
                                <AlertTriangle size={16}/> Sure? Confirm
                            </button>
                            <button 
                                onClick={() => setIsConfirmingDelete(false)} 
                                className="btn" 
                                style={{width:'30%', background:'#f3f4f6', color:'#666', border:'none'}}
                            >
                                No
                            </button>
                        </div>
                    )}

                </div>
            ) : (
                // --- VIEW: IF NO ROUTE (CREATE) ---
                <div className="fade-in">
                    <h3>Post a Route</h3>
                    <p style={{fontSize:'0.85rem', color:'#666', marginBottom:15}}>Click the map twice to set your Start and Destination.</p>
                    
                    <div className="role-switch" style={{display:'flex', gap:10, marginBottom:15, background:'#f3f4f6', padding:5, borderRadius:8}}>
                        <button 
                          onClick={()=>setRole('passenger')} 
                          style={{
                            flex:1, 
                            border:'none', 
                            background: role === 'passenger' ? 'white' : 'transparent', 
                            padding:8, 
                            borderRadius:6, 
                            boxShadow: role==='passenger'?'0 2px 5px rgba(0,0,0,0.1)': 'none', 
                            fontWeight: role==='passenger'?'bold':'normal', 
                            cursor:'pointer'
                          }}
                        >
                          Passenger
                        </button>
                        <button 
                          onClick={()=>{
                            // ✅ NEW: Check if user is driver before allowing selection
                            if (userRole !== "driver") {
                              toast.warning("You must be a registered driver to create driver routes.");
                              return;
                            }
                            setRole('driver');
                          }} 
                          style={{
                            flex:1, 
                            border:'none', 
                            background: role === 'driver' ? 'white' : 'transparent', 
                            padding:8, 
                            borderRadius:6, 
                            boxShadow: role==='driver'?'0 2px 5px rgba(0,0,0,0.1)': 'none', 
                            fontWeight: role==='driver'?'bold':'normal', 
                            cursor: userRole === 'driver' ? 'pointer' : 'not-allowed',
                            opacity: userRole === 'driver' ? 1 : 0.5
                          }}
                        >
                          Driver {userRole !== 'driver' && '🔒'}
                        </button>
                    </div>

                    <div style={{display:'flex', gap:8}}>
                        <button className="btn primary" onClick={fetchRouteAndDraw} disabled={!draftDest} style={{flex:1}}>
                           Draw Path
                        </button>
                        <button className="btn success" onClick={handleSave} disabled={!draftLine.length} style={{flex:1}}>
                           Confirm
                        </button>
                    </div>
                    
                    <button className="btn" onClick={() => { setDraftStart(null); setDraftDest(null); setDraftLine([]); }} style={{width:'100%', marginTop:10, background:'#f3f4f6', color:'#666'}}>
                        Reset Points
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}