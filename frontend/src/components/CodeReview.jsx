import { useState } from "react";
import { motion } from "framer-motion";
import { Code, ArrowLeft, Send, RefreshCw, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { reviewCode } from "./api";

const SUPPORTED_FILE_TYPES = [".py", ".js", ".ts", ".cpp", ".java", ".go", ".rs"];

export default function CodeReview({ onBack }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
        const ext = "." + file.name.split(".").pop().toLowerCase();
        const matchedLang = SUPPORTED_FILE_TYPES.find((type) => type === ext);
        if (matchedLang) {
          const lang = matchedLang.replace(".", "");
          setLanguage(lang === "cpp" ? "c++" : lang);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
        const ext = "." + file.name.split(".").pop().toLowerCase();
        const matchedLang = SUPPORTED_FILE_TYPES.find((type) => type === ext);
        if (matchedLang) {
          const lang = matchedLang.replace(".", "");
          setLanguage(lang === "cpp" ? "c++" : lang);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReview = async () => {
    if (!code.trim()) {
      setError("Please enter or drop some code to review.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await reviewCode(code, language);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "bg-red-500/10 border-red-500/30";
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30";
      case "low":
        return "bg-blue-500/10 border-blue-500/30";
      default:
        return "bg-gray-500/10 border-gray-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-[#0a0a0f] text-white p-6"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Code className="text-emerald-400" size={28} />
            AI Code Review
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-300">Input Code</h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="c++">C++</option>
                <option value="java">Java</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
                dragActive
                  ? "border-emerald-500 bg-emerald-500/5"
                  : "border-white/10 hover:border-white/20"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here, or drag & drop a file..."
                className="w-full h-[500px] bg-[#0d0d14] rounded-xl p-4 resize-none focus:outline-none font-mono text-sm"
              />
              <input
                type="file"
                accept={SUPPORTED_FILE_TYPES.join(",")}
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                {code.length} chars
              </div>
            </div>

            <button
              onClick={handleReview}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="animate-spin" size={20} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Review Code
                </>
              )}
            </button>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle size={18} />
                {error}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-300">Review Results</h2>

            {result ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                  <div className="relative">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-700"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${(result.score / 100) * 251.2} 251.2`}
                        className="text-emerald-400"
                        style={{
                          strokeLinecap: "round",
                          transition: "stroke-dasharray 0.5s ease",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{result.score}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Code Quality Score</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {result.score >= 80
                        ? "Excellent! 🎉"
                        : result.score >= 60
                        ? "Good job 👍"
                        : "Needs improvement 💪"}
                    </p>
                  </div>
                </div>

                {result.bugs && result.bugs.length > 0 && (
                  <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="text-red-400" size={20} />
                      Bugs & Issues
                    </h3>
                    <div className="space-y-3">
                      {result.bugs.map((bug, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border ${getSeverityBg(bug.severity)}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-semibold uppercase ${getSeverityColor(bug.severity)}`}>
                              {bug.severity}
                            </span>
                            <span className="text-xs text-gray-500">Line {bug.line + 1}</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{bug.description}</p>
                          <p className="text-xs text-emerald-400">💡 {bug.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.optimizations && result.optimizations.length > 0 && (
                  <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Zap className="text-blue-400" size={20} />
                      Optimizations
                    </h3>
                    <div className="space-y-3">
                      {result.optimizations.map((opt, i) => (
                        <div key={i} className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs text-blue-400 uppercase">{opt.type}</span>
                            <span className="text-xs text-gray-500">Line {opt.line + 1}</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{opt.description}</p>
                          <p className="text-xs text-emerald-400">💡 {opt.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.best_practices && result.best_practices.length > 0 && (
                  <div className="p-5 rounded-xl bg-teal-500/5 border border-teal-500/20">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="text-teal-400" size={20} />
                      Best Practices
                    </h3>
                    <div className="space-y-2">
                      {result.best_practices.map((practice, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-xs text-teal-400 uppercase mr-2">{practice.category}</span>
                            <span className="text-sm text-gray-300">{practice.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="h-[500px] rounded-xl bg-[#0d0d14] border border-white/5 flex flex-col items-center justify-center text-gray-500">
                <Code size={48} className="mb-4 opacity-50" />
                <p>Enter some code and click "Review Code" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

