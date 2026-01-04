# 🚀 AI-Powered Code Review System

An intelligent code review application powered by OpenAI's GPT-4 that analyzes your code for bugs, optimizations, and best practices.

## 🌐 Live Deployment

**Frontend (Vercel)**: https://ai-powered-code-review-system-eight.vercel.app/

**Backend API (Render)**: https://ai-code-review-api.onrender.com

---

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses GPT-4 for intelligent code review
- 🐛 **Bug Detection** - Identifies potential bugs and security issues
- ⚡ **Optimization Suggestions** - Recommends performance improvements
- 📝 **Best Practices** - Guides on coding standards and style
- 📊 **Quality Scoring** - Provides a 0-100 code quality score
- 🌐 **Multi-Language Support** - Python, JavaScript, TypeScript, and more

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (Vercel)                   │
│         React + Vite + Tailwind CSS                  │
│  https://ai-powered-code-review-system-eight.vercel.app │
└─────────────────────┬───────────────────────────────┘
                      │ API Calls
                      ▼
┌─────────────────────────────────────────────────────┐
│                 Backend (Render)                     │
│              FastAPI + OpenAI GPT-4                  │
│               https://ai-code-review-api.onrender.com │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Local Development

#### 1. Backend Setup

```bash
# Navigate to API directory
cd api

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or: venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

---

## 🔧 API Usage

### Endpoint

```
POST https://ai-code-review-api.onrender.com/review
```

### Request Body

```json
{
  "code_snippet": "def hello():\n    print('Hello, World!')",
  "language": "python"
}
```

### Response

```json
{
  "bugs": [
    {
      "line": 1,
      "severity": "high",
      "description": "Bug explanation",
      "suggestion": "How to fix it"
    }
  ],
  "optimizations": [
    {
      "line": 1,
      "type": "performance",
      "description": "Optimization opportunity",
      "suggestion": "Improved approach"
    }
  ],
  "best_practices": [
    {
      "category": "readability",
      "description": "Best practice recommendation"
    }
  ],
  "score": 85
}
```

---

## 📁 Project Structure

```
AI Code Review System/
├── api/                      # FastAPI Backend
│   ├── main.py              # Main application
│   └── requirements.txt     # Python dependencies
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── api.js       # API configuration
│   │   │   ├── CodeReview.jsx
│   │   │   ├── Landing.jsx
│   │   │   └── Documentation.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── render.yaml              # Render deployment config
├── vercel.json              # Vercel deployment config
├── .vercelignore            # Vercel ignore rules
├── requirements.txt         # Root requirements
└── README.md               # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **OpenAI GPT-4** - AI analysis
- **SQLite** - Database
- **Pydantic** - Data validation

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting

---

## 🔐 Environment Variables

### Render Backend
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `CORS_ORIGINS` | Allowed frontend URLs (comma-separated) |

### Vercel Frontend
| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend API URL (Render) |

---

## 📖 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/review` | Analyze code |

### GET /
Returns API status.

**Response:**
```json
{
  "status": "running",
  "service": "AI Code Review API"
}
```

### POST /review
Analyzes code for bugs, optimizations, and best practices.

**Request Body:**
```json
{
  "code_snippet": "string",
  "language": "string"
}
```

**Response:**
```json
{
  "bugs": [],
  "optimizations": [],
  "best_practices": [],
  "score": 0-100
}
```

---

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Add environment variable:
   - `VITE_BACKEND_URL`: `https://ai-code-review-api.onrender.com`
5. Click "Deploy"

### Backend Deployment (Render)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Import your GitHub repository
4. Configure:
   - **Name**: `ai-code-review-api`
   - **Environment**: `Python 3.11`
   - **Build Command**: `pip install -r api/requirements.txt`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CORS_ORIGINS`: `https://ai-powered-code-review-system-eight.vercel.app`
6. Click "Create Web Service"

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License


This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for GPT-4
- [FastAPI](https://fastapi.tiangolo.com) for the backend framework
- [Vercel](https://vercel.com) for frontend hosting
- [Render](https://render.com) for backend hosting

---

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**⭐ Star this repository if you found it helpful!**

