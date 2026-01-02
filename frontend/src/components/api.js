import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const reviewCode = (code, language) =>
  API.post("/review", { code_snippet: code, language });
