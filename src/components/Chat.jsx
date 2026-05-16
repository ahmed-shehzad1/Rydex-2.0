import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { X, Send, User } from "lucide-react";
import { getAvatarUrl } from "../Utils/avatarHelper"; // ✅ NEW

export default function Chat({ routeId, partnerName, myId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const endRef = useRef(null);
  
  const base = (import.meta.env.VITE_API_BASE || "http://localhost:5000/api").replace(/\/$/, "");

  // 1. Poll for messages every 2 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [routeId]);

  // 2. Scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${base}/chat/${routeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) { 
      // ✅ FIX: If 404 (Not Found), treat as empty array
      if (err.response && err.response.status === 404) {
        setMessages([]);
      } else {
        console.error("Chat load error", err); 
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");
      
      // Optimistic Update: Show message immediately before server confirms
      const tempMsg = { 
        content: newMessage, 
        sender: { _id: myId, name: "You", email: "" }, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, tempMsg]);
      setNewMessage("");

      await axios.post(`${base}/chat/send`, {
        routeId,
        content: tempMsg.content
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      // Refresh to get official server timestamp/ID
      fetchMessages(); 
    } catch (err) { 
      console.error("Send error", err);
      alert("Message failed to send.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        
        {/* HEADER */}
        <div style={styles.header}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{background:'rgba(255,255,255,0.2)', padding:8, borderRadius:'50%'}}>
              <User size={20} color="white"/>
            </div>
            <div>
              <div style={{fontSize:'0.75rem', opacity:0.8}}>Chatting with</div>
              <div style={{fontWeight:'bold', fontSize:'1rem'}}>{partnerName || "User"}</div>
            </div>
          </div>
          <button onClick={onClose} style={styles.closeBtn}><X size={20}/></button>
        </div>

        {/* MESSAGES LIST */}
        <div style={styles.list}>
          {messages.length === 0 && (
            <div style={{textAlign:'center', color:'#999', marginTop:40, fontSize:'0.9rem'}}>
              No messages yet.<br/>Say "Hi" to start coordination!
            </div>
          )}
          
          {/* ✅ FIX: Avatar logic INSIDE the map */}
          {messages.map((msg, i) => {
            const sender = msg.sender || {};
            const senderId = sender._id;
            const isMe = String(senderId) === String(myId);
            
            // ✅ FIX: Use centralized avatar helper
            const avatar = getAvatarUrl(sender);

            return (
              <div key={i} style={{
                ...styles.bubble,
                alignSelf: isMe ? "flex-end" : "flex-start",
                background: isMe ? "#0b79ff" : "#f3f4f6",
                color: isMe ? "white" : "black",
              }}>
                
                {/* Avatar + name (only for other user) */}
                {!isMe && (
                  <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                    <img
                      src={avatar}
                      alt="pfp"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        marginRight: 6,
                        objectFit: "cover"
                      }}
                    />
                    <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                      {sender.name || partnerName}
                    </div>
                  </div>
                )}

                {/* Message content */}
                <div style={{ fontSize: "0.95rem", lineHeight: "1.4" }}>
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* INPUT */}
        <form onSubmit={sendMessage} style={styles.inputArea}>
          <input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
          />
          <button type="submit" style={styles.sendBtn} disabled={!newMessage.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display:'flex', justifyContent:'center', alignItems:'center' },
  box: { width: '90%', maxWidth: '400px', height: '80vh', maxHeight:'600px', background: 'white', borderRadius: '16px', display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 20px 50px rgba(0,0,0,0.3)' },
  header: { background: '#0b79ff', color: 'white', padding: '15px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #005ecb' },
  closeBtn: { background: 'none', border:'none', color:'white', cursor:'pointer', padding:5 },
  list: { flex: 1, padding: '15px', overflowY: 'auto', display:'flex', flexDirection:'column', gap: '8px', background:'#fff' },
  bubble: { padding: '10px 14px', borderRadius: '12px', maxWidth: '75%', wordWrap: 'break-word', boxShadow:'0 1px 2px rgba(0,0,0,0.05)' },
  inputArea: { padding: '15px', borderTop:'1px solid #eee', display:'flex', gap:'10px', background:'#fff' },
  input: { flex: 1, padding: '12px', borderRadius: '25px', border:'1px solid #ddd', outline:'none', background:'#f9fafb' },
  sendBtn: { background: '#0b79ff', color:'white', border:'none', borderRadius:'50%', width:'42px', height:'42px', display:'flex', justifyContent:'center', alignItems:'center', cursor:'pointer', transition:'0.2s' }
};