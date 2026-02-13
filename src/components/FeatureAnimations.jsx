import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CheckCircle2, FileText, User, ArrowRight } from "lucide-react";

// Animation 1: Technical Search
export function TechnicalSearchAnimation({ isActive }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const QUERY = "3-phase 480V SS pump • pickup Phoenix";

  useEffect(() => {
    if (!isActive) {
      setQuery("");
      setShowResults(false);
      return;
    }

    let i = 0;
    const timers = [];

    // Type the query
    const typeInterval = setInterval(() => {
      if (i < QUERY.length) {
        setQuery(QUERY.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowResults(true), 600));
      }
    }, 50);
    timers.push(typeInterval);

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full space-y-4">
        {/* System Status Bar */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Connected: Catalog + Inventory
            </span>
            <span>•</span>
            <span>Phoenix Branch</span>
            <span>•</span>
            <span>Contractor tier pricing</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              readOnly
              value={query}
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white"
              placeholder="Search for equipment..."
            />
            <Sparkles className="h-5 w-5 text-fuchsia-600" />
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 px-1">
                <Sparkles className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-fuchsia-600" />
                <p>Found 3 pumps matching your specs. Checked Phoenix inventory, filtered by voltage/phase, and cross-referenced material compatibility.</p>
              </div>
              {[
                { name: "Grundfos CR3-8 Pump", specs: "3-phase, 480V, SS316", price: "$2,450", location: "Phoenix • Pickup today" },
                { name: "Wilo Helix V 1006", specs: "3-phase, 480V, SS304", price: "$2,180", location: "Phoenix • Ships tomorrow" },
                { name: "Armstrong 4302 Series", specs: "3-phase, 460-480V, SS316L", price: "$2,820", location: "Tempe • Transfer available" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white">{item.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.specs}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{item.location}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{item.price}</p>
                      <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 justify-end">
                        <CheckCircle2 className="h-3 w-3" />
                        In stock
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Animation 2: RFQ Capture
export function RFQCaptureAnimation({ isActive }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    project: "",
    company: "",
    timeline: "",
    jobsiteZip: "",
    quoteType: "",
  });

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      setFormData({ project: "", company: "", timeline: "", jobsiteZip: "", quoteType: "" });
      return;
    }

    const timers = [];
    timers.push(setTimeout(() => setStep(1), 500));
    timers.push(setTimeout(() => setStep(2), 1200));
    timers.push(setTimeout(() => setFormData(d => ({ ...d, project: "3-ton system install" })), 1800));
    timers.push(setTimeout(() => setFormData(d => ({ ...d, company: "Phoenix HVAC Co" })), 2100));
    timers.push(setTimeout(() => setFormData(d => ({ ...d, timeline: "This week" })), 2400));
    timers.push(setTimeout(() => setFormData(d => ({ ...d, jobsiteZip: "85004" })), 2700));
    timers.push(setTimeout(() => setFormData(d => ({ ...d, quoteType: "Firm quote" })), 3000));
    timers.push(setTimeout(() => setStep(3), 3600));

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto space-y-4">
        {/* Account Context Bar */}
        <div className="text-xs text-slate-600 dark:text-slate-400 px-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Account: Phoenix HVAC Co
            </span>
            <span>•</span>
            <span>Contractor pricing active</span>
          </div>
        </div>
        {/* Chat Message */}
        <AnimatePresence mode="wait">
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-900 dark:text-white">
                    I can help you get a quote. Let me collect a few details about your project.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5 border-2 border-fuchsia-200 dark:border-fuchsia-800"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-fuchsia-600" />
                <h3 className="font-semibold text-slate-900 dark:text-white">RFQ Summary (ready for sales)</h3>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      Project
                    </label>
                    <input
                      readOnly
                      value={formData.project}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                      placeholder="..."
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      Company
                    </label>
                    <input
                      readOnly
                      value={formData.company}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                      placeholder="..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      Timeline
                    </label>
                    <input
                      readOnly
                      value={formData.timeline}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                      placeholder="..."
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                      Jobsite ZIP
                    </label>
                    <input
                      readOnly
                      value={formData.jobsiteZip}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                      placeholder="..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-1">
                    Quote Type
                  </label>
                  <input
                    readOnly
                    value={formData.quoteType}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                    placeholder="..."
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                    RFQ Captured
                  </p>
                  <div className="text-xs text-green-800 dark:text-green-200 space-y-0.5">
                    <p><strong>Routed to:</strong> Phoenix Branch Counter</p>
                    <p><strong>SLA:</strong> Same day response</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Animation 3: Substitutes / Out-of-Stock
export function SubstitutesAnimation({ isActive }) {
  const [showOOS, setShowOOS] = useState(false);
  const [showSubstitutes, setShowSubstitutes] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShowOOS(false);
      setShowSubstitutes(false);
      return;
    }

    const timers = [];
    timers.push(setTimeout(() => setShowOOS(true), 800));
    timers.push(setTimeout(() => setShowSubstitutes(true), 1800));

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full">
        {/* System Context Bar */}
        <div className="text-xs text-slate-600 dark:text-slate-400 mb-4 px-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Live inventory feed
            </span>
            <span>•</span>
            <span>Phoenix Branch</span>
            <span>•</span>
            <span>Cross-referencing 3 suppliers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-4 items-start">
          {/* Product Image - Left Side */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-6 flex items-center justify-center">
              <img
                src="/media/hvac-unit-1.svg"
                alt="Carrier Part #38MGRQ36D3"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="font-semibold text-slate-900 dark:text-white">Carrier #38MGRQ36D3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">3-ton condenser coil</div>
              <AnimatePresence mode="wait">
                {!showOOS ? (
                  <motion.span
                    key="checking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-block text-xs text-slate-500 mt-2"
                  >
                    Checking availability...
                  </motion.span>
                ) : (
                  <motion.span
                    key="oos"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded mt-2"
                  >
                    Out of stock
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Substitutes - Right Side */}
          <div className="space-y-3">
            {/* AI Message */}
            <AnimatePresence>
              {showOOS && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 border border-fuchsia-200 dark:border-fuchsia-800"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-fuchsia-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-900 dark:text-white">
                      This part is backordered until March 15th. Here are 3 compatible alternatives available now:
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Substitute Products */}
            <AnimatePresence>
              {showSubstitutes && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1">
                    Compatible Substitutes
                  </div>
                  {[
                    { name: "Trane BAYCOIL36A", specs: "Direct replacement • Same tonnage", price: "$485", eta: "In stock" },
                    { name: "Goodman CAPF3636B6", specs: "Compatible match • Standard efficiency", price: "$420", eta: "Ships today" },
                    { name: "Lennox LB-92690C", specs: "Upgraded efficiency • Same fit", price: "$510", eta: "In stock" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow p-3 border border-green-200 dark:border-green-800"
                    >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{item.name}</h4>
                          {i === 0 && (
                            <span className="text-xs bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 px-2 py-0.5 rounded-full font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{item.specs}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-semibold text-sm text-slate-900 dark:text-white">{item.price}</p>
                        <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1 justify-end">
                          <CheckCircle2 className="h-3 w-3" />
                          {item.eta}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {i === 0 ? "Phoenix • Pickup today" : i === 1 ? "Phoenix • Ships today" : "Tempe • Transfer available"}
                    </div>
                  </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animation 4: Compatibility Q&A
export function CompatibilityAnimation({ isActive }) {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const QUESTION = "What air handlers work with this unit?";

  useEffect(() => {
    if (!isActive) {
      setQuestion("");
      setShowAnswer(false);
      setShowMatches(false);
      return;
    }

    let i = 0;
    const timers = [];

    // Type the question
    const typeInterval = setInterval(() => {
      if (i < QUESTION.length) {
        setQuestion(QUESTION.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowAnswer(true), 600));
        timers.push(setTimeout(() => setShowMatches(true), 1400));
      }
    }, 50);
    timers.push(typeInterval);

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full">
        {/* Context Bar */}
        <div className="text-xs text-slate-600 dark:text-slate-400 mb-4 px-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Referencing: OEM spec sheets + compatibility matrix
            </span>
            <span>•</span>
            <span>Phoenix inventory</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-4 items-start">
          {/* Product Image - Left Side */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-4 flex items-center justify-center">
              <img
                src="/media/hvac-unit-1.svg"
                alt="Carrier 25VNA4 3-Ton Heat Pump"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-3 border-t border-slate-200 dark:border-slate-700">
              <div className="font-semibold text-sm text-slate-900 dark:text-white">Carrier 25VNA4 3-Ton</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">16 SEER2 • $3,450</div>
            </div>
          </div>

          {/* Q&A - Right Side */}
          <div className="space-y-3">
            {/* Question Input */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 border border-fuchsia-200 dark:border-fuchsia-800">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-fuchsia-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Ask about this product</span>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-700 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 text-sm text-slate-900 dark:text-white min-h-[20px]">
                  {question || <span className="text-slate-400">Ask a question...</span>}
                  {question.length > 0 && question.length < QUESTION.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </div>
              </div>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-2xl shadow p-4 border border-fuchsia-100 dark:border-fuchsia-800"
                >
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Carrier FB4CNF036 and FB4CNF042 are factory-matched air handlers for the 25VNA4. Want variable-speed or lowest cost?
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Source: Carrier installation manual + compatibility database
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compatible Products */}
            <AnimatePresence>
              {showMatches && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1">
                    Compatible Air Handlers
                  </div>
                  {[
                    { name: "Carrier FB4CNF036", specs: "3-ton • Variable speed", img: "/media/air-handler-1.svg" },
                    { name: "Carrier FB4CNF042", specs: "3.5-ton • Variable speed", img: "/media/air-handler-2.svg" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow p-2 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1.5">
                          <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs text-slate-900 dark:text-white truncate">{item.name}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{item.specs}</div>
                          <div className="flex items-center gap-1.5 mt-1 text-xs">
                            <span className="inline-flex items-center gap-0.5 text-green-600 dark:text-green-400">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              <span className="text-[10px]">Stock</span>
                            </span>
                            <span className="text-slate-400 text-[10px]">•</span>
                            <span className="text-slate-500 dark:text-slate-400 text-[10px]">
                              {i === 0 ? "Pickup today" : "Will-call"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="flex gap-2 pt-2 px-1">
                    <button className="flex-1 h-8 px-3 text-xs rounded-lg font-medium bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:opacity-90 transition">
                      Add to RFQ
                    </button>
                    <button className="flex-1 h-8 px-3 text-xs rounded-lg font-medium border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
