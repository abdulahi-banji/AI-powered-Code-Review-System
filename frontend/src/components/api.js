import axios from 'axios';

// Get the backend URL from environment variable
// For Vercel deployment: uses VITE_BACKEND_URL from Render
// For Render deployment: uses VITE_BACKEND_URL
// For local development: defaults to localhost:8000
const getApiBaseUrl = () => {
  // Check for custom backend URL (Render deployment)
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

const API = axios.create({
  baseURL: getApiBaseUrl(),
});

export const reviewCode = (code, language) =>
  API.post("/review", { code_snippet: code, language });

export default API;

