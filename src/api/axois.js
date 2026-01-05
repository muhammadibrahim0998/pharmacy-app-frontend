import axios from "axios";

// 👇 Base URL for backend API
// - In development, defaults to http://localhost:5000
// - In production (Vercel), set VITE_API_BASE_URL to "https://pharmacy-app-backend.onrender.com"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export { API_BASE_URL };
export default API;
