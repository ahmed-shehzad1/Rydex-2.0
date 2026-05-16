import React, { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    // emit change for other windows/components
    window.dispatchEvent(new Event("authChanged"));
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  async function register(payload) {
    const res = await authService.register(payload);
    if (res && res.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  }

  async function login(payload) {
    const res = await authService.login(payload);
    if (res && res.token) {
      setToken(res.token);
      setUser(res.user || null);
    }
    return res;
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}