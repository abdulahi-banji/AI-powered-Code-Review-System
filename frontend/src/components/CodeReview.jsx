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
      high: 'border-[var(--color-error)]/30 bg-[var(--color-error)]/10 text-red-300',
      medium: 'border-[var(--color-warning)]/30 bg-[var(--color-warning)]/10 text-yellow-300',
      low: 'border-blue-500/30 bg-blue-500/10 text-blue-300'
    };
    return colors[severity] || colors.medium;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-[var(--color-success)]';
    if (score >= 60) return 'text-[var(--color-warning)]';
    return 'text-[var(--color-error)]';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-[var(--color-success)]';
    if (score >= 60) return 'bg-[var(--color-warning)]';
    return 'bg-[var(--color-error)]';
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
    <div className="min-h-screen app-background text-primary">
      <div className="fixed inset-0 grid-overlay pointer-events-none" />

      {/* Header */}
      <nav className="fixed top-0 w-full z-[var(--z-fixed)] bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-secondary hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline font-medium text-sm">Back to Home</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[var(--color-accent-primary)] rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-primary">Code Analyzer</span>
          </div>
          <div className="w-20 sm:w-24" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 badge mb-4">
              <div className="w-1.5 h-1.5 bg-[var(--color-accent-primary)] rounded-full" />
              <span>GPT-4 Powered Analysis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-primary">
              Analyze Your Code
            </h1>
            <p className="text-secondary text-sm sm:text-base">
              Get instant AI-powered feedback on quality, bugs, and optimizations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="card overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-default)] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-[var(--color-accent-primary)]" />
                    <h2 className="text-lg font-semibold text-primary">Your Code</h2>
                  </div>
                  <button
                    onClick={copyCode}
                    className="btn btn-ghost text-xs px-2 py-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[var(--color-success)]" />
                        <span className="text-[var(--color-success)] hidden sm:inline">Copied</span>
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
                  <select
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value); setUploadedFile(null); }}
                    className="input text-sm px-3 py-2"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>

                  <label className="btn btn-ghost px-2 py-2 cursor-pointer">
                    <Upload className="w-4.5 h-4.5 text-[var(--color-accent-primary)]" />
                    <input
                      type="file"
                      accept={languageFileTypes[language]}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-tertiary">
                    {uploadedFile ? uploadedFile.name : "No file chosen"}
                  </span>

                  <button
                    onClick={loadExample}
                    className="text-xs text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)] transition-colors px-3 py-2 rounded-md hover:bg-[var(--color-surface-secondary)]"
                  >
                    Load Example
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="p-5">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`// Paste your ${language} code here..`}
                  className="textarea h-80 sm:h-96 text-sm"
                  spellCheck="false"
                />

                {/* Action Buttons */}
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={analyzeCode}
                    disabled={loading || !code.trim()}
                    className="flex-1 btn btn-primary py-3 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Code className="w-5 h-5" />
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
                    className="btn btn-secondary py-3 text-sm"
                  >
                    Clear
                  </button>
                </div>

                {/* Error Display */}
                <AnimatePresence>
                  {error && (
                    <motion.div {...fadeIn} className="alert alert-error mt-4">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-0.5">Error</p>
                        <p className="text-xs opacity-90">{error}</p>
                      </div>
                      <button onClick={() => setError(null)}>
                        <X className="w-4 h-4 hover:opacity-70" />
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
              className="card overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-default)] p-5">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5 text-[var(--color-accent-primary)]" />
                  Analysis Results
                </h2>
              </div>

              {/* Results Content */}
              <div className="p-5 h-[500px] sm:h-[600px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {!result && !loading && (
                    <motion.div
                      {...fadeIn}
                      className="h-full flex flex-col items-center justify-center text-center px-4"
                    >
                      <div className="w-16 h-16 bg-[var(--color-accent-primary)]/10 rounded-full flex items-center justify-center mb-4">
                        <Code className="w-8 h-8 text-[var(--color-accent-primary)]" />
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">Ready to Analyze</h3>
                      <p className="text-sm text-secondary max-w-sm leading-relaxed">
                        Enter your code or upload a file and click Analyze to receive AI-powered feedback
                      </p>
                    </motion.div>
                  )}

                  {loading && (
                    <motion.div
                      {...fadeIn}
                      className="h-full flex flex-col items-center justify-center"
                    >
                      <Loader2 className="w-12 h-12 text-[var(--color-accent-primary)] animate-spin mb-4" />
                      <p className="text-base font-medium text-primary mb-1">Analyzing your code</p>
                      <p className="text-sm text-secondary">This may take a few seconds</p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div {...fadeIn} className="space-y-6">
                      {/* Quality Score */}
                      <div className="card p-5 border-[var(--color-accent-primary)]/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-secondary font-medium text-sm">Code Quality Score</span>
                          <span className={`text-4xl font-semibold ${getScoreColor(result.score)}`}>
                            {result.score}/100
                          </span>
                        </div>
                        <div className="w-full bg-[var(--color-surface-secondary)] rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${result.score}%` }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className={`h-full ${getScoreBg(result.score)}`}
                          />
                        </div>
                        <p className="text-xs text-tertiary mt-2">
                          Based on maintainability, clarity, and best practices
                        </p>
                      </div>

                      {/* Bugs */}
                      {result.bugs && result.bugs.length > 0 && (
                        <div>
                          <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary">
                            <Bug className="w-5 h-5 text-[var(--color-error)]" />
                            Bugs Found ({result.bugs.length})
                          </h3>
                          <div className="space-y-3">
                            {result.bugs.map((bug, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.2 }}
                                className={`card p-4 border ${getSeverityColor(bug.severity)}`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-xs font-semibold uppercase">
                                    {bug.severity} Severity
                                  </span>
                                  {bug.line && (
                                    <span className="text-xs text-tertiary">Line {bug.line}</span>
                                  )}
                                </div>
                                <p className="text-sm text-primary mb-2">{bug.description}</p>
                                {bug.suggestion && (
                                  <div className="mt-3 pt-3 border-t border-[var(--color-border-default)]">
                                    <p className="text-xs text-secondary">
                                      <span className="text-[var(--color-accent-primary)] font-medium">Fix: </span>
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
                          <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary">
                            <TrendingUp className="w-5 h-5 text-[var(--color-warning)]" />
                            Optimizations ({result.optimizations.length})
                          </h3>
                          <div className="space-y-3">
                            {result.optimizations.map((opt, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.2 }}
                                className="card p-4 border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <span className="text-xs font-semibold text-[var(--color-warning)] uppercase">
                                    {opt.type || 'Performance'}
                                  </span>
                                  {opt.line && (
                                    <span className="text-xs text-tertiary">Line {opt.line}</span>
                                  )}
                                </div>
                                <p className="text-sm text-primary mb-2">{opt.description}</p>
                                {opt.suggestion && (
                                  <div className="mt-3 pt-3 border-t border-[var(--color-border-default)]">
                                    <p className="text-xs text-secondary">
                                      <span className="text-[var(--color-warning)] font-medium">Suggestion: </span>
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
                          <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-primary">
                            <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
                            Best Practices ({result.best_practices.length})
                          </h3>
                          <div className="space-y-3">
                            {result.best_practices.map((practice, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.2 }}
                                className="card p-4 border border-[var(--color-success)]/30 bg-[var(--color-success)]/5"
                              >
                                <div className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-xs font-medium text-[var(--color-success)] uppercase mb-1">
                                      {practice.category || 'General'}
                                    </p>
                                    <p className="text-sm text-primary">{practice.description}</p>
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