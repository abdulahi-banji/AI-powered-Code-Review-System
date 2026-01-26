import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Terminal, Cpu, AlertTriangle, Code, GitBranch, Gauge } from "lucide-react";

export default function Docs({ onBack }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 sm:px-6 py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-3xl" />
      </div>
      
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Fixed Header with Back Button */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline font-medium text-sm">Back to Home</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">Documentation</span>
          </div>
          <div className="w-20 sm:w-24" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto space-y-16 mt-16 relative z-10">
        {/* Header */}
        <section className="text-center">
          <motion.h1
            {...fadeInUp}
            className="text-3xl sm:text-4xl font-semibold text-white mb-4"
          >
            Project Documentation
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Complete guide for setting up, running, and extending the AI-powered Code Review system. 
            Learn best practices for accurate results and avoiding common errors.
          </motion.p>
        </section>

        {/* What this project does */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white">
            <Gauge className="w-5 h-5 text-emerald-400" />
            System Overview
          </h2>
          <ul className="space-y-2.5 text-neutral-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Analyzes code quality using OpenAI GPT-4 models</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Generates quality scores (0-100) based on maintainability and clarity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Detects potential bugs and identifies risky code patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Provides optimization suggestions and best practice recommendations</span>
            </li>
          </ul>
        </motion.section>

        {/* Critical API Notice */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
            <div className="flex-1">
              <h2 className="text-base font-semibold mb-2 text-red-200">
                Critical Requirement: OpenAI API Credits
              </h2>
              <p className="text-sm leading-relaxed mb-3 text-red-200/80">
                This application requires an active OpenAI API key with available credits. 
                Without valid credentials, the analysis will fail with a backend error.
              </p>
              <div className="bg-neutral-950 border border-white/10 rounded-md p-3 font-mono text-xs overflow-x-auto">
                <div className="text-neutral-500 mb-2"># macOS / Linux</div>
                <div className="text-white">export OPENAI_API_KEY=your_api_key_here</div>
                <div className="text-neutral-500 mt-3 mb-2"># Windows (PowerShell)</div>
                <div className="text-white">setx OPENAI_API_KEY "your_api_key_here"</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Setup */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white">
            <Terminal className="w-5 h-5 text-teal-400" />
            Local Development Setup
          </h2>
          <div className="bg-neutral-950 border border-white/10 rounded-lg p-4 font-mono text-sm text-neutral-300 overflow-x-auto">
            <div className="text-neutral-500 mb-2"># Backend (FastAPI)</div>
            <div>pip install -r requirements.txt</div>
            <div>uvicorn main:app --reload</div>
            <div className="text-neutral-500 mt-4 mb-2"># Frontend (React)</div>
            <div>npm install</div>
            <div>npm run dev</div>
          </div>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            Ensure the backend runs on <span className="font-medium text-white">http://localhost:8000</span>. 
            The frontend cannot communicate with the API if the server is offline.
          </p>
        </motion.section>

        {/* Usage */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white"> 
            <Cpu className="w-5 h-5 text-emerald-400" />
            Using the Application
          </h2>
          <ol className="space-y-2.5 text-neutral-300 text-sm">
            <li className="flex gap-3">
              <span className="font-medium text-white min-w-[1.5rem]">1.</span>
              <span>Select your programming language from the dropdown</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-white min-w-[1.5rem]">2.</span>
              <span>Paste your code or load an example snippet</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-white min-w-[1.5rem]">3.</span>
              <span>Click Analyze Code to receive AI-powered feedback</span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-white min-w-[1.5rem]">4.</span>
              <span>Review quality scores, bug reports, optimizations, and best practices</span>
            </li>
          </ol>
        </motion.section>

        {/* API */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white">
            <BookOpen className="w-5 h-5 text-orange-400" />
            API Endpoint
          </h2>
          <div className="bg-neutral-950 border border-white/10 rounded-lg p-4 font-mono text-sm text-neutral-300 overflow-x-auto">
            <div className="text-orange-400">POST /api/review</div>
            <div className="mt-2">{'{'}</div>
            <div className="ml-4">"code_snippet": "string",</div>
            <div className="ml-4">"language": "python | javascript | java | cpp"</div>
            <div>{'}'}</div>
          </div>
          <p className="text-neutral-400 text-sm mt-3 leading-relaxed">
            The response includes a quality score, detected bugs, optimization suggestions, 
            and best-practice recommendations.
          </p>
        </motion.section>

        {/* Accuracy Tips */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.7 }}
          className="bg-neutral-900/50 border border-teal-500/20 backdrop-blur-sm rounded-2xl p-6"
        >
          <h2 className="text-base font-semibold flex items-center gap-2 mb-3 text-white">
            <Code className="w-5 h-5 text-teal-400" />
            Best Practices for Accurate Results
          </h2>
          <ul className="space-y-2.5 text-neutral-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Submit logically complete code blocks for optimal analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Smaller, focused functions produce more accurate AI feedback</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1">•</span>
              <span>Always review AI suggestions - the system assists but does not replace human judgment</span>
            </li>
          </ul>
        </motion.section>

        {/* Contributing */}
        <motion.section
          {...fadeInUp}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-white">
            <GitBranch className="w-5 h-5 text-purple-400" />
            Contributing
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Fork the repository, implement features or fixes in a dedicated branch, add tests where applicable, 
            and submit a pull request with a clear description of your changes.
          </p>
        </motion.section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10 space-y-3 text-neutral-500 text-sm">
          <p>Keep your OpenAI API key secure and ensure sufficient credits are available.</p>
          <p>This project is designed for learning and experimentation. Review all AI feedback carefully.</p>
          <p>Use the navigation above to return to the main page at any time.</p>
          <div className="pt-4 flex items-center gap-2">
            <a 
              href="https://github.com/abdulahi-banji/AI-powered-Code-Review-System"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source Code on GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}