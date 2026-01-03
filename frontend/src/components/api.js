import axios from 'axios';

// Get the backend URL from environment variable
// For Render deployment, this will be set to the backend API URL
// For local development, defaults to localhost
const getApiBaseUrl = () => {
  // Check if we're in production (Render)
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

