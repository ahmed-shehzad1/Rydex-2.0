import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Leaf, Users, Zap, Code, Lightbulb, Sparkles,
  MessageCircle, Mail, Phone, ArrowRight, CheckCircle,
  Globe, Rocket, Award, TrendingUp, ChevronRight
} from 'lucide-react';

const About = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const founders = [
    {
      name: "Ahmed Shahzad",
      role: "Co-Founder & Tech Lead",
      bio: "Full-stack developer with 5+ years of experience",
      quote: "Technology should solve real problems",
      initials: "AS",
      color1: "#10b981",
      color2: "#14b8a6",
    },
    {
      name: "Mahnoor Khizar",
      role: "Co-Founder & Product Lead",
      bio: "Passionate about user experience and design",
      quote: "Safety and community matter most",
      initials: "MK",
      color1: "#14b8a6",
      color2: "#059669",
    },
  ];

  const team = [
    {
      name: "Ahmed Shahzad",
      role: "Backend & DevOps Engineer",
      description: "Architecting scalable infrastructure",
      icon: Code,
      color1: "#10b981",
      color2: "#14b8a6",
    },
    {
      name: "Mahnoor Khizar",
      role: "Frontend & Product Designer",
      description: "Creating beautiful user experiences",
      icon: Lightbulb,
      color1: "#14b8a6",
      color2: "#059669",
    },
    {
      name: "Zerhan Wasim",
      role: "Mobile & UX Specialist",
      description: "Building intuitive mobile solutions",
      icon: Sparkles,
      color1: "#059669",
      color2: "#10b981",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Verified profiles and secure tracking systems ensure every journey is protected",
      number: "01",
      bgColor: "#dcfce7",
      iconColor: "#059669",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Reduce carbon footprints by sharing rides and building a greener future",
      number: "02",
      bgColor: "#ccfbf1",
      iconColor: "#14b8a6",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with like-minded travelers and build lasting friendships",
      number: "03",
      bgColor: "#a7f3d0",
      iconColor: "#10b981",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology powering seamless travel experiences",
      number: "04",
      bgColor: "#5eead4",
      iconColor: "#0d9488",
    },
  ];

  const timeline = [
    {
      year: "2024",
      quarter: "Q3",
      title: "The Idea",
      description: "Ahmed and Mahnoor identify the daily commute problem",
      icon: "💡",
    },
    {
      year: "2024",
      quarter: "Q4",
      title: "MVP Launch",
      description: "First version released with core matching features",
      icon: "🚀",
    },
    {
      year: "2025",
      quarter: "Q1",
      title: "Beta Testing",
      description: "100+ users actively testing and providing feedback",
      icon: "✅",
    },
    {
      year: "2025",
      quarter: "Q2",
      title: "Official Launch",
      description: "Full platform release with SafeRide verification",
      icon: "🎉",
    },
  ];

  const stats = [
    { label: "Team Members", value: "3", icon: Users },
    { label: "Active Users", value: "100+", icon: TrendingUp },
    { label: "Routes Active", value: "50+", icon: Globe },
    { label: "Safety Score", value: "99%", icon: Award },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* ===== HERO SECTION - REDESIGNED ===== */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '80px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #ffffff 100%)',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.15), transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '-150px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(20, 184, 166, 0.1), transparent)',
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 20px',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '50px',
              border: '2px solid #d1fae5',
              backgroundColor: '#ecfdf5',
              padding: '12px 24px',
              marginBottom: '30px',
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#059669',
            }}>Welcome to Travel Matcher</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '20px',
              color: '#1f2937',
              letterSpacing: '-0.02em',
            }}
          >
            Connecting Every
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginTop: '10px',
            }}>
              Journey Matters
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: '1.6',
            }}
          >
            Transform your daily commute into an opportunity to connect with others, reduce carbon emissions, and save money.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#10b981',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Your Journey
              <ArrowRight size={18} />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '16px',
                color: '#10b981',
                backgroundColor: '#f0fdf4',
                border: '2px solid #d1fae5',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ecfdf5';
                e.currentTarget.style.borderColor = '#a7f3d0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f0fdf4';
                e.currentTarget.style.borderColor = '#d1fae5';
              }}
            >
              Learn More
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section style={{
        padding: '60px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  marginBottom: '16px',
                }}>
                  <Icon style={{ color: '#059669', width: '28px', height: '28px' }} />
                </div>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '8px',
                }}>
                  {stat.label}
                </p>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== OUR STORY SECTION ===== */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '50px',
                border: '1px solid #d1fae5',
                backgroundColor: '#ecfdf5',
                padding: '8px 16px',
                marginBottom: '24px',
              }}
            >
              <CheckCircle size={16} style={{ color: '#059669' }} />
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#059669',
              }}>Our Story</span>
            </motion.div>

            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '24px',
              lineHeight: '1.3',
            }}>
              Born from a Daily Struggle
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.8',
                marginBottom: '16px',
              }}>
                <strong>Ahmed Shahzad</strong> and <strong>Mahnoor Khizar</strong> faced the same problem every single day: navigating the chaos of public transportation, dealing with expensive ride-sharing costs, and the anxiety of uncertainty in getting to their destination safely.
              </p>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.8',
                marginBottom: '16px',
              }}>
                But they realized they weren't alone. Thousands of people were traveling the exact same routes at the exact same times—often in empty cars or overcrowded buses. It seemed wasteful. It seemed wrong.
              </p>
              <p style={{
                fontSize: '16px',
                color: '#10b981',
                lineHeight: '1.8',
                marginBottom: '16px',
                fontStyle: 'italic',
                fontWeight: '600',
              }}>
                "Why can't we just help each other get there?"
              </p>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.8',
              }}>
                That simple question became our mission. We built Travel Matcher to make safe, reliable, and affordable travel a reality for everyone.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '32px',
              }}
            >
              <div>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  50+
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                }}>
                  Active Routes
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  100+
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                }}>
                  Beta Testers
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  1000+
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                }}>
                  Miles Saved
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              height: '400px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
            }} />
            <img
              src="src/components/assets/73e5fe95-3917-45bf-9345-37690c9a971b.jpg"
              alt="Our Team"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0,
              }}
              onError={(e) => {
                e.target.parentElement.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; font-size: 64px;">🚗</div>`;
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#ffffff',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '50px',
                border: '1px solid #d1fae5',
                backgroundColor: '#ecfdf5',
                padding: '8px 16px',
                marginBottom: '16px',
              }}
            >
              <Award size={16} style={{ color: '#059669' }} />
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#059669',
              }}>Our Values</span>
            </motion.div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '12px',
            }}>
              What We Stand For
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Every decision we make is guided by these core principles
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  style={{
                    position: 'relative',
                    padding: '32px',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '24px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${value.bgColor} 0%, ${value.bgColor} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)',
                  }}>
                    <Icon style={{
                      color: value.iconColor,
                      width: '24px',
                      height: '24px',
                    }} />
                  </div>

                  <div style={{ paddingTop: '20px' }}>
                    <p style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: '#10b981',
                      marginBottom: '8px',
                    }}>
                      {value.number}
                    </p>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '12px',
                    }}>
                      {value.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      lineHeight: '1.6',
                    }}>
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== FOUNDERS SECTION ===== */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '50px',
                border: '1px solid #d1fae5',
                backgroundColor: '#ecfdf5',
                padding: '8px 16px',
                marginBottom: '16px',
              }}
            >
              <Users size={16} style={{ color: '#059669' }} />
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#059669',
              }}>Leadership</span>
            </motion.div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '12px',
            }}>
              Meet Our Founders
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Two visionaries on a mission to revolutionize commuting
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}>
            {founders.map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  padding: '40px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${founder.color1} 0%, ${founder.color2} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: '0 auto 24px',
                  boxShadow: `0 15px 35px ${founder.color1}40`,
                }}>
                  {founder.initials}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px',
                }}>
                  {founder.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '8px',
                }}>
                  {founder.role}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginBottom: '16px',
                }}>
                  {founder.bio}
                </p>
                <p style={{
                  fontSize: '15px',
                  color: '#1f2937',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                }}>
                  "{founder.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE SECTION - CARD BASED ===== */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#ffffff',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '50px',
                border: '1px solid #d1fae5',
                backgroundColor: '#ecfdf5',
                padding: '8px 16px',
                marginBottom: '16px',
              }}
            >
              <Rocket size={16} style={{ color: '#059669' }} />
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#059669',
              }}>Journey</span>
            </motion.div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '12px',
            }}>
              Our Milestones
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              From concept to launch - our exciting journey so far
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#10b981';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(16, 185, 129, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
                }} />

                {/* Icon emoji */}
                <div style={{
                  fontSize: '40px',
                  marginBottom: '16px',
                }}>
                  {item.icon}
                </div>

                {/* Timeline info */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#ffffff',
                    backgroundColor: '#10b981',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {item.year}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    backgroundColor: '#f3f4f6',
                    padding: '4px 12px',
                    borderRadius: '20px',
                  }}>
                    {item.quarter}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px',
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '50px',
                border: '1px solid #d1fae5',
                backgroundColor: '#ecfdf5',
                padding: '8px 16px',
                marginBottom: '16px',
              }}
            >
              <Code size={16} style={{ color: '#059669' }} />
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#059669',
              }}>Team</span>
            </motion.div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '12px',
            }}>
              Expert Craftsmanship
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Talented professionals building the future of travel
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}
          >
            {team.map((member, idx) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  style={{
                    padding: '32px',
                    borderRadius: '16px',
                    border: '2px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(16, 185, 129, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    setActiveTeamMember(idx);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${member.color1} 0%, ${member.color2} 100%)`,
                  }} />

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${member.color1} 0%, ${member.color2} 100%)`,
                    marginBottom: '20px',
                    boxShadow: `0 10px 25px ${member.color1}40`,
                  }}>
                    <Icon style={{ color: '#ffffff', width: '32px', height: '32px' }} />
                  </div>

                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '8px',
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '12px',
                  }}>
                    {member.role}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.6',
                  }}>
                    {member.description}
                  </p>

                  {activeTeamMember === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid #e5e7eb',
                      }}
                    >
                      <p style={{
                        fontSize: '12px',
                        color: '#6b7280',
                      }}>
                        Leading the way in {member.role.split(" & ")[0]}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section style={{
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #1f2937 0%, #059669 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.1), transparent)',
          pointerEvents: 'none',
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginBottom: '60px',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                marginBottom: '16px',
              }}
            >
              <MessageCircle size={16} style={{ color: '#a7f3d0' }} />
              <span style={{
                fontSize: '12px',
                fontWeight: '600',
                color: '#a7f3d0',
              }}>Get In Touch</span>
            </motion.div>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '12px',
            }}>
              Let's Connect
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#d1fae5',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              Have questions? We'd love to hear from you
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: Mail,
                label: "Email",
                value: "support@travelMatcher.com",
                link: "mailto:support@travelMatcher.com",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+92 300-1234567",
                link: "tel:+923001234567",
              },
              {
                icon: MessageCircle,
                label: "Live Chat",
                value: "Available 24/7",
                link: "#",
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={idx}
                  variants={itemVariants}
                  href={contact.link}
                  style={{
                    padding: '32px',
                    borderRadius: '16px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                    marginBottom: '16px',
                  }}>
                    <Icon style={{ color: '#ffffff', width: '24px', height: '24px' }} />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#a7f3d0',
                    marginBottom: '8px',
                  }}>
                    {contact.label}
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                  }}>
                    {contact.value}
                  </p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section style={{
        padding: '80px 20px',
        backgroundColor: '#f9fafb',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '20px',
            }}>
              Ready to Transform Your Commute?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '40px',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 40px',
            }}>
              Join thousands of commuters already experiencing safer, more sustainable, and more affordable travel with Travel Matcher.
            </p>

            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 40px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#10b981',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Your Journey
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        padding: '40px 20px',
        backgroundColor: '#1f2937',
        borderTop: '1px solid #374151',
        color: '#9ca3af',
        textAlign: 'center',
      }}>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
          © 2026 Travel Matcher. All rights reserved.
        </p>
        <p style={{ fontSize: '13px' }}>
          Connecting journeys, building communities.
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
