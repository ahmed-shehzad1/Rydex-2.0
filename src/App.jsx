// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AddRoute from "./components/AddRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import MyRoutes from "./components/MyRoutes";
import Home from "./components/Home"; 
import Matches from "./components/Matches"; 
import About from './components/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Vehicles from "./components/Vehicles";
import SafeRide from "./components/SafeRide";
export default function App() {
  return (
    <div className="app">
      {/* 👇 Added the Toast Container here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" 
      />

      <Navbar />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-routes" element={<MyRoutes />} />
          <Route path="/matches" element={<Matches />} /> 
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/safe-ride" element={<SafeRide />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}