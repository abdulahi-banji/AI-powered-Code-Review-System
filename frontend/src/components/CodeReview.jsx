import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, ArrowLeft, Send, Loader2, AlertCircle, CheckCircle, 
  Zap, Bug, Lightbulb, TrendingUp, FileCode, Sparkles, Upload,
  X, Copy, Check
} from 'lucide-react';

export default function CodeReview({ onBack }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Allowed file types per language
  const languageFileTypes = {
    python: '.py',
    javascript: '.js',
    java: '.java',
    cpp: '.cpp'
  };

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
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
        throw new Error('Failed to analyze code. Make sure backend is running on port 8000');
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
      high: 'text-red-400 bg-red-500/10 border-red-500/30',
      medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      low: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    };
    return colors[severity] || colors.medium;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-emerald-400 to-green-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-orange-600';
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

  return (
    <div className="min-h-screen gradient-bg text-white">
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Header */}
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
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gradient">AI Code Analyzer</span>
          </div>
          <div className="w-20 sm:w-24" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <span className="text-xs sm:text-sm text-indigo-300 font-medium">GPT-4 Powered Analysis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-gradient">Analyze Your Code</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Get instant AI-powered feedback on quality, bugs, and optimizations</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-white/10 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg sm:text-xl font-semibold">Your Code</h2>
                  </div>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Language + Upload + Example */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Language Dropdown */}
                  <select
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value); setUploadedFile(null); }}
                    className="bg-[#020617] border border-white/10 rounded-lg px-3 sm:px-4 py-2 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>

                  {/* File Upload */}
                  <label className="flex items-center gap-2 cursor-pointer px-2 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg transition-colors">
                    <Upload className="w-5 h-5 text-indigo-300" />
                    <input
                      type="file"
                      accept={languageFileTypes[language]}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* File Name */}
                  <span className="text-xs text-gray-400">
                    {uploadedFile ? uploadedFile.name : "No file chosen"}
                  </span>

                  {/* Load Example Button */}
                  <button
                    onClick={loadExample}
                    className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-2 rounded-lg hover:bg-indigo-500/10"
                  >
                    Load Example
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-4 sm:p-6">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Paste your ${language} code here..\n`}
                  className="w-full h-80 sm:h-96 bg-[#020617] border border-white/10 rounded-xl p-4 font-mono text-xs sm:text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none placeholder:text-gray-600 transition-all"
                  spellCheck="false"
                />

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={analyzeCode}
                    disabled={loading || !code.trim()}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] glow-indigo text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Analyze Code
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setCode('');
                      setResult(null);
                      setError(null);
                      setUploadedFile(null);
                    }}
                    className="px-6 py-3 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all hover:scale-[1.02] text-sm sm:text-base"
                  >
                    Clear
                  </button>
                </div>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-red-300 font-medium mb-1">Error</p>
                        <p className="text-xs sm:text-sm text-red-300/80">{error}</p>
                      </div>
                      <button onClick={() => setError(null)}>
                        <X className="w-4 h-4 text-red-400 hover:text-red-300" />
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
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-white/10 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Analysis Results
                </h2>
              </div>

              {/* Results Content */}
              <div className="p-4 sm:p-6 h-[500px] sm:h-[600px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {!result && !loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center px-4"
                    >
                      <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 relative">
                        <Code className="w-10 h-10 text-indigo-400" />
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Ready to Analyze</h3>
                      <p className="text-sm text-gray-400 max-w-sm">
                        Enter your code or upload a file and click "Analyze" to get AI-powered feedback on quality, bugs, and optimizations
                      </p>
                    </motion.div>
                  )}

                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center"
                    >
                      <div className="relative mb-6">
                        <Loader2 className="w-16 h-16 text-indigo-400 animate-spin" />
                        <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-pulse" />
                      </div>
                      <p className="text-lg font-semibold text-white mb-2">Analyzing your code...</p>
                      <p className="text-sm text-gray-400">This may take a few seconds</p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Quality Score */}
                      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-400 font-medium text-sm">Code Quality Score</span>
                            <span className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${getScoreColor(result.score)} bg-clip-text text-transparent`}>
                              {result.score}/100
                            </span>
                          </div>
                          <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${result.score}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${getScoreColor(result.score)}`}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-3">
                            Based on maintainability, clarity, and best practices
                          </p>
                        </div>
                      </div>

                      {/* Bugs */}
                      {result.bugs && result.bugs.length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                            <Bug className="w-5 h-5 text-red-400" />
                            Bugs Found ({result.bugs.length})
                          </h3>
                          <div className="space-y-3">
                            {result.bugs.map((bug, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-slate-900/80 border rounded-xl p-4 ${getSeverityColor(bug.severity)}`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-xs font-bold uppercase tracking-wider">
                                    {bug.severity} Severity
                                  </span>
                                  {bug.line && (
                                    <span className="text-xs text-gray-500">Line {bug.line}</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-200 mb-2">{bug.description}</p>
                                {bug.suggestion && (
                                  <div className="mt-3 pt-3 border-t border-white/10">
                                    <p className="text-xs text-gray-400">
                                      <span className="text-indigo-400 font-semibold">💡 Fix: </span>
                                      {bug.suggestion}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Optimizations */}
                      {result.optimizations && result.optimizations.length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-yellow-400" />
                            Optimizations ({result.optimizations.length})
                          </h3>
                          <div className="space-y-3">
                            {result.optimizations.map((opt, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-900/80 border border-yellow-500/30 rounded-xl p-4"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
                                    {opt.type || 'Performance'}
                                  </span>
                                  {opt.line && (
                                    <span className="text-xs text-gray-500">Line {opt.line}</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-200 mb-2">{opt.description}</p>
                                {opt.suggestion && (
                                  <div className="mt-3 pt-3 border-t border-white/10">
                                    <p className="text-xs text-gray-400">
                                      <span className="text-yellow-400 font-semibold">⚡ Suggestion: </span>
                                      {opt.suggestion}
                                    </p>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Best Practices */}
                      {result.best_practices && result.best_practices.length > 0 && (
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-blue-400" />
                            Best Practices ({result.best_practices.length})
                          </h3>
                          <div className="space-y-3">
                            {result.best_practices.map((practice, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-900/80 border border-blue-500/30 rounded-xl p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                                      {practice.category || 'General'}
                                    </p>
                                    <p className="text-sm text-gray-200">{practice.description}</p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
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
