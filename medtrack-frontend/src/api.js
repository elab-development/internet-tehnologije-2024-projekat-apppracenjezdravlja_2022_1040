
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // npr. http://localhost:8000/api
});

// Ubaci Bearer token ako postoji
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ako 401, izbaci na /login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);