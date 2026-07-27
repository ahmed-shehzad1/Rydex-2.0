# 🚗 Rydex – Smart Ride Matching Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-black?style=for-the-badge&logo=socket.io)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge)

### A modern ride matching platform connecting drivers and passengers through intelligent route matching.

</div>

---

# 📖 Overview

Rydex is a full-stack web application that enables drivers and passengers travelling in similar directions to connect, communicate and share rides.

The system allows users to register, authenticate securely, publish routes, discover ride matches, chat in real-time, register vehicles and manage bookings while maintaining security through JWT authentication and Google reCAPTCHA.

The project was developed as a university Full Stack Web Development project using the MERN stack.

---

# ✨ Features

## 👤 User Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Encryption using bcrypt
- Google reCAPTCHA Protection
- Protected Routes
- User Profiles

---

## 🗺 Route Management

Drivers and passengers can publish travelling routes.

Features include:

- Interactive Map Interface
- Select Start & Destination
- Route Drawing using Mapbox Directions API
- Save Routes
- Delete Existing Route
- Driver / Passenger Mode
- Route Persistence

---

## 🚘 Vehicle Management

Drivers can register their vehicles.

Vehicle Information includes:

- Vehicle Name
- Vehicle Model
- Registration Number
- Seating Capacity

---

## 🤝 Ride Matching

The application intelligently connects users travelling in similar directions.

Features:

- Driver Matching
- Passenger Matching
- Nearby Route Discovery
- Live Match Updates

---

## 💬 Real-Time Chat

Users matched together can communicate instantly.

Powered by:

- Socket.IO
- WebSockets
- Real-Time Messaging
- Room-based Communication

---

## 📅 Booking System

Passengers can send ride requests.

Drivers can:

- Accept Bookings
- Reject Requests
- View Ride Requests

---

## 🔒 Security

Implemented security features include:

- JWT Authentication
- Protected API Routes
- Password Hashing (bcrypt)
- Google reCAPTCHA
- Role-based Access Control
- Driver Verification Middleware
- Environment Variables

---

# 🛠 Technology Stack

## Frontend

- React
- React Router
- React Map GL
- Framer Motion
- Axios
- React Toastify
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- Socket.IO
- JWT
- bcrypt
- Mongoose

---

## Database

MongoDB Atlas

Collections:

- Users
- Routes
- Vehicles
- Bookings
- Chats

---

## APIs

- Mapbox Maps API
- Mapbox Directions API
- Google reCAPTCHA API

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- MongoDB Atlas

---

# 🏗 Project Architecture

```
                React Frontend
                      │
          Axios HTTP Requests
                      │
              Express REST API
                      │
         JWT Authentication Middleware
                      │
              Mongoose ODM
                      │
             MongoDB Atlas Database
                      │
          Socket.IO Real-Time Server
```

---

# 📂 Folder Structure

```
travel-matcher

│

├── frontend
│   ├── components
│   ├── services
│   ├── styles
│   ├── assets
│   └── App.jsx
│
├── backend
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🗄 Database Design

## User

Stores

- Name
- Email
- Password
- Gender
- Role
- Profile Information

---

## Route

Stores

- Driver / Passenger
- Coordinates
- Seats
- Route Name
- Owner

---

## Vehicle

Stores

- Vehicle Name
- Registration Number
- Model
- Capacity

---

## Booking

Stores

- Passenger
- Driver
- Booking Status
- Route Reference

---

## Chat

Stores

- Sender
- Receiver
- Message
- Timestamp

---

# 🔐 Authentication Flow

```
Register
      │
      ▼
Password Hashing
      │
      ▼
MongoDB
      │
      ▼
Login
      │
      ▼
JWT Token
      │
      ▼
Protected APIs
```

---

# 🌐 REST API

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

---

## Routes

```
POST /api/routes

GET /api/routes

GET /api/routes/mine/list

DELETE /api/routes/:id
```

---

## Vehicles

```
POST /api/vehicles

GET /api/vehicles
```

---

## Bookings

```
POST /api/bookings

GET /api/bookings
```

---

## Chat

```
POST /api/chat

GET /api/chat
```

---

# 🚀 Installation

Clone repository

```bash
git clone https://github.com/ahmed-shehzad1/Rydex-2.0.git
```

Install frontend

```bash
cd frontend
npm install
```

Install backend

```bash
cd backend
npm install
```

Run backend

```bash
npm start
```

Run frontend

```bash
npm run dev
```

---

# ⚙ Environment Variables

Backend

```env
MONGO_URI=

JWT_SECRET=

RECAPTCHA_SECRET=

FRONTEND_URL=
```

Frontend

```env
VITE_API_BASE=

VITE_MAPBOX_TOKEN=

VITE_RECAPTCHA_SITEKEY=
```

---

# 📸 Screenshots

## Home

(Add Screenshot)

---

## Route Creation

(Add Screenshot)

---

## Login

(Add Screenshot)

---

## Matches

(Add Screenshot)

---

## Chat

(Add Screenshot)

---

## Vehicle Registration

(Add Screenshot)

---

# 🚀 Future Improvements

- 📱 Android Application
- 🍎 iOS Application
- 🤖 AI Route Recommendations
- 🧠 Smart Ride Prediction
- 📍 Google Maps Integration
- 💳 Online Payments
- ⭐ Driver Ratings
- ⭐ Passenger Ratings
- 🔔 Push Notifications
- 📊 Admin Dashboard
- 📈 Analytics
- 🌍 Multi-language Support

---

# 👨‍💻 Contributors

Ahmed Shahzad

- Authentication
- Route Management
- Database Integration
- Deployment

Mahnoor Khizar

- Vehicle Module
- Booking System
- Ride Management

Zehran

- Real-Time Chat
- Socket.IO
- Security Features

---

# 📚 Learning Outcomes

This project demonstrates practical implementation of:

- MERN Stack Development
- REST APIs
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- Google reCAPTCHA
- Real-Time Communication
- Cloud Deployment
- Environment Variables
- MVC Architecture
- Socket Programming
- API Integration

---

# ⭐ Quote

> **"There is nothing I cannot learn."**
>
> — Ahmed Shahzad

---

<div align="center">

Made with ❤️ using the MERN Stack

</div>
