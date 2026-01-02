import { motion } from "framer-motion";
import { FileText, ArrowLeft, Github, Terminal, Zap, Shield, Cpu } from "lucide-react";

export default function Documentation({ onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#0a0a0f] text-white p-6"
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="text-emerald-400" size={28} />
            Documentation
          </h1>
        </header>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Zap className="text-emerald-400" />
              Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2">🔍 Intelligent Code Analysis</h3>
                <p className="text-gray-400 text-sm">Advanced AI-powered code review using GPT-4 for comprehensive analysis</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2">🐛 Bug Detection</h3>
                <p className="text-gray-400 text-sm">Identifies potential bugs and security vulnerabilities in your code</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2">⚡ Performance Optimization</h3>
                <p className="text-gray-400 text-sm">Suggests performance improvements and code optimization strategies</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h3 className="font-semibold mb-2">📊 Best Practices</h3>
                <p className="text-gray-400 text-sm">Recommendations for coding standards and best practices</p>
              </div>
            </div>
          </section>

          <section className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Terminal className="text-blue-400" />
              Quick Start
            </h2>
            <div className="space-y-4 mt-6">
              <div>
                <h3 className="font-semibold mb-2">1. Backend Setup</h3>
                <pre className="p-4 rounded-xl bg-[#0d0d14] overflow-x-auto">
                  <code className="text-sm text-gray-300">
{`cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload`}
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Frontend Setup</h3>
                <pre className="p-4 rounded-xl bg-[#0d0d14] overflow-x-auto">
                  <code className="text-sm text-gray-300">
{`cd frontend
npm install
npm run dev`}
                  </code>
                </pre>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Open Application</h3>
                <p className="text-gray-400 text-sm">Visit <code className="text-emerald-400">http://localhost:5173</code> in your browser</p>
              </div>
            </div>
          </section>

          <section className="mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Cpu className="text-purple-400" />
              Supported Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {["Python", "JavaScript", "TypeScript", "C++", "Java", "Go", "Rust"].map((lang) => (
                <div key={lang} className="p-3 rounded-lg bg-white/5 text-center text-sm">
                  {lang}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="text-teal-400" />
              Security
            </h2>
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                </div>
                <p className="text-gray-400 text-sm">API keys stored securely in environment variables</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                </div>
                <p className="text-gray-400 text-sm">Code snippets are processed securely and not stored permanently</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-emerald-400 text-sm">✓</span>
                </div>
                <p className="text-gray-400 text-sm">GitHub secret scanning enabled for protection</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

