import axios from "axios";

// Dynamic API URL - works both locally and on Vercel
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    return "/api";
  }
  return "http://localhost:8000/api";
};

const API = axios.create({
  baseURL: getApiBaseUrl(),
});

export const reviewCode = (code, language) =>
  API.post("/review", { code_snippet: code, language });
