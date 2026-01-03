# Deployment Plan for Render (All-in-One)

## Overview
Deploy the entire AI Code Review System on Render:
- **Backend**: FastAPI (Python) - `/api` folder
- **Frontend**: React + Vite static site - `/frontend` folder

## Files Created
- `render.yaml` - Render Blueprints configuration for automated deployment

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and configure both services
6. Add your `OPENAI_API_KEY` environment variable when prompted

### Option 2: Manual Deployment

#### Step 1: Deploy Backend API
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `pip install -r api/requirements.txt`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**: Add `OPENAI_API_KEY`
5. Deploy and copy your API URL (e.g., `https://ai-code-review-api.onrender.com`)

#### Step 2: Deploy Frontend
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create a new **Static Site**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Static Publish Path**: `frontend/dist`
5. Add Environment Variable:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: Your backend API URL (from Step 1)
6. Deploy

## Production URLs
After deployment:
- **Frontend**: https://ai-code-review-frontend.onrender.com
- **Backend API**: https://ai-code-review-api.onrender.com

## Local Development
```bash
# Backend (Terminal 1)
cd api && uvicorn main:app --reload

# Frontend (Terminal 2)
cd frontend && npm run dev
```

## Environment Variables
Required:
- `OPENAI_API_KEY` - Get from [OpenAI Platform](https://platform.openai.com/api-keys)

For frontend build:
- `VITE_BACKEND_URL` - Your Render backend URL (auto-set in render.yaml)

## Notes
- The backend uses `/tmp/reviews.db` for SQLite (required for Render's ephemeral filesystem)
- Frontend automatically connects to backend using `VITE_BACKEND_URL` environment variable
- Both services are configured in `render.yaml` for easy Blueprint deployment

