import { motion } from "framer-motion";
import { Code, Sparkles, Bug, Gauge, ArrowRight, CheckCircle, Terminal, Cpu, Zap, Shield, Brain, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Landing({ onNavigate, onViewDocs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen gradient-bg text-white overflow-x-hidden">
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center glow-indigo">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">CodeReview</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#demo" className="text-gray-400 hover:text-white transition-colors text-sm">Demo</a>
            <button 
              onClick={onViewDocs}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Documentation
            </button>
            <button 
              onClick={onNavigate}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all hover:scale-105 glow-indigo"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020617]/95 backdrop-blur-md border-t border-white/5"
          >
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#demo" className="block text-gray-400 hover:text-white transition-colors">Demo</a>
              <button 
                onClick={onViewDocs}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Documentation
              </button>
              <button
                onClick={onNavigate}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-3 rounded-lg font-medium transition-all"
              >
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-indigo-300 font-medium">Powered by OpenAI GPT-4</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 px-4">
              <span className="text-gradient">AI-Powered</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Code Review System
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Automatically analyze code quality, detect bugs, and suggest optimizations 
              using advanced AI. Reduce errors by 25% and improve review efficiency by 40%.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 px-4"
            >
              <button 
                onClick={onNavigate}
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-indigo"
              >
                <Terminal className="w-5 h-5" />
                Try Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            <button 
                onClick={onViewDocs}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              >
                <Cpu className="w-5 h-5" />
                Documentation
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/5"
            >
              {[
                { value: "50+", label: "Test Cases", icon: <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" /> },
                { value: "40%", label: "Efficiency", icon: <Brain className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400" /> },
                { value: "25%", label: "Less Errors", icon: <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-red-400" /> }
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                    {stat.icon}
                    <div className="text-2xl sm:text-3xl font-bold text-white group-hover:scale-110 transition-transform">{stat.value}</div>
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Powerful Features</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
              Comprehensive code analysis tools powered by cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Bug className="w-8 h-8 text-red-400" />,
                title: "Bug Detection",
                desc: "Identify logical errors and risky patterns before production with 99% accuracy.",
                gradient: "from-red-500/20 to-orange-500/20",
                border: "border-red-500/20",
                iconBg: "bg-red-500/10"
              },
              {
                icon: <Gauge className="w-8 h-8 text-yellow-400" />,
                title: "Code Quality Score",
                desc: "Get a 0–100 score that summarizes maintainability, clarity, and best practices.",
                gradient: "from-yellow-500/20 to-amber-500/20",
                border: "border-yellow-500/20",
                iconBg: "bg-yellow-500/10"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
                title: "AI Suggestions",
                desc: "Actionable improvements powered by large language models for optimal performance.",
                gradient: "from-emerald-500/20 to-green-500/20",
                border: "border-emerald-500/20",
                iconBg: "bg-emerald-500/10"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${f.gradient} ${f.border} border rounded-2xl p-6 sm:p-8 shadow-xl group hover:shadow-2xl transition-all`}
              >
                <div className={`w-16 h-16 ${f.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">See It In Action</h2>
            <p className="text-gray-400 text-sm sm:text-base">Real-time AI-powered code analysis</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1e293b]/50 border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/30 transition-all"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" /> Input Code
              </h3>
              <div className="bg-[#020617] border border-white/10 rounded-xl p-4 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto">
                <pre>
{`def calculate_total(items):
    total = 0
    for item in items:
        total = total + item
    return total`}
                </pre>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1e293b]/50 border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/30 transition-all"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4">AI Analysis</h3>
              <div className="bg-[#020617] rounded-xl p-4 sm:p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm sm:text-base">Score: 85/100</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-yellow-400 font-medium block mb-3 text-sm">Suggestions:</span>
                    <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                        Use sum() built-in function
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" />
                        Add type hints for clarity
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button 
              onClick={onNavigate}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all hover:scale-105 glow-indigo"
            >
              Try It Yourself
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Built With Modern Tech</h2>
            <p className="text-gray-400 text-sm sm:text-base">Leveraging the best tools for optimal performance</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {["React", "FastAPI", "Python", "OpenAI GPT-4", "Framer Motion", "Tailwind CSS"].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="bg-[#1e293b]/50 border border-white/10 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base text-gray-300 hover:border-indigo-500/50 hover:text-white transition-all cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">AI Code Review</span>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            Built by Abdulahi Oyebanji · CS Student · AI & FullStack
          </p>
        </div>
      </footer>
    </div>
  );
}