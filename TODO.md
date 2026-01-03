# Render Deployment Steps - AI Code Review System

## Pre-Deployment Checklist
- [ ] 1. Push code to GitHub
- [ ] 2. Get OPENAI_API_KEY ready
- [ ] 3. Verify render.yaml is configured correctly ✓
- [ ] 4. Fix frontend API configuration ✓

## Deployment Steps

### Step 1: Push to GitHub
```bash
cd /Users/banji/Documents/Coding /Projects/AI Code Review System
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### Step 2: Deploy Backend API on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect `render.yaml` and show you both services
5. For the API service:
   - **Build Command**: `pip install -r api/requirements.txt`
   - **Start Command**: `uvicorn api.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**: Add `OPENAI_API_KEY` (get from https://platform.openai.com/api-keys)
6. Click "Apply" and wait for deployment
7. Copy the backend URL (e.g., `https://ai-code-review-api.onrender.com`)

### Step 3: Frontend Auto-Configures
The frontend static site will automatically:
- Detect the backend URL from the Blueprint
- Build with `VITE_BACKEND_URL` set to the backend service URL
- Deploy as a static site

### Step 4: Verify Deployment
After both services are deployed:
- **Backend API**: `https://your-api-name.onrender.com` → Should show `{"status":"running","service":"AI Code Review API"}`
- **Frontend**: `https://your-frontend-name.onrender.com` → Should show your React app

### Step 5: Test the Application
1. Open the frontend URL in your browser
2. Try submitting a code snippet for review
3. Verify the review works and displays results

## Production URLs (After Deployment)
Replace with your actual Render URLs:
- **Frontend**: https://ai-code-review-frontend.onrender.com
- **Backend API**: https://ai-code-review-api.onrender.com

## Troubleshooting
- If API returns 500: Check `OPENAI_API_KEY` is set correctly
- If frontend can't connect: Verify `VITE_BACKEND_URL` is set in frontend env vars
- If database errors: Render uses ephemeral filesystem, so `/tmp/reviews.db` is used

## Important Notes
- Backend database resets on each deployment (stored in `/tmp/`)
- Both services are free tier eligible on Render
- OpenAI API calls cost money based on usage

