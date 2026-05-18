import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import { MapPin, Shield, Zap, DollarSign, Users, ArrowRight, Star, Search, Car, Calendar, TrendingUp, Leaf, Lock, ChevronRight, Smartphone, Headphones, Award, Globe, BarChart3, Fuel, Smile } from "lucide-react";
import { getAvatarUrl } from "../Utils/avatarHelper";
import travelVideo from "../components/assets/stock-video 1.mp4";
export default function Landing() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(0);

  const testimonials = [
    {
      name: "Ali Khan",
      role: "Passenger • Lahore to Islamabad",
      email: "ali@example.com",
      rating: 5,
      text: "Used to take the bus, but Rydex is so much faster. The driver was professional and we actually had a great chat about cricket on the way!"
    },
    {
      name: "Sarah Ahmed",
      role: "Driver • Karachi to Hyderabad",
      email: "sarah@example.com",
      rating: 5,
      text: "I drive this route every weekend for work. Listing my seat covers my entire petrol cost. The verification system makes me feel safe."
    },
    {
      name: "Usman Z.",
      role: "Passenger • Daily Commute",
      email: "usman@example.com",
      rating: 5,
      text: "Honest pricing. No haggling. The app just works. Highly recommend for students who want to travel comfortably on a budget."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Rides Shared", icon: Car },
    { number: "2.5M", label: "KM Saved", icon: Leaf },
    { number: "4.9★", label: "Average Rating", icon: Star }
  ];

  const faqs = [
    {
      q: "Is Rydex safe?",
      a: "Yes! Every user is verified via CNIC, phone, and email. Drivers submit license and vehicle documents. We have 24/7 support and emergency alerts."
    },
    {
      q: "How are prices calculated?",
      a: "Prices are fixed based on fuel consumption, distance, and number of passengers. No surge pricing, ever. Transparent pricing guaranteed."
    },
    {
      q: "Can I cancel a ride?",
      a: "Yes, you can cancel free of charge up to 1 hour before the ride starts. Full refund in case of cancellation."
    },
    {
      q: "What if there's an emergency?",
      a: "Press the Emergency button in-app to instantly alert authorities, our team, and your emergency contacts with live location."
    },
    {
      q: "Do you operate nationwide?",
      a: "Yes! We operate across all major cities in Pakistan. Check our app to see available routes in your area."
    },
    {
      q: "Is payment secure?",
      a: "Absolutely. All payments are encrypted and processed through secure payment gateways. No cash transactions needed."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div style={{
  background: "#ffffff",
  overflowX: "hidden",
  width: "100%",
  position: "relative"
}}>
      
      {/* ===== HERO SECTION ===== */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f9fafb 100%)",
        paddingTop: "80px",
        paddingBottom: "100px",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center"
      }}>
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 150,
            height: 150,
            background: "rgba(52, 211, 153, 0.3)",
            borderRadius: "50%",
            filter: "blur(80px)",
            zIndex: 0
          }}
        />
        
        <motion.div 
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: 200,
            height: 200,
            background: "rgba(5, 150, 105, 0.2)",
            borderRadius: "50%",
            filter: "blur(100px)",
            zIndex: 0
          }}
        />

        {/* Floating Circles */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "2px solid #34d399",
            opacity: 0.2,
            zIndex: 0
          }}
        />

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: "25%",
            left: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "2px solid #059669",
            opacity: 0.15,
            zIndex: 0
          }}
        />

        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <div style={{ maxWidth: "700px" }}>
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                background: "rgba(52, 211, 153, 0.2)",
                border: "2px solid #34d399",
                borderRadius: "50px",
                marginBottom: "30px"
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, background: "#10b981", borderRadius: "50%" }}
              />
              <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#059669" }}>
                🚗 Trusted by 10,000+ Users
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                fontWeight: "900",
                lineHeight: 1.2,
                marginBottom: "20px",
                color: "#0f172a"
              }}
            >
              Share the ride,<br/>
              <span style={{ background: "linear-gradient(135deg, #059669 0%, #10b981 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                split the cost.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                fontSize: "1.2rem",
                lineHeight: 1.6,
                color: "#475569",
                marginBottom: "40px",
                maxWidth: "600px"
              }}
            >
              Join Pakistan's fastest growing carpooling community. Connect with verified drivers, travel comfortably, and save up to 70% on your daily commute.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                marginBottom: "50px"
              }}
            >
              <Link to="/matches" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    fontSize: "1.05rem",
                    fontWeight: "700",
                    color: "white",
                    background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(5, 150, 105, 0.2)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <Search size={20} /> Find a Ride
                </motion.button>
              </Link>

              <Link to="/add" style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "16px 32px",
                    fontSize: "1.05rem",
                    fontWeight: "700",
                    color: "#059669",
                    background: "rgba(52, 211, 153, 0.1)",
                    border: "2px solid #34d399",
                    borderRadius: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  <Car size={20} /> Offer a Ride
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Signal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                fontSize: "0.95rem",
                color: "#666"
              }}
            >
              
              <div style={{ display: "flex", marginRight: "10px" }}>
                {[1,2,3].map(i => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/32?img=${i}`}
                    alt="User"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "2px solid white",
                      marginLeft: i === 1 ? 0 : "-10px"
                    }}
                  />
                ))}
              </div>
              <span><strong>2,847</strong> people booked a ride this week</span>
            </motion.div>
          </div>
          
        </motion.div>
      </section>

      {/* ===== ANIMATED MARQUEE ===== */}
      <div style={{
        background: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
        padding: "15px 0",
        overflow: "hidden",
        position: "relative"
      }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            gap: "40px"
          }}
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} style={{
              color: "white",
              fontWeight: "600",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Zap size={16} /> TRUSTED BY 10,000+ USERS
            </span>
          ))}
        </motion.div>
      </div>

      {/* ===== STATS SECTION ===== */}
      <section style={{
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        padding: "100px 20px",
        position: "relative"
      }}>
        <motion.div
          animate={{ 
            y: [0, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "50%",
            right: "5%",
            width: 300,
            height: 300,
            background: "rgba(16, 185, 129, 0.1)",
            borderRadius: "50%",
            filter: "blur(100px)",
            transform: "translateY(-50%)"
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "15px",
              color: "#0f172a"
            }}>
              Trusted by Thousands
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              Growing every single day across Pakistan
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "30px"
            }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.15)" }}
                  style={{
                    textAlign: "center",
                    padding: "40px 30px",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(5, 150, 105, 0.1)",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                    style={{
                      color: "#059669",
                      marginBottom: "15px",
                      display: "flex",
                      justifyContent: "center"
                    }}
                  >
                    <Icon size={32} />
                  </motion.div>
                  <div style={{
                    fontSize: "2.5rem",
                    fontWeight: "900",
                    color: "#059669",
                    marginBottom: "8px"
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: "0.95rem",
                    color: "#666",
                    fontWeight: "500"
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{
        padding: "100px 20px",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden"
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 150,
            height: 150,
            border: "2px solid rgba(5, 150, 105, 0.1)",
            borderRadius: "50%"
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "15px",
              color: "#0f172a"
            }}>
              How Rydex Works
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              Just three simple steps to your perfect ride
            </p>
          </motion.div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            marginBottom: "60px"
          }}>
            {[
              {
                number: "01",
                title: "Search",
                desc: "Browse available drivers going your way",
                icon: Search
              },
              {
                number: "02",
                title: "Book",
                desc: "Secure your seat with one click",
                icon: Calendar
              },
              {
                number: "03",
                title: "Travel",
                desc: "Enjoy the ride and arrive safely",
                icon: Car
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(5, 150, 105, 0.15)" }}
                  onHoverStart={() => setActiveStep(idx)}
                  style={{
                    padding: "40px",
                    background: "linear-gradient(135deg, rgba(240, 253, 244, 0.5) 0%, rgba(236, 253, 245, 0.5) 100%)",
                    border: "2px solid rgba(5, 150, 105, 0.1)",
                    borderRadius: "16px",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    overflow: "hidden"
                  }}
                >
                  {/* Background decoration */}
                  <motion.div
                    animate={{ opacity: activeStep === idx ? 1 : 0 }}
                    style={{
                      position: "absolute",
                      top: "-50%",
                      right: "-50%",
                      width: "200px",
                      height: "200px",
                      background: "rgba(5, 150, 105, 0.05)",
                      borderRadius: "50%"
                    }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{
                      fontSize: "3rem",
                      fontWeight: "900",
                      color: "rgba(5, 150, 105, 0.1)",
                      marginBottom: "15px"
                    }}>
                      {step.number}
                    </div>

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        marginBottom: "20px",
                        boxShadow: "0 10px 30px rgba(5, 150, 105, 0.3)"
                      }}
                    >
                      <Icon size={32} />
                    </motion.div>

                    <h3 style={{
                      fontSize: "1.4rem",
                      fontWeight: "700",
                      color: "#059669",
                      marginBottom: "12px"
                    }}>
                      {step.title}
                    </h3>

                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "0.95rem"
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Connection Lines */}
          <svg style={{ width: "100%", height: "60px", marginTop: "-20px" }} viewBox="0 0 1000 60" preserveAspectRatio="none">
            <motion.line
              initial={{ strokeDashoffset: 1000 }}
              whileInView={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5 }}
              x1="0" y1="30" x2="1000" y2="30"
              stroke="#34d399"
              strokeWidth="2"
              strokeDasharray="1000"
              viewport={{ once: true }}
            />
          </svg>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section style={{
        padding: "100px 20px",
        background: "linear-gradient(135deg, #f0fdf4 0%, #f9fafb 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "15px",
              color: "#0f172a"
            }}>
              Why Choose Rydex?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              More than just a ride-sharing app
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px"
            }}
          >
            {[
              { icon: Shield, title: "100% Verified", desc: "Every member verified via CNIC" },
              { icon: DollarSign, title: "Low Fares", desc: "No surge pricing, ever" },
              { icon: Users, title: "Women Safety", desc: "Exclusive SafeRide filter" },
              { icon: MapPin, title: "Live Tracking", desc: "Share trip on WhatsApp" },
              { icon: Star, title: "Ratings", desc: "See driver reviews before booking" },
              { icon: Lock, title: "24/7 Support", desc: "Emergency alert button" }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(5, 150, 105, 0.2)" }}
                  style={{
                    padding: "35px",
                    background: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(5, 150, 105, 0.05)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "100px",
                    height: "100px",
                    background: "rgba(5, 150, 105, 0.05)",
                    borderRadius: "50%"
                  }} />
                  
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      marginBottom: "15px",
                      position: "relative",
                      zIndex: 1
                    }}
                  >
                    <Icon size={24} />
                  </motion.div>

                  <h3 style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "#0f172a",
                    marginBottom: "8px",
                    position: "relative",
                    zIndex: 1
                  }}>
                    {feature.title}
                  </h3>

                  <p style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    position: "relative",
                    zIndex: 1
                  }}>
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section style={{
  padding: "100px 20px",
  background: "white",
  position: "relative",
  overflow: "hidden"
}}>
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: 200,
            height: 200,
            background: "rgba(5, 150, 105, 0.1)",
            borderRadius: "50%",
            filter: "blur(80px)"
          }}
        />

        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}>
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              fontSize: "0.9rem",
              fontWeight: "700",
              color: "#059669",
              letterSpacing: "2px",
              marginBottom: "15px"
            }}>
              THE RYDEX EXPERIENCE
            </div>

            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              lineHeight: 1.2,
              marginBottom: "25px",
              color: "#0f172a"
            }}>
              Every mile tells a <span style={{ color: "#059669" }}>new story</span>
            </h2>

            <p style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "#666",
              marginBottom: "20px"
            }}>
              Whether you're driving home for Eid, commuting to Islamabad, or exploring northern areas, the journey matters as much as the destination.
            </p>

            <p style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "#666",
              marginBottom: "35px"
            }}>
              Connect with great people, listen to music, and turn a boring commute into an unforgettable road trip.
            </p>

            <Link to="/register" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.05, gap: "15px" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 32px",
                  fontSize: "1.05rem",
                  fontWeight: "700",
                  color: "white",
                  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(5, 150, 105, 0.2)",
                  transition: "all 0.3s ease"
                }}
              >
                Start Your Journey <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>

{/* Video Side */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  style={{
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 30px 60px rgba(5, 150, 105, 0.2)",
    position: "relative",
    width: "100%",
    maxWidth: "100%"
  }}
>
  <video
  className="travel-video"
  autoPlay
  loop
  muted
  playsInline
  style={{
  width: "100%",
  height: "500px",
  objectFit: "cover",
  display: "block",
  borderRadius: "20px"
}}
  >
    <source src={travelVideo} type="video/mp4" />
  </video>
</motion.div>
        </div>

        {/* Mobile Responsive */}
       {/* Mobile Responsive */}
<style>{`
  @media (max-width: 768px) {

    div[style*="gridTemplateColumns: 1fr 1fr"] {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }

    .travel-video {
      width: 100% !important;
      height: 280px !important;
      object-fit: cover !important;
      border-radius: 16px !important;
      display: block !important;
    }

    h2 {
      font-size: 2rem !important;
    }
  }

  @media (max-width: 480px) {

    .travel-video {
      height: 220px !important;
      border-radius: 14px !important;
    }

    h2 {
      font-size: 1.7rem !important;
      line-height: 1.3 !important;
    }
  }
`}</style>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{
        padding: "100px 20px",
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "15px",
              color: "#0f172a"
            }}>
              Trusted by Travelers
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              Don't just take our word for it
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "30px"
            }}
          >
            {testimonials.map((review, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(5, 150, 105, 0.15)" }}
                style={{
                  background: "white",
                  padding: "35px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(5, 150, 105, 0.1)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Star rating */}
                <div style={{ display: "flex", gap: "5px", marginBottom: "15px" }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star size={18} fill="#fbbf24" color="#fbbf24" />
                    </motion.div>
                  ))}
                </div>

                {/* Review text */}
                <p style={{
                  color: "#4b5563",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                  marginBottom: "25px",
                  fontStyle: "italic"
                }}>
                  "{review.text}"
                </p>

                {/* Author */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(5, 150, 105, 0.1)"
                }}>
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={getAvatarUrl({ name: review.name, email: review.email })}
                    alt={review.name}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #059669"
                    }}
                  />
                  <div>
                    <div style={{
                      fontWeight: "700",
                      color: "#0f172a",
                      fontSize: "0.95rem"
                    }}>
                      {review.name}
                    </div>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "#666"
                    }}>
                      {review.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section style={{
        padding: "100px 20px",
        background: "white"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "900",
              marginBottom: "15px",
              color: "#0f172a"
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#666" }}>
              Everything you need to know
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                style={{
                  overflow: "hidden",
                  borderRadius: "12px",
                  border: "1px solid rgba(5, 150, 105, 0.2)",
                  background: expandedFaq === idx ? "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)" : "white",
                  transition: "all 0.3s ease"
                }}
              >
                {/* Question */}
                <motion.button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
                  style={{
                    width: "100%",
                    padding: "20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "15px"
                  }}
                  whileHover={{ paddingLeft: "25px" }}
                >
                  <span style={{
                    fontSize: "1.05rem",
                    fontWeight: "600",
                    color: "#059669",
                    textAlign: "left"
                  }}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={24} color="#059669" />
                  </motion.div>
                </motion.button>

                {/* Answer */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedFaq === idx ? "auto" : 0,
                    opacity: expandedFaq === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{
                    padding: "0 20px 20px 20px",
                    color: "#666",
                    lineHeight: 1.8,
                    fontSize: "0.95rem"
                  }}>
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{
        padding: "100px 20px",
        background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        <motion.div
          animate={{ 
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: 400,
            height: 400,
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50%"
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "900",
            color: "white",
            marginBottom: "20px"
          }}>
            Ready to Save Money and Time?
          </h2>

          <p style={{
            fontSize: "1.1rem",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "40px",
            lineHeight: 1.6
          }}>
            Join thousands of commuters already experiencing safer, more sustainable, and affordable travel with Rydex.
          </p>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "18px 48px",
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "#059669",
                background: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease"
              }}
            >
              Get Started Today <ArrowRight size={20} style={{ marginLeft: "8px" }} />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        background: "#0f172a",
        color: "#e2e8f0",
        padding: "60px 20px 30px",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
          marginBottom: "40px"
        }}>
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "900",
              color: "white",
              margin: "0 0 15px 0"
            }}>
              Rydex.
            </h2>
            <p style={{
              color: "#94a3b8",
              lineHeight: 1.6,
              fontSize: "0.95rem"
            }}>
              Pakistan's premium carpooling solution. Safe, affordable, and eco-friendly travel for everyone.
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 style={{ color: "white", marginBottom: "15px", fontSize: "0.95rem", fontWeight: "700", letterSpacing: "1px" }}>
              COMPANY
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["About", "Careers", "Press", "Blog"].map(item => (
                <li key={item} style={{ marginBottom: "10px" }}>
                  <a href="#" style={{ color: "#94a3b8", textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.color = "#34d399"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 style={{ color: "white", marginBottom: "15px", fontSize: "0.95rem", fontWeight: "700", letterSpacing: "1px" }}>
              SUPPORT
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Help Center", "Safety", "Terms", "Privacy"].map(item => (
                <li key={item} style={{ marginBottom: "10px" }}>
                  <a href="#" style={{ color: "#94a3b8", textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.color = "#34d399"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 style={{ color: "white", marginBottom: "15px", fontSize: "0.95rem", fontWeight: "700", letterSpacing: "1px" }}>
              FOLLOW US
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Instagram", "Twitter", "Facebook", "LinkedIn"].map(item => (
                <li key={item} style={{ marginBottom: "10px" }}>
                  <a href="#" style={{ color: "#94a3b8", textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={e => e.target.style.color = "#34d399"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          paddingTop: "30px",
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.9rem"
        }}>
          <p style={{ margin: 0 }}>
            &copy; 2026 Rydex Technologies. All rights reserved. Built for the future of travel in Pakistan.
          </p>
        </div>
      </footer>
    </div>
  );
}