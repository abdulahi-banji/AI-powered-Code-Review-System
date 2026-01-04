from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
import sqlite3
import json
from datetime import datetime

# -------------------- SETUP --------------------

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not found in environment variables")

client = OpenAI(api_key=OPENAI_API_KEY)

app = FastAPI(title="AI Code Review API")

# Get CORS origins from environment variable
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
allowed_origins = [origin.strip() for origin in CORS_ORIGINS.split(",")] if CORS_ORIGINS != "*" else ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- DATABASE --------------------

DB_NAME = "/tmp/reviews.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            language TEXT,
            score INTEGER,
            bugs TEXT,
            optimizations TEXT,
            best_practices TEXT,
            created_at TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# -------------------- MODELS --------------------

class CodeReviewRequest(BaseModel):
    code_snippet: str
    language: str

# -------------------- ROUTES --------------------

@app.get("/")
def root():
    return {"status": "running", "service": "AI Code Review API"}

@app.post("/review")
def review_code(payload: CodeReviewRequest):
    if not payload.code_snippet.strip():
        raise HTTPException(status_code=400, detail="Code snippet cannot be empty")

    prompt = f"""
You are a strict senior software engineer performing a professional code review.

Analyze the following {payload.language} code.

Return ONLY valid JSON with this exact structure:

{{
  "bugs": [
    {{
      "line": 10,
      "severity": "high",
      "description": "Bug explanation",
      "suggestion": "How to fix it"
    }}
  ],
  "optimizations": [
    {{
      "line": 15,
      "type": "performance",
      "description": "Optimization opportunity",
      "suggestion": "Improved approach"
    }}
  ],
  "best_practices": [
    {{
      "category": "readability",
      "description": "Best practice recommendation"
    }}
  ],
  "score": 0
}}

Rules:
- Score must be from 0 to 100
- Be strict and realistic
- Use accurate line numbers
- If code quality is poor, score low
- Do NOT include markdown or explanations

Code:
{payload.code_snippet}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert code reviewer."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.9,
        )

        raw = response.choices[0].message.content.strip()

        # Clean possible markdown
        if raw.startswith("```"):
            raw = raw.split("```")[1].replace("json", "").strip()

        result = json.loads(raw)

        # Defensive defaults
        result.setdefault("bugs", [])
        result.setdefault("optimizations", [])
        result.setdefault("best_practices", [])
        result.setdefault("score", 70)

        # -------------------- SAVE TO SQLITE --------------------

        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO reviews (language, score, bugs, optimizations, best_practices, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                payload.language,
                result["score"],
                json.dumps(result["bugs"]),
                json.dumps(result["optimizations"]),
                json.dumps(result["best_practices"]),
                datetime.utcnow().isoformat(),
            ),
        )
        conn.commit()
        conn.close()

        return result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

