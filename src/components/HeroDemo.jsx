import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

const VERTICAL_CONTENT = {
  auto: {
    label: "Auto Parts",
    query: "replacement alternator • 2019 Toyota Camry 2.5L • any location today",
    searchMessage: "Found 3 compatible alternators for 2019 Camry 2.5L. Checked inventory across all locations, verified direct-fit compatibility, and filtered by availability today.",
    equipment: [
      {
        title: "Denso 210-5320 Alternator",
        specs: "130A • OEM Direct Fit",
        price: "$285",
        availability: "Pickup today",
        location: "Phoenix Main",
        img: "/media/denso-alternator.png",
      },
      {
        title: "Bosch AL0890X Alternator",
        specs: "130A • Remanufactured",
        price: "$195",
        availability: "Phoenix North • Will-call",
        location: "Phoenix North",
        img: "/media/bosch-alternator.png",
      },
      {
        title: "TYC 2-13992 Alternator",
        specs: "130A • New Aftermarket",
        price: "$165",
        availability: "Tempe • Transfer 2hrs",
        location: "Tempe",
        img: "/media/tyc-alternator.png",
      },
    ],
    rfqQuery: "Need quote for brake job • 2018 Honda Accord",
    rfqProject: "Front & rear brake pads + rotors",
    rfqCompany: "Valley Auto Service",
    rfqMessage: "I can help you get a quote for a brake job on your 2018 Honda Accord.",
    rfqSubMessage: "To provide an accurate quote, I'll need a few details:",
    locationContext: "Phoenix Auto Parts",
    accountType: "Shop account pricing",
    compatibilityQuestion: "Do these brake pads fit 2018 Accord Sport trim?",
    compatibilityAnswer: "Yes, Akebono ACT1089 fits all 2018 Accord trims including Sport. These are ceramic, low-dust pads. Want OEM or performance upgrade?",
  },
  hvac: {
    label: "HVAC",
    query: "replacement 3-ton compressor • Carrier compatible • any location today",
    searchMessage: "Found 3 compatible compressors for Carrier units. Checked inventory across all locations and verified direct replacement compatibility.",
    equipment: [
      {
        title: "Copeland ZP36K5E-PFV",
        specs: "3-ton • Scroll Compressor",
        price: "$1,285",
        availability: "Pickup today",
        location: "Phoenix Main",
        img: "/media/mrcool-heat-pump.png",
      },
      {
        title: "Tecumseh AKA4440EXD",
        specs: "3-ton • Scroll Compressor",
        price: "$1,150",
        availability: "Phoenix North • Will-call",
        location: "Phoenix North",
        img: "/media/trane-xr14.png",
      },
      {
        title: "Emerson CR36K6E-PFV",
        specs: "3-ton • Scroll Compressor",
        price: "$1,325",
        availability: "Tempe • Transfer 2hrs",
        location: "Tempe",
        img: "/media/lennox-ml14xc1.png",
      },
    ],
    rfqQuery: "Need quote for emergency compressor replacement",
    rfqProject: "Compressor replacement",
    rfqCompany: "Phoenix HVAC Co",
    rfqMessage: "I can help you get a quote for an emergency compressor replacement.",
    rfqSubMessage: "To expedite your quote, I'll need a few details:",
    locationContext: "Phoenix HVAC Supply",
    accountType: "Contractor pricing",
    compatibilityQuestion: "What air handler pairs with the Carrier 25VNA4?",
    compatibilityAnswer: "Carrier FB4CNF036 and FB4CNF042 are factory-matched air handlers for the 25VNA4. Want variable-speed or lowest cost?",
  },
  electrical: {
    label: "Electrical",
    query: "replacement 480V motor • 3-phase • any location Phoenix",
    searchMessage: "Found 3 replacement motors matching your specs. Checked all Phoenix locations, filtered by voltage/phase, and verified cross-compatibility.",
    equipment: [
      {
        title: "Baldor M3615T Motor",
        specs: "3-phase, 480V, 5HP",
        price: "$890",
        availability: "Pickup today",
        location: "Phoenix Main",
        img: "/media/baldor-motor.png",
      },
      {
        title: "WEG 00536ET3E215T",
        specs: "3-phase, 460-480V, 5HP",
        price: "$825",
        availability: "Phoenix North • Will-call",
        location: "Phoenix North",
        img: "/media/weg-motor.png",
      },
      {
        title: "Leeson C145T17FB6",
        specs: "3-phase, 480V, 5HP",
        price: "$940",
        availability: "Tempe • Transfer today",
        location: "Tempe",
        img: "/media/leeson-motor.png",
      },
    ],
    rfqQuery: "Need quote for motor replacement • urgent",
    rfqProject: "480V motor replacement",
    rfqCompany: "Phoenix Industrial Electric",
    rfqMessage: "I can help you get a quote for an urgent motor replacement.",
    rfqSubMessage: "To expedite your quote, I'll need a few details:",
    locationContext: "Phoenix Electrical Supply",
    accountType: "Commercial account pricing",
    compatibilityQuestion: "Will this motor work with my existing VFD?",
    compatibilityAnswer: "Yes, Baldor M3615T is VFD-rated (inverter duty). It's compatible with most 480V VFDs. Need encoder or standard shaft?",
  },
};

