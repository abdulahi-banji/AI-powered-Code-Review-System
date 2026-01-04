# Vercel Deployment Guide - AI Code Review System

This guide provides step-by-step instructions for deploying your AI Code Review System to Vercel with serverless backend functions.

## Prerequisites

Before you begin, ensure you have:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code pushed to GitHub
3. **OpenAI API Key**: Get one at [platform.openai.com](https://platform.openai.com/api-keys)
4. **Vercel CLI** (optional): Install with `npm i -g vercel`

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

#### Step 2: Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the configuration

#### Step 3: Configure Environment Variables

In the Vercel deployment screen:

1. Click **"Environment Variables"**
2. Add the following variable:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: `sk-your-openai-api-key-here`
3. Click **"Add"**
4. Click **"Deploy"**

#### Step 4: Access Your Application

Once deployed, Vercel will provide a URL like:
- `https://your-project-name.vercel.app`

Your AI Code Review System is now live!

---

### Option 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Navigate to project directory
cd /Users/banji/Documents/Coding\ /Projects/AI\ Code\ Review\ System

# Deploy to Vercel
vercel --prod
```

#### Step 4: Set Environment Variables

```bash
vercel env add OPENAI_API_KEY
# Enter your OpenAI API key when prompted
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for AI-powered code reviews |

---

## Project Structure

The deployment includes:

```
your-project/
├── api/
│   └── review/route.js    # Vercel Serverless Function
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── api.js     # Updated for Vercel deployment
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── vercel.json            # Vercel configuration
└── README.md
```

---

## API Endpoint

Once deployed, your API will be available at:

```
https://your-project.vercel.app/api/review
```

**Example Request**:

```bash
curl -X POST https://your-project.vercel.app/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "code_snippet": "def hello():\n    print('Hello')",
    "language": "python"
  }'
```

---

## Troubleshooting

### Issue: CORS Errors

**Solution**: The `vercel.json` includes CORS headers. If issues persist, ensure your frontend is calling the API at the same domain.

### Issue: OpenAI API Key Not Working

**Solution**:
1. Verify the environment variable is set in Vercel dashboard
2. Check that your OpenAI API key is valid and has credits
3. Redeploy after adding the environment variable

### Issue: Serverless Function Timeout

**Solution**: OpenAI API calls can take time. Vercel's free tier has a 10-second timeout. Consider:
- Upgrading to Vercel Pro for longer timeouts
- Using Render for the backend instead (no timeout limits)

---

## Local Development

To test locally before deploying:

### 1. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Access at: http://localhost:3000

### 2. Test API Locally

```bash
# Option A: Use local Python backend
cd api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

# Option B: Use Vercel CLI for local API
vercel dev
```

---

## Deploying to Multiple Platforms

You can also deploy to:

### Render (Alternative Backend)
- Already configured in `render.yaml`
- Better for production with no timeout limits

### Vercel + Render Hybrid
- Frontend: Vercel (fast CDN)
- Backend: Render (no timeout limits)

---

## Next Steps

1. **Custom Domain**: Add a custom domain in Vercel settings
2. **SSL**: Automatic with Vercel
3. **Analytics**: Enable Vercel Analytics
4. **Monitoring**: Check Vercel logs for errors

---

## Support

- Vercel Docs: https://vercel.com/docs
- OpenAI API: https://platform.openai.com/docs
- Project Issues: Check GitHub repository issues

---

**Happy Deploying! 🚀**

