import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Terminal,
  Cpu,
  AlertTriangle,
  Zap,
  GitBranch,
  Bug,
  Gauge
} from "lucide-react";

export default function Docs({ onBack }) {
  return (
    <div className="min-h-screen gradient-bg text-white px-4 sm:px-6 py-28 relative overflow-hidden">
      {/* Fixed Header with Back Button */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center glow-indigo">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gradient">Project Docs</span>
          </div>
          <div className="w-20 sm:w-24" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto space-y-20 mt-24">
        {/* Header */}
        <section className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-gradient mb-6"
          >
            Project Documentation
          </motion.h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome! This guide explains everything you need to set up, run, and extend the
            AI-powered Code Review system. You’ll also find tips for avoiding common errors
            and ensuring accurate results.
          </p>
        </section>

        {/* What this project does */}
        <section className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Gauge className="w-5 h-5 text-emerald-400" />
            What This System Does
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
            <li>Analyzes code with AI models through the OpenAI API</li>
            <li>Generates a 0–100 quality score based on maintainability and clarity</li>
            <li>Detects potential bugs and risky patterns</li>
            <li>Recommends optimizations and best practices</li>
          </ul>
        </section>

        {/* Critical API Notice */}
        <section className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-400 mb-3">
            <AlertTriangle className="w-5 h-5" />
            Critical Requirement: OpenAI API Credits
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            ⚠️ This app <strong>will not work</strong> if your OpenAI API key has no remaining
            credits. If credits are exhausted or the key is missing, you’ll see an error which will involve backend. This
            is intentional. It ensures you don’t get misleading results.
          </p>
          <pre className="mt-4 bg-[#020617] border border-white/10 rounded-xl p-4 text-xs text-gray-300 overflow-x-auto">
{`# macOS / Linux
export OPENAI_API_KEY=your_api_key_here

# Windows (PowerShell)
setx OPENAI_API_KEY "your_api_key_here"`}
          </pre>
        </section>

        {/* Setup */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-indigo-400" />
            Local Development Setup
          </h2>
          <pre className="bg-[#020617] border border-white/10 rounded-xl p-4 text-sm text-gray-300 overflow-x-auto">
{`# Backend (FastAPI)
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (React)
npm install
npm run dev`}
          </pre>
          <p className="text-gray-400 text-sm mt-3">
            Make sure the backend is running on <strong>http://localhost:8000</strong>. If the
            server is offline, the Analyze button won’t work.
          </p>
        </section>

        {/* Usage */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Cpu className="w-5 h-5 text-emerald-400" />
            Using the Application
          </h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm">
            <li>Select a programming language.</li>
            <li>Paste your code or load an example snippet.</li>
            <li>Click <strong>Analyze Code</strong> to get AI feedback.</li>
            <li>Review quality scores, bug reports, optimizations, and best practices.</li>
          </ol>
        </section>

        {/* API */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            API Endpoint
          </h2>
          <pre className="bg-[#020617] border border-white/10 rounded-xl p-4 text-sm text-gray-300 overflow-x-auto">
{`POST /api/review
{
  "code_snippet": "string",
  "language": "python | javascript | java | cpp"
}`}
          </pre>
          <p className="text-gray-400 text-sm mt-2">
            The response includes quality score, detected bugs, optimizations, and best-practice
            recommendations.
          </p>
        </section>

        {/* Accuracy Tips */}
        <section className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3 text-indigo-300">
            <Zap className="w-5 h-5" />
            Accuracy & Reliability Tips
          </h2>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
            <li>Analyze logically complete code for best results.</li>
            <li>Smaller, focused functions improve AI accuracy.</li>
            <li>AI feedback should always be reviewed — it’s an assistant, not a compiler.</li>
          </ul>
        </section>

        {/* Contributing */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5 text-pink-400" />
            Contributing & Extension
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fork the repo, implement features/fixes in a dedicated branch, add tests if possible,
            and submit a clear pull request describing your changes.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm space-y-2">
          <p>💡 Tip: Always keep your OpenAI API key safe and with sufficient credits.</p>
          <p>📌 This project is for learning and experimentation so make sure to review AI feedback carefully.</p>
          <p>⚡ Navigate easily: use the back button above to return to the main page anytime.</p>
        </footer>
      </div>
    </div>
  );
}
