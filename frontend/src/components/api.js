const API_BASE = "http://localhost:8000/api";

export const reviewCode = async (code, language) => {
  const response = await fetch(`${API_BASE}/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code_snippet: code,
      language: language,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to review code");
  }

  return response.json();
};

