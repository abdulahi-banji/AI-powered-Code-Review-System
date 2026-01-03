import axios from "axios";

// Use environment variable for backend URL, default to localhost for development
const getApiBaseUrl = () => {
  // For production (Vercel), use the Vercel API route
  if (import.meta.env.PROD || import.meta.env.VITE_USE_VERCEL_API) {
    return "/api";
  }
  // For development, use localhost
  return "http://localhost:8000";
};

const API = axios.create({
  baseURL: getApiBaseUrl(),
});

export const reviewCode = (code, language) =>
  API.post("/review", { code_snippet: code, language });
