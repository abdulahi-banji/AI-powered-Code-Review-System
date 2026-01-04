# Hybrid Deployment Guide: Backend (Render) + Frontend (Vercel)

This guide provides step-by-step instructions for deploying your AI Code Review System with:
- **Backend**: Render (FastAPI with no timeout limits)
- **Frontend**: Vercel (fast CDN and hosting)

## Prerequisites

Before you begin, ensure you have:

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Your code pushed to GitHub
4. **OpenAI API Key**: Get one at [platform.openai.com](https://platform.openai.com/api-keys)

---

## Step 1: Push Code to GitHub

```bash
# Navigate to your project directory
cd /Users/banji/Documents/Coding\ /Projects/AI\ Code\ Review\ System

# Add all files
git add .

# Commit changes
git commit -m "Configure for hybrid deployment: Render backend + Vercel frontend"

# Push to GitHub
git push origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account and Connect GitHub

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if prompted
4. Select your repository: `abdulahi-banji/AI-powered-Code-Review-System`

### 2.2 Configure Backend Service

Configure the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `ai-code-review-api` |
| **Environment** | `Python 3.11` |
| **Build Command** | `pip install -r api/requirements.txt` |
| **Start Command** | `uvicorn api.main:app --host 0.0.0.0 --port $PORT` |
| **Plan** | `Free` (or paid for better performance) |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variables**:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | `sk-your-openai-api-key-here` |
| `CORS_ORIGINS` | `https://your-vercel-frontend.vercel.app` |

**Important**: 
- Get your OpenAI API key at: https://platform.openai.com/api-keys
- The `CORS_ORIGINS` will be updated after deploying Vercel

### 2.4 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for build and deployment (2-5 minutes)
3. **Note your backend URL**: `https://ai-code-review-api.onrender.com`

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account and Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `abdulahi-banji/AI-powered-Code-Review-System`

### 3.2 Configure Environment Variables

In the Vercel deployment screen:

1. Click **"Environment Variables"**
2. Add the following variable:

| Key | Value |
|-----|-------|
| `VITE_BACKEND_URL` | `https://ai-code-review-api.onrender.com` |

**Important**: Replace with your actual Render backend URL from Step 2.4

3. Click **"Add"**

### 3.3 Deploy Frontend

1. Click **"Deploy"**
2. Wait for build and deployment (1-2 minutes)
3. **Note your frontend URL**: `https://your-project-name.vercel.app`

---

## Step 4: Update CORS on Render

After deploying Vercel, update your Render backend to allow requests from your Vercel frontend:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **ai-code-review-api** service
3. Click **"Environment Variables"**
4. Update `CORS_ORIGINS`:
   - **Key**: `CORS_ORIGINS`
   - **Value**: `https://your-project-name.vercel.app`
5. Click **"Save Changes"**
6. Trigger a redeploy by clicking **"Deploy"** → **"Deploy latest commit"**

---

## Step 5: Test Your Deployment

### Test Backend API

```bash
# Replace with your actual backend URL
curl -X POST https://ai-code-review-api.onrender.com/review \
  -H "Content-Type: application/json" \
  -d '{
    "code_snippet": "def hello():\n    print('Hello, World!')",
    "language": "python"
  }'
```

### Test Frontend

1. Open your Vercel frontend URL: `https://your-project-name.vercel.app`
2. Try the code review feature
3. Check browser console for any errors

---

## Your Deployed URLs

| Service | URL |
|---------|-----|
| **Frontend (Vercel)** | `https://your-project-name.vercel.app` |
| **Backend API (Render)** | `https://ai-code-review-api.onrender.com` |
| **API Endpoint** | `https://ai-code-review-api.onrender.com/review` |

---

## Environment Variables Summary

### Render Backend

| Variable | Value |
|----------|-------|
| `OPENAI_API_KEY` | `sk-your-openai-api-key-here` |
| `CORS_ORIGINS` | `https://your-vercel-frontend.vercel.app` |
| `PYTHON_VERSION` | `3.11.0` |

### Vercel Frontend

| Variable | Value |
|----------|-------|
| `VITE_BACKEND_URL` | `https://ai-code-review-api.onrender.com` |

---

## Troubleshooting

### Issue: CORS Errors

**Symptoms**: Browser console shows CORS errors

**Solution**:
1. Ensure `CORS_ORIGINS` on Render includes your Vercel frontend URL
2. Redeploy Render backend after updating CORS_ORIGINS
3. Check for typos in the URL

### Issue: Backend Not Responding

**Symptoms**: API calls timeout or fail

**Solution**:
1. Check Render service logs for errors
2. Verify `OPENAI_API_KEY` is valid
3. Ensure Render service is running (not suspended)
4. Free tier services suspend after 15 minutes of inactivity

### Issue: Frontend Can't Connect to Backend

**Symptoms**: Network errors in browser console

**Solution**:
1. Verify `VITE_BACKEND_URL` is set correctly in Vercel
2. Ensure backend URL is accessible (no typos)
3. Check that backend CORS allows your frontend origin

### Issue: OpenAI API Errors

**Symptoms**: "Invalid API key" or quota errors

**Solution**:
1. Verify `OPENAI_API_KEY` in Render dashboard
2. Check OpenAI account has credits
3. Ensure API key hasn't expired

---

## Project Structure

```
your-project/
├── api/
│   ├── main.py              # FastAPI backend (Render)
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── api.js       # Configured for Render backend
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── render.yaml              # Render configuration (backend only)
├── vercel.json              # Vercel configuration (frontend only)
└── README.md
```

---

## Managing Deployments

### Update Backend (Render)

1. Push changes to GitHub
2. Render auto-deploys from main branch
3. Or manually trigger deploy in Render dashboard

### Update Frontend (Vercel)

1. Push changes to GitHub
2. Vercel auto-deploys from main branch
3. Or manually trigger deploy in Vercel dashboard

### Monitor Logs

- **Backend Logs**: Render Dashboard → Your Service → Logs
- **Frontend Logs**: Vercel Dashboard → Your Project → Logs

---

## Scaling and Performance

### Render (Backend)

- **Free Tier**: Suitable for testing, suspends after 15 min inactivity
- **Paid Tier**: $7/month for always-on instance
- No timeout limits on paid plans

### Vercel (Frontend)

- **Free Tier**: Generous bandwidth and builds
- **Pro Tier**: $20/month for more features
- Global CDN for fast loading

---

## Custom Domains

### Add Custom Domain to Vercel

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Add Custom Domain to Render

1. Render Dashboard → Your Service → Settings → Custom Domains
2. Add your domain
3. Point DNS to Render's infrastructure

---

## Security Best Practices

1. **Never commit API keys** to GitHub
2. **Use environment variables** for all secrets
3. **Restrict CORS** to specific origins (not `*` in production)
4. **Monitor usage** on OpenAI platform
5. **Enable HTTPS** (automatic on both platforms)

---

## Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **OpenAI API**: https://platform.openai.com/docs
- **FastAPI Docs**: https://fastapi.tiangolo.com

---

## Quick Reference Commands

```bash
# Test backend API
curl -X POST https://ai-code-review-api.onrender.com/review \
  -H "Content-Type: application/json" \
  -d '{"code_snippet": "print('hello')", "language": "python"}'

# View backend logs (via Render CLI)
render logs --service ai-code-review-api

# Deploy via Vercel CLI
vercel --prod
```

---

**🎉 Your AI Code Review System is now deployed with hybrid architecture!**

- **Backend**: https://ai-code-review-api.onrender.com
- **Frontend**: https://your-project-name.vercel.app

