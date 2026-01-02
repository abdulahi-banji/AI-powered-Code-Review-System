import { motion } from "framer-motion";
import { Code, FileText, Github, ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0f] text-white"
    >
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <Code className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold">AI Code Review</span>
          </div>
          <button
            onClick={() => navigate("/docs")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FileText size={18} />
            Documentation
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Code Review System
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Advanced code analysis using GPT-4 to detect bugs, optimize performance, 
            and enforce best practices across multiple programming languages.
          </p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/review")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all font-semibold text-lg shadow-lg shadow-emerald-500/25"
          >
            Start Reviewing
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-24"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
              <Zap className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Get comprehensive code reviews in seconds with our optimized AI pipeline
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
              <Cpu className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Language</h3>
            <p className="text-gray-400">
              Support for Python, JavaScript, TypeScript, C++, Java, Go, and Rust
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
              <Shield className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-400">
              Your code is processed securely and never stored permanently
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-gray-500 text-sm">
            Built with FastAPI, React, and GPT-4
          </p>
          <a
            href="https://github.com/abdulahi-banji/AI-powered-Code-Review-System"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </div>
      </footer>
    </motion.div>
  );
}

