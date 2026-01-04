#!/bin/bash

# AI Code Review System - Hybrid Deployment Script
# Backend: Render | Frontend: Vercel

echo "🚀 AI Code Review System - Hybrid Deployment"
echo "=============================================="
echo "Backend: Render (FastAPI)"
echo "Frontend: Vercel"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Configure for hybrid deployment: Render backend + Vercel frontend"
fi

echo ""
echo "🌐 Deployment Options:"
echo "1. Deploy Backend to Render"
echo "2. Deploy Frontend to Vercel"
echo "3. Setup local development environment"
echo "4. View hybrid deployment guide"
echo "5. Push all changes to GitHub"
echo ""

read -p "Choose an option (1-5): " option

case $option in
    1)
        echo ""
        echo "🚀 Deploying Backend to Render..."
        echo ""
        echo "📋 Step-by-step instructions:"
        echo "1. Go to https://dashboard.render.com"
        echo "2. Click 'New +' → 'Web Service'"
        echo "3. Select your GitHub repository"
        echo "4. Configure:"
        echo "   - Name: ai-code-review-api"
        echo "   - Environment: Python 3.11"
        echo "   - Build Command: pip install -r api/requirements.txt"
        echo "   - Start Command: uvicorn api.main:app --host 0.0.0.0 --port \$PORT"
        echo "5. Add Environment Variables:"
        echo "   - OPENAI_API_KEY: sk-your-key-here"
        echo "   - CORS_ORIGINS: https://your-vercel-url.vercel.app"
        echo "6. Click 'Create Web Service'"
        echo ""
        echo "📖 Full guide: See HYBRID_DEPLOYMENT.md"
        ;;
    2)
        echo ""
        echo "🚀 Deploying Frontend to Vercel..."
        echo ""
        echo "📋 Step-by-step instructions:"
        echo "1. Go to https://vercel.com/dashboard"
        echo "2. Click 'Add New...' → 'Project'"
        echo "3. Select your GitHub repository"
        echo "4. Add Environment Variable:"
        echo "   - Key: VITE_BACKEND_URL"
        echo "   - Value: https://ai-code-review-api.onrender.com"
        echo "   (Use your actual Render backend URL after Step 1)"
        echo "5. Click 'Deploy'"
        echo ""
        echo "📖 Full guide: See HYBRID_DEPLOYMENT.md"
        ;;
    3)
        echo ""
        echo "📦 Setting up local development environment..."
        
        echo "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
        
        echo "Installing backend dependencies..."
        cd api
        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        cd ..
        
        echo ""
        echo "✅ Setup complete!"
        echo ""
        echo "To start development:"
        echo "  Terminal 1 - Backend:  cd api && source venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000"
        echo "  Terminal 2 - Frontend: cd frontend && npm run dev"
        echo ""
        echo "Access at: http://localhost:3000"
        ;;
    4)
        echo ""
        echo "📖 Opening hybrid deployment guide..."
        if command -v open &> /dev/null; then
            open HYBRID_DEPLOYMENT.md
        elif command -v xdg-open &> /dev/null; then
            xdg-open HYBRID_DEPLOYMENT.md
        else
            cat HYBRID_DEPLOYMENT.md
        fi
        ;;
    5)
        echo ""
        echo "📤 Pushing all changes to GitHub..."
        git status
        echo ""
        read -p "Continue with push? (y/n): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            git push origin main
            echo "✅ Changes pushed to GitHub!"
        fi
        ;;
    *)
        echo "Invalid option. Please choose 1-5."
        ;;
esac

echo ""
echo "✨ Deployment process completed!"

