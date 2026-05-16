import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// optional: set axios base URL globally
const api = axios.create({ baseURL: BASE });

export async function register(user) {
  const res = await api.post("/auth/register", user);
  return res.data;
}

export async function login(creds) {
  const res = await api.post("/auth/login", creds);
  return res.data;
}