function Button({ variant = "primary", size = "md", className = "", children, ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-[15px]",
    lg: "h-12 px-6 text-base",
    compact: "h-8 px-3 text-sm",
  };
  const variants = {
    primary: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-sm",
    ghost: "bg-transparent text-black/80 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10",
    outline: "border border-black/10 dark:border-white/15 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10",
    ai: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 shadow-sm",
  };
  return (
    <button className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}

function SearchBar({ query, placeholder = "Search for parts, equipment, or specs...", locked = true }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 shadow-sm">
        <Sparkles className="w-4 h-4 text-violet-500 flex-shrink-0" />
        <span className="text-sm text-black/80 dark:text-white/80 truncate flex-1">{query || placeholder}</span>
        <Button variant="primary" size="compact" className="flex-shrink-0">Search</Button>
      </div>
    </div>
  );
}

function TechnicalSearchDemo({ isActive, vertical = 'auto' }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const content = VERTICAL_CONTENT[vertical];
  const demoQuery = content.query;
  const equipment = content.equipment;
  const searchMessage = content.searchMessage;
  const accountType = content.accountType;

  useEffect(() => {
    if (!isActive) {
      setQuery("");
      setShowResults(false);
      setSelectedIndex(-1);
      return;
    }
    let i = 0;
    const timers = [];
    const typeInterval = setInterval(() => {
      if (i < demoQuery.length) {
        setQuery(demoQuery.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowResults(true), 600));
        timers.push(setTimeout(() => setSelectedIndex(0), 2000));
      }
    }, 35);
    timers.push(typeInterval);
    return () => timers.forEach(clearTimeout);
  }, [isActive, vertical]);

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Connected: Catalog + Inventory</span>
        </div>
        <span>• <span className="text-black/60 dark:text-white/60">Phoenix Location</span> • <span className="text-black/60 dark:text-white/60">{accountType}</span></span>
      </div>
      <SearchBar query={query} />
      {showResults && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
            <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
            <span>{searchMessage}</span>
          </div>
          <div className="space-y-2">
            {equipment.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition cursor-pointer ${
                  i === selectedIndex ? "border-violet-200 bg-violet-50/50 dark:bg-violet-500/5 dark:border-violet-500/20" : "border-black/5 dark:border-white/10 bg-white dark:bg-white/5"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-white/10 flex-shrink-0 overflow-hidden">
                  <img src={item.img} alt="" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black dark:text-white truncate">{item.title}</p>
                  <p className="text-[11px] text-black/50 dark:text-white/50">{item.specs}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-black dark:text-white">{item.price}</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{item.availability}</p>
                  <p className="text-[10px] text-black/40 dark:text-white/40">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function RFQCaptureDemo({ isActive, vertical = 'auto' }) {
  const [query, setQuery] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", phone: "", jobsiteZip: "", timeline: "", quoteType: "" });
  const content = VERTICAL_CONTENT[vertical];

  useEffect(() => {
    if (!isActive) {
      setQuery(""); setShowResponse(false); setShowForm(false); setShowConfirmation(false);
      setFormData({ name: "", company: "", phone: "", jobsiteZip: "", timeline: "", quoteType: "" });
      return;
    }
    let i = 0;
    const timers = [];
    const typeInterval = setInterval(() => {
      if (i < content.rfqQuery.length) {
        setQuery(content.rfqQuery.slice(0, i + 1)); i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowResponse(true), 600));
        timers.push(setTimeout(() => setShowForm(true), 1200));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, name: "Mike Johnson" })), 2000));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, company: content.rfqCompany })), 2300));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, phone: "(602) 555-0123" })), 2600));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, jobsiteZip: "85004" })), 2900));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, timeline: "This week" })), 3200));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, quoteType: "Firm quote" })), 3500));
        timers.push(setTimeout(() => setShowConfirmation(true), 4200));
      }
    }, 40);
    timers.push(typeInterval);
    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Account: {content.rfqCompany}</span>
        </div>
        <span>• <span className="text-black/60 dark:text-white/60">{content.accountType}</span></span>
      </div>
      <SearchBar query={query} />
      {showResponse && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
          <div>
            <p>{content.rfqMessage}</p>
            <p className="mt-1 text-black/40 dark:text-white/40">{content.rfqSubMessage}</p>
          </div>
        </motion.div>
      )}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-3 space-y-2">
          <p className="text-[11px] font-semibold text-black/60 dark:text-white/60">RFQ Summary (ready for sales)</p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {[
              ["Contact Name", formData.name],
              ["Company", formData.company],
              ["Phone", formData.phone],
              ["Jobsite ZIP", formData.jobsiteZip],
              ["Timeline", formData.timeline],
              ["Quote Type", formData.quoteType],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-black/40 dark:text-white/40">{label}</p>
                <p className="text-black/80 dark:text-white/80 font-medium h-4">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      {showConfirmation && (
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
    </div>
  );
}

function CompatibilityDemo({ isActive, vertical = 'auto' }) {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const content = VERTICAL_CONTENT[vertical];
  const compatQuestion = content.compatibilityQuestion;
  const compatAnswer = content.compatibilityAnswer;

  useEffect(() => {
    if (!isActive) {
      setQuestion(""); setShowAnswer(false); setShowSpecs(false); return;
    }
    let i = 0;
    const timers = [];
    const typeInterval = setInterval(() => {
      if (i < compatQuestion.length) {
        setQuestion(compatQuestion.slice(0, i + 1)); i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowAnswer(true), 600));
        timers.push(setTimeout(() => setShowSpecs(true), 1800));
      }
    }, 45);
    timers.push(typeInterval);
    return () => timers.forEach(clearTimeout);
  }, [isActive, vertical]);

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between text-[11px] text-black/40 dark:text-white/40">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Referencing: OEM spec sheets + compatibility matrix</span>
        </div>
        <span>• <span className="text-black/60 dark:text-white/60">Phoenix inventory</span></span>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-3">
        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-white/10 flex-shrink-0 overflow-hidden">
          <img src="/media/carrier-25vna4.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-sm font-medium text-black dark:text-white">Carrier 25VNA4 3-Ton Heat Pump</p>
          <p className="text-[11px] text-black/50 dark:text-white/50">16 SEER2 • Single Stage • $3,450</p>
        </div>
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3">
        <p className="text-[11px] text-black/40 dark:text-white/40 mb-1">Ask about compatibility</p>
        <p className="text-sm text-black/80 dark:text-white/80">
          {question || <span className="text-black/30 dark:text-white/30">Ask a question...</span>}
          {question.length > 0 && question.length < compatQuestion.length && (
            <span className="animate-pulse ml-0.5">|</span>
          )}
        </p>
      </div>

      {showAnswer && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-2 text-xs text-black/60 dark:text-white/60 bg-violet-50/50 dark:bg-violet-500/5 rounded-xl p-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
          <div>
            <p>{compatAnswer}</p>
            <p className="mt-1 text-[10px] text-black/30 dark:text-white/30">Source: Carrier manual + compatibility database</p>
          </div>
        </motion.div>
      )}

      {showSpecs && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <p className="text-[11px] font-semibold text-black/50 dark:text-white/50">Compatible Air Handlers</p>
          {[
            { name: "Carrier FB4CNF036", specs: "3-ton • Variable speed", avail: "Pickup today" },
            { name: "Carrier FB4CNF042", specs: "3.5-ton • Variable speed", avail: "Ships tomorrow" },
          ].map((item) => (
            <div key={item.name} className="flex items-center gap-3 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 flex-shrink-0 overflow-hidden">
                <img src="/media/carrier-air-handler-new.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-black dark:text-white">{item.name}</p>
                <p className="text-[10px] text-black/50 dark:text-white/50">{item.specs}</p>
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400">{item.avail}</div>
            </div>
          ))}
          <div className="flex gap-2">
            <Button size="compact" variant="outline" className="flex-1 text-xs">Add to RFQ</Button>
            <Button size="compact" className="flex-1 text-xs">Add to Cart</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function HeroDemo({ className = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [vertical, setVertical] = useState('auto');

  const slides = [
    { id: "search", label: "Technical Search" },
    { id: "rfq", label: "RFQ Capture" },
    { id: "compatibility", label: "Compatibility Q&A" },
  ];

  const goPrev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % slides.length);

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-lg shadow-xl overflow-hidden">
        {/* Vertical Switcher */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <span className="text-xs text-black/40 dark:text-white/40 mr-1">See it for:</span>
          {Object.entries(VERTICAL_CONTENT).map(([key, value]) => (
            <button key={key} onClick={() => setVertical(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                vertical === key
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-sm"
                  : "bg-white/50 dark:bg-white/5 text-black/70 dark:text-white/70 border border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/10"
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 dark:border-white/10">
          <span className="text-sm font-semibold text-black dark:text-white">{slides[activeIndex].label}</span>
          <div className="flex items-center gap-1">
            <button onClick={goPrev} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={goNext} className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div key={`${activeIndex}-${vertical}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {activeIndex === 0 && <TechnicalSearchDemo isActive={true} vertical={vertical} />}
              {activeIndex === 1 && <RFQCaptureDemo isActive={true} vertical={vertical} />}
              {activeIndex === 2 && <CompatibilityDemo isActive={true} vertical={vertical} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
