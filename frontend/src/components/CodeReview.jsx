import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, ArrowLeft, Send, Loader2, AlertCircle, CheckCircle, 
  Bug, TrendingUp, FileCode, Upload, X, Copy, Check
} from 'lucide-react';

export default function CodeReview({ onBack }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const languageFileTypes = {
    python: '.py',
    javascript: '.js',
    java: '.java',
    cpp: '.cpp'
  };

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter code to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code_snippet: code,
          language: language
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze code. Ensure backend is running on port 8000');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to API. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  const exampleCode = {
    python: `def calculate_sum(numbers):
    total = 0
    for num in numbers:
        total = total + num
    return total`,
    javascript: `function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
    java: `public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
}`,
    cpp: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`
  };

  const loadExample = () => {
    setCode(exampleCode[language]);
    setResult(null);
    setError(null);
    setUploadedFile(null);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'border-red-500/30 bg-red-500/10 text-red-300',
      medium: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
      low: 'border-blue-500/30 bg-blue-500/10 text-blue-300'
    };
    return colors[severity] || colors.medium;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-400';
    if (score >= 60) return 'bg-orange-400';
    return 'bg-red-400';
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExt = languageFileTypes[language];
    if (!file.name.endsWith(allowedExt)) {
      setError(`Please upload a valid ${language.toUpperCase()} file`);
      setUploadedFile(null);
      return;
    }

    try {
      const text = await file.text();
      setCode(text);
      setResult(null);
      setError(null);
      setUploadedFile(file);
    } catch {
      setError("Failed to read file");
      setUploadedFile(null);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/6 rounded-full blur-3xl" />
      </div>
      
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-teal-600/20 border border-teal-500/30 hover:border-teal-400/60 hover:bg-teal-600/30 text-teal-300 hover:text-teal-100 transition-all duration-300 font-medium text-xs sm:text-sm shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:inline">Back to Home</span>
          </motion.button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-sm sm:text-lg font-semibold text-white">Code Analyzer</span>
          </div>
          <div className="w-16 sm:w-20 sm:w-24" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 pb-8 sm:pb-12 px-3 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800/80 border border-neutral-700 rounded-full mb-3 sm:mb-4">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <span className="text-xs font-medium text-neutral-300">GPT-4 Powered Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-white">
              Analyze Your Code
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm md:text-base">
              Get instant AI-powered feedback on quality, bugs, and optimizations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-neutral-800/50 border-b border-white/10 p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-teal-400" />
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white">Your Code</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyCode}
                    className="px-2 py-1.5 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 border border-white/10 transition-all text-sm sm:text-base flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <motion.select
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value); setUploadedFile(null); }}
                    whileFocus={{ borderColor: "rgb(45, 212, 191)" }}
                    className="bg-neutral-950 border border-white/10 rounded-lg text-sm sm:text-base px-3 py-2 text-white focus:outline-none focus:border-teal-500/50"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </motion.select>

                  <label className="px-2 py-2 rounded-lg bg-neutral-700/50 hover:bg-neutral-700 border border-white/10 transition-all cursor-pointer hover:border-teal-500/50">
                    <Upload className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-teal-400" />
                    <input
                      type="file"
                      accept={languageFileTypes[language]}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-neutral-500 truncate">
                    {uploadedFile ? uploadedFile.name : "No file"}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={loadExample}
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors px-2 sm:px-3 py-2 rounded-md hover:bg-neutral-800"
                  >
                    Example
                  </motion.button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-4 sm:p-5">
                <motion.textarea
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Paste your ${language} code here..`}
                  className="w-full h-64 sm:h-80 md:h-96 bg-neutral-950 border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base font-mono text-white resize-none focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  spellCheck="false"
                />

                {/* Action Buttons */}
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <motion.button
                    onClick={analyzeCode}
                    disabled={loading || !code.trim()}
                    whileHover={{ scale: (loading || !code.trim()) ? 1 : 1.02, boxShadow: (loading || !code.trim()) ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 20px 25px -5px rgba(45, 212, 191, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-teal-600 hover:bg-teal-700 disabled:hover:bg-teal-600 rounded-lg font-semibold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base relative overflow-hidden group"
                  >
                    {/* Animated background pulse */}
                    {!loading && code.trim() && (
                      <motion.div
                        className="absolute inset-0 bg-teal-400/20 rounded-lg"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          <span className="hidden xs:inline">Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden xs:inline">Analyze Code</span>
                          <span className="xs:hidden">Analyze</span>
                          <Send className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:inline" />
                        </>
                      )}
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setCode('');
                      setResult(null);
                      setError(null);
                      setUploadedFile(null);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-lg font-semibold transition-all text-xs sm:text-sm"
                  >
                    Clear
                  </motion.button>
                </div>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div {...fadeIn} className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-0.5 text-red-200">Error</p>
                        <p className="text-xs text-red-200/80">{error}</p>
                      </div>
                      <button onClick={() => setError(null)}>
                        <X className="w-4 h-4 hover:opacity-70 text-red-400" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-neutral-800/50 border-b border-white/10 p-5">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  Analysis Results
                </h2>
              </div>

              {/* Results Content */}
              <div className="p-5 h-[500px] sm:h-[600px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!result && !loading && (
                    <motion.div
                      {...fadeIn}
                      className="h-full flex flex-col items-center justify-center text-center px-4"
                    >
                      <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mb-4">
                        <Code className="w-8 h-8 text-teal-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">Ready to Analyze</h3>
                      <p className="text-base sm:text-lg text-neutral-400 max-w-sm leading-relaxed">
                        Enter your code or upload a file and click Analyze to receive AI-powered feedback
                      </p>
                    </motion.div>
                  )}

                  {loading && (
                    <motion.div
                      {...fadeIn}
                      className="h-full flex flex-col items-center justify-center"
                    >
                      <Loader2 className="w-12 h-12 text-teal-400 animate-spin mb-4" />
                      <p className="text-lg sm:text-xl font-medium text-white mb-2">Analyzing your code</p>
                      <p className="text-base text-neutral-400">This may take a few seconds</p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div {...fadeIn} className="space-y-6">
                      {/* Quality Score */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="bg-neutral-800/50 border border-teal-500/20 rounded-xl p-4 sm:p-5 hover:border-teal-500/40 transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-neutral-400 font-medium text-sm sm:text-base">Code Quality Score</span>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            className={`text-4xl sm:text-5xl font-semibold ${getScoreColor(result.score)}`}
                          >
                            {result.score}/100
                          </motion.span>
                        </div>
                        <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.score}%` }}
                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                            className={`h-full ${getScoreBg(result.score)}`}
                          />
                        </div>
                        <p className="text-sm text-neutral-500 mt-3">
                          Based on maintainability, clarity, and best practices
                        </p>
                      </motion.div>

                      {/* Bugs */}
                      {result.bugs && result.bugs.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                        >
                          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                            <Bug className="w-5 h-5 text-red-400" />
                            Bugs Found ({result.bugs.length})
                          </h3>
                          <div className="space-y-2 sm:space-y-3">
                            {result.bugs.map((bug, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25 + idx * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.02, translateX: 4 }}
                                className={`rounded-lg sm:rounded-xl p-3 sm:p-4 border ${getSeverityColor(bug.severity)} transition-all cursor-pointer`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-sm font-semibold uppercase">
                                    {bug.severity} Severity
                                  </span>
                                  {bug.line && (
                                    <span className="text-sm text-neutral-500">Line {bug.line}</span>
                                  )}
                                </div>
                                <p className="text-sm sm:text-base text-white mb-2">{bug.description}</p>
                                {bug.suggestion && (
                                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                                    <p className="text-sm text-neutral-300">
                                      <span className="text-teal-400 font-medium">Fix: </span>
                                      {bug.suggestion}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Optimizations */}
                      {result.optimizations && result.optimizations.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                        >
                          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                            <TrendingUp className="w-5 h-5 text-orange-400" />
                            Optimizations ({result.optimizations.length})
                          </h3>
                          <div className="space-y-2 sm:space-y-3">
                            {result.optimizations.map((opt, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.02, translateX: 4 }}
                                className="rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-500/30 bg-orange-500/5 transition-all cursor-pointer"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-sm font-semibold text-orange-400 uppercase">
                                    {opt.type || 'Performance'}
                                  </span>
                                  {opt.line && (
                                    <span className="text-sm text-neutral-500">Line {opt.line}</span>
                                  )}
                                </div>
                                <p className="text-sm sm:text-base text-white mb-2">{opt.description}</p>
                                {opt.suggestion && (
                                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                                    <p className="text-sm text-neutral-300">
                                      <span className="text-orange-400 font-medium">Suggestion: </span>
                                      {opt.suggestion}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Best Practices */}
                      {result.best_practices && result.best_practices.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.55, duration: 0.4 }}
                        >
                          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                            Best Practices ({result.best_practices.length})
                          </h3>
                          <div className="space-y-2 sm:space-y-3">
                            {result.best_practices.map((practice, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.55 + idx * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.02, translateX: 4 }}
                                className="rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-500/30 bg-emerald-500/5 transition-all cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-emerald-400 uppercase mb-1">
                                      {practice.category || 'General'}
                                    </p>
                                    <p className="text-sm sm:text-base text-white">{practice.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
