import { motion } from "framer-motion";
import { Code, Bug, Gauge, ArrowRight, CheckCircle, Terminal, Cpu, Menu, X, Sparkles, Zap, Shield, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Landing({ onNavigate, onViewDocs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden relative">
      {/* Subtle radial glow with teal/ocean tones */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Code className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-white">
              CodeReview AI
            </span>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Features
            </a>
            <a href="#demo" className="text-neutral-400 hover:text-white transition-colors font-medium">
              Demo
            </a>
            <button 
              onClick={onViewDocs}
              className="text-neutral-400 hover:text-white transition-colors font-medium"
            >
              Docs
            </button>
            <button 
              onClick={onNavigate}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neutral-400 hover:text-white transition-colors relative w-6 h-6"
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              className="flex flex-col justify-center items-center w-full h-full"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 6 }
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-5 h-0.5 bg-current"
                style={{ top: '6px' }}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-5 h-0.5 bg-current"
                style={{ top: '11px' }}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -6 }
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-5 h-0.5 bg-current"
                style={{ top: '16px' }}
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-900/95 backdrop-blur-xl border-t border-white/5 relative z-50"
          >
            <div className="px-6 py-6 space-y-4">
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-400 hover:text-white transition-colors font-medium"
              >
                Features
              </a>
              <a 
                href="#demo" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-neutral-400 hover:text-white transition-colors font-medium"
              >
                Demo
              </a>
              <button 
                onClick={() => {
                  onViewDocs();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-neutral-400 hover:text-white transition-colors font-medium"
              >
                Docs
              </button>
              <button
                onClick={() => {
                  onNavigate();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-semibold shadow-lg transition-all"
              >
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeInUp}>
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800/80 border border-neutral-700 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-semibold text-neutral-300">
                Powered by OpenAI GPT-4
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">
                Automated Code Review
              </span>
              <br />
              <span className="text-teal-400">
                Powered by AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Detect bugs, analyze code quality, and receive optimization recommendations. Reduce review time by 40% while maintaining code standards.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <button 
                onClick={onNavigate}
                className="group px-8 py-4 bg-teal-600 hover:bg-teal-700 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 transition-all hover:scale-[1.02] flex items-center gap-2.5"
              >
                <Terminal className="w-5 h-5" />
                Try Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={onViewDocs}
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-xl font-semibold text-base backdrop-blur-sm transition-all hover:scale-[1.02] flex items-center gap-2.5"
              >
                <Code className="w-5 h-5" />
                Documentation
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5"
            >
              {[
                { value: "50+", label: "Languages", icon: Shield },
                { value: "40%", label: "Faster", icon: Zap },
                { value: "25%", label: "Fewer Bugs", icon: Bug }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-11 h-11 mb-3 bg-neutral-800 border border-neutral-700 rounded-lg">
                    <stat.icon className="w-5 h-5 text-teal-400" strokeWidth={2} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1.5">
                    {stat.value}
                  </div>
                  <div className="text-neutral-500 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Core Features
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Professional code analysis tools for development teams
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {/* Bug Detection Card - Rose Theme */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-rose-500/20 via-rose-600/10 to-rose-900/5 p-8 rounded-2xl border-2 border-rose-500/40 backdrop-blur-sm shadow-lg shadow-rose-500/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-500/20 border-2 border-rose-400/50 rounded-xl mb-6 shadow-inner">
                <Bug className="w-10 h-10 text-rose-300" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-rose-100">
                Bug Detection
              </h3>
              
              <p className="text-rose-200/80 leading-relaxed">
                Identify logical errors and potential issues before they reach production.
              </p>
            </motion.div>

            {/* Quality Scoring Card - Orange Theme */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-orange-900/5 p-8 rounded-2xl border-2 border-orange-500/40 backdrop-blur-sm shadow-lg shadow-orange-500/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 border-2 border-orange-400/50 rounded-xl mb-6 shadow-inner">
                <Gauge className="w-10 h-10 text-orange-300" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-orange-100">
                Quality Scoring
              </h3>
              
              <p className="text-orange-200/80 leading-relaxed">
                Receive a comprehensive score evaluating maintainability and code clarity.
              </p>
            </motion.div>

            {/* AI Optimization Card - Purple Theme */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-900/5 p-8 rounded-2xl border-2 border-purple-500/40 backdrop-blur-sm shadow-lg shadow-purple-500/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 border-2 border-purple-400/50 rounded-xl mb-6 shadow-inner">
                <Cpu className="w-10 h-10 text-purple-300" strokeWidth={2.5} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-purple-100">
                AI Optimization
              </h3>
              
              <p className="text-purple-200/80 leading-relaxed">
                Get actionable recommendations for performance and best practice improvements.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Preview */}
      <section id="demo" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Live Demo
            </h2>
            <p className="text-lg text-neutral-400">
              See real-time code analysis in action
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-500/10 border border-teal-500/30 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold">Input Code</h3>
              </div>
              <div className="bg-neutral-950/80 border border-white/5 rounded-lg md:rounded-xl p-3 md:p-6 font-mono text-xs md:text-sm text-neutral-300 overflow-x-auto">
                <pre>{`def get_squares(numbers):
    result = []
    for i in range(len(numbers)):
        result.append(numbers[i] * numbers[i])
    return result`}</pre>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                </div>
                <h3 className="text-lg md:text-xl font-bold">AI Analysis</h3>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  <span className="text-lg md:text-2xl font-bold text-emerald-400">Score: 65/100</span>
                </div>
                <div className="pt-4 md:pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                    <span className="font-bold text-orange-400">Suggestions</span>
                  </div>
                  
                  <div className="relative">
                    <ul className="space-y-2 md:space-y-3 text-neutral-300">
                      <li className="flex items-start gap-2 md:gap-3">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-teal-400 flex-shrink-0" />
                        <span className="text-xs md:text-sm leading-relaxed">
                          Use a list comprehension (
                          <code className="text-teal-300 bg-neutral-800 px-1 py-0.5 rounded">
                            [num ** 2 for num in numbers]
                          </code>
                          ) to reduce verbosity and improve clarity
                        </span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-teal-400 flex-shrink-0" />
                        <span className="text-xs md:text-sm leading-relaxed">
                          Avoid the <code className="text-teal-300 bg-neutral-800 px-1 py-0.5 rounded">
                            range(len())
                          </code> pattern; iterate directly over the list for more Pythonic code
                        </span>
                      </li>
                      
                      {/* Collapsed suggestions with blur effect */}
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: showAllSuggestions ? 'auto' : '40px',
                          opacity: showAllSuggestions ? 1 : 0.6
                        }}
                        className="relative overflow-hidden"
                      >
                        {!showAllSuggestions && (
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900 pointer-events-none" />
                        )}
                        
                        <li className="flex items-start gap-2 md:gap-3">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-teal-400 flex-shrink-0" />
                          <span className="text-xs md:text-sm leading-relaxed">
                            Replace manual multiplication with the exponent operator (
                            <code className="text-teal-300 bg-neutral-800 px-1 py-0.5 rounded">
                              num ** 2
                            </code>
                            ) for better readability
                          </span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 mt-2 md:mt-3">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-teal-400 flex-shrink-0" />
                          <span className="text-xs md:text-sm leading-relaxed">
                            Add type hints to clarify expected input and output types
                          </span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3 mt-2 md:mt-3">
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mt-0.5 text-teal-400 flex-shrink-0" />
                          <span className="text-xs md:text-sm leading-relaxed">
                            Include a short docstring to document the function's behavior and assumptions
                          </span>
                        </li>
                      </motion.div>
                    </ul>
                    
                    {/* Show more button */}
                    {!showAllSuggestions && (
                      <button
                        onClick={() => setShowAllSuggestions(true)}
                        className="mt-3 md:mt-4 w-full flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg text-xs md:text-sm font-medium text-neutral-300 hover:text-white transition-all"
                      >
                        <span>Show 3 more suggestions</span>
                        <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button 
              onClick={onNavigate}
              className="group px-10 py-5 bg-teal-600 hover:bg-teal-700 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl shadow-teal-500/20 hover:shadow-teal-500/30 transition-all hover:scale-[1.02] inline-flex items-center gap-3"
            >
              Start Analyzing Code
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Technology Stack
            </h2>
            <p className="text-lg text-neutral-400">
              Built with modern, production-ready tools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "React", icon: "⚛️" },
              { name: "FastAPI", icon: "⚡" },
              { name: "Python", icon: "🐍" },
              { name: "GPT-4", icon: "🤖" },
              { name: "Framer", icon: "✨" },
              { name: "Tailwind", icon: "🎨" }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-white/10 hover:border-teal-500/30 rounded-xl p-6 text-center transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <p className="font-semibold text-white group-hover:text-teal-400 transition-colors text-sm">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">CodeReview AI</span>
          </div>
          <p className="text-neutral-500 text-sm md:text-base text-center md:text-left">
            Built by <span className="text-white font-semibold">Abdulahi Oyebanji</span>, a software developer, aspiring AI engineer & CS student
          </p>
        </div>
      </footer>
    </div>
  );
}
