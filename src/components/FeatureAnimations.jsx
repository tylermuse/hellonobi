import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CheckCircle2, FileText, User, ArrowRight } from "lucide-react";

export function TechnicalSearchAnimation({ isActive }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const QUERY = "replacement 480V motor • 3-phase • any branch Phoenix";

  useEffect(() => {
    if (!isActive) { setQuery(""); setShowResults(false); return; }
    let i = 0;
    const timers = [];
    const typeInterval = setInterval(() => {
      if (i < QUERY.length) { setQuery(QUERY.slice(0, i + 1)); i++; }
      else { clearInterval(typeInterval); timers.push(setTimeout(() => setShowResults(true), 600)); }
    }, 50);
    timers.push(typeInterval);
    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg shadow-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Connected: Catalog + Inventory</span> <span className="text-emerald-600 ml-1">Connected</span>
          </div>
          <span>• <span className="text-black/60 dark:text-white/60">Phoenix Branch</span> • <span className="text-black/60 dark:text-white/60">Contractor pricing</span></span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-violet-500 flex-shrink-0" />
          <span className="text-sm text-black/80 dark:text-white/80 truncate flex-1">{query || "Search for parts..."}</span>
        </div>
        <AnimatePresence>
          {showResults && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <div className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
                <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
                <span>Found 3 replacement motors matching your specs. Checked all Phoenix branches, filtered by voltage/phase, and verified cross-compatibility.</span>
              </div>
              {[
                { name: "Baldor M3615T Motor", specs: "3-phase, 480V, 5HP", price: "$890", location: "Phoenix Main • Pickup today" },
                { name: "WEG 00536ET3E215T", specs: "3-phase, 460-480V, 5HP", price: "$825", location: "Phoenix North • Will-call" },
                { name: "Leeson C145T17FB6", specs: "3-phase, 480V, 5HP", price: "$940", location: "Tempe • Transfer today" },
              ].map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black dark:text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-black/50 dark:text-white/50">{item.specs}</p>
                    <p className="text-[10px] text-black/40 dark:text-white/40">{item.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-black dark:text-white">{item.price}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />In stock
                    </span>
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

export function RFQCaptureAnimation({ isActive }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ project: "", company: "", timeline: "", jobsiteZip: "", quoteType: "" });

  useEffect(() => {
    if (!isActive) { setStep(0); setFormData({ project: "", company: "", timeline: "", jobsiteZip: "", quoteType: "" }); return; }
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
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg shadow-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Account: Phoenix HVAC Co</span>
          </div>
          <span>• <span className="text-black/60 dark:text-white/60">Contractor pricing</span></span>
        </div>
        <AnimatePresence>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
              <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
              <span>I can help you get a quote for an emergency replacement. Let me collect a few details to expedite this.</span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-3 space-y-2">
              <p className="text-[11px] font-semibold text-black/60 dark:text-white/60">RFQ Summary (ready for sales)</p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {[["Project", formData.project], ["Company", formData.company], ["Timeline", formData.timeline], ["Jobsite ZIP", formData.jobsiteZip], ["Quote Type", formData.quoteType]].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-black/40 dark:text-white/40">{label}</p>
                    <p className="text-black/80 dark:text-white/80 font-medium h-4">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 p-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300">RFQ Captured</p>
                <p className="text-emerald-600 dark:text-emerald-400">Routed to: Phoenix Counter Team</p>
                <p className="text-emerald-600 dark:text-emerald-400">Priority: Emergency / same day</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SubstitutesAnimation({ isActive }) {
  const [showOOS, setShowOOS] = useState(false);
  const [showSubstitutes, setShowSubstitutes] = useState(false);

  useEffect(() => {
    if (!isActive) { setShowOOS(false); setShowSubstitutes(false); return; }
    const timers = [];
    timers.push(setTimeout(() => setShowOOS(true), 800));
    timers.push(setTimeout(() => setShowSubstitutes(true), 1800));
    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg shadow-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Live inventory</span>
          </div>
          <span>• <span className="text-black/60 dark:text-white/60">Phoenix</span> • <span className="text-black/60 dark:text-white/60">3 suppliers</span></span>
        </div>

        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-white/10 flex-shrink-0 overflow-hidden">
            <img src="/media/carrier-condenser-coil.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-sm font-medium text-black dark:text-white">Carrier #38MGRQ36D3</p>
            <p className="text-[11px] text-black/50 dark:text-white/50">3-ton condenser coil</p>
            {!showOOS ? (
              <p className="text-[11px] text-amber-600 mt-1">Checking availability...</p>
            ) : (
              <p className="text-[11px] text-red-600 mt-1 font-medium">Out of stock</p>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showOOS && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
              <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
              <span>This part is backordered until March 15th. Here are 3 compatible alternatives available now:</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubstitutes && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <p className="text-[11px] font-semibold text-black/50 dark:text-white/50">Compatible Substitutes</p>
              {[
                { name: "Trane BAYCOIL36A", specs: "Direct replacement • Same tonnage", price: "$485", eta: "In stock", recommended: true },
                { name: "Goodman CAPF3636B6", specs: "Compatible match • Standard efficiency", price: "$420", eta: "Ships today", recommended: false },
                { name: "Lennox LB-92690C", specs: "Upgraded efficiency • Same fit", price: "$510", eta: "In stock", recommended: false },
              ].map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-black dark:text-white truncate">{item.name}</p>
                      {item.recommended && <span className="text-[9px] bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-full font-medium">Recommended</span>}
                    </div>
                    <p className="text-[11px] text-black/50 dark:text-white/50">{item.specs}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-black dark:text-white">{item.price}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{item.eta}</p>
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

export function CompatibilityAnimation({ isActive }) {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const QUESTION = "What air handlers work with this unit?";

  useEffect(() => {
    if (!isActive) { setQuestion(""); setShowAnswer(false); setShowMatches(false); return; }
    let i = 0;
    const timers = [];
    const typeInterval = setInterval(() => {
      if (i < QUESTION.length) { setQuestion(QUESTION.slice(0, i + 1)); i++; }
      else { clearInterval(typeInterval); timers.push(setTimeout(() => setShowAnswer(true), 600)); timers.push(setTimeout(() => setShowMatches(true), 1400)); }
    }, 50);
    timers.push(typeInterval);
    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg shadow-lg overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Referencing: OEM specs + compatibility</span>
          </div>
          <span>• <span className="text-black/60 dark:text-white/60">Phoenix inventory</span></span>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-3">
          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-white/10 flex-shrink-0 overflow-hidden">
            <img src="/media/carrier-25vna4.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-sm font-medium text-black dark:text-white">Carrier 25VNA4 3-Ton</p>
            <p className="text-[11px] text-black/50 dark:text-white/50">16 SEER2 • $3,450</p>
          </div>
        </div>

        <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3">
          <p className="text-[11px] text-black/40 dark:text-white/40 mb-1">Ask about this product</p>
          <p className="text-sm text-black/80 dark:text-white/80">
            {question || <span className="text-black/30 dark:text-white/30">Ask a question...</span>}
            {question.length > 0 && question.length < QUESTION.length && <span className="animate-pulse ml-0.5">|</span>}
          </p>
        </div>

        <AnimatePresence>
          {showAnswer && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
              <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
              <div>
                <p>Carrier FB4CNF036 and FB4CNF042 are factory-matched air handlers for the 25VNA4. Want variable-speed or lowest cost?</p>
                <p className="mt-1 text-[10px] text-black/30 dark:text-white/30">Source: Carrier manual + compatibility database</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showMatches && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <p className="text-[11px] font-semibold text-black/50 dark:text-white/50">Compatible Air Handlers</p>
              {[
                { name: "Carrier FB4CNF036", specs: "3-ton • Variable speed", avail: "Pickup today" },
                { name: "Carrier FB4CNF042", specs: "3.5-ton • Variable speed", avail: "Will-call" },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 flex-shrink-0 overflow-hidden">
                    <img src="/media/carrier-air-handler-new.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-black dark:text-white">{item.name}</p>
                    <p className="text-[10px] text-black/50 dark:text-white/50">{item.specs}</p>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{item.avail}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
