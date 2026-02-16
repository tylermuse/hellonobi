import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, FileText, CheckCircle2 } from "lucide-react";

const DEMO_QUERY = "replacement alternator • 2019 Toyota Camry 2.5L • any location today";

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
    primary:
      "bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-sm",
    ghost:
      "bg-transparent text-black/80 dark:text-white/90 hover:bg-black/5 dark:hover:bg-white/10",
    outline:
      "border border-black/10 dark:border-white/15 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10",
    ai: "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:opacity-90 shadow-sm",
  };
  return (
    <button className={[base, sizes[size], variants[variant], className].join(" ")} {...props}>
      {children}
    </button>
  );
}

function SearchBar({
  query,
  placeholder = "Search for parts, equipment, or specs...",
  locked = true,
}) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 backdrop-blur px-4 h-14 shadow-sm">
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <input
            value={query}
            readOnly={locked}
            tabIndex={locked ? -1 : 0}
            placeholder={placeholder}
            className={`min-w-0 w-full bg-transparent outline-none text-[15px] placeholder:text-black/40 dark:placeholder:text-white/40 ${
              locked ? "pointer-events-none select-none cursor-default" : ""
            }`}
            aria-readonly="true"
          />
        </div>
        <Button variant="ai" size="compact" className="whitespace-nowrap px-4 h-9 sm:h-8">
          <Sparkles className="h-4 w-4" />
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
}

// Auto parts data
const EQUIPMENT = [
  {
    title: "Denso 210-5320 Alternator",
    specs: "130A • OEM Direct Fit",
    price: "$285",
    availability: "Pickup today",
    location: "Phoenix Main",
    img: "/media/mrcool-heat-pump.png",
  },
  {
    title: "Bosch AL0890X Alternator",
    specs: "130A • Remanufactured",
    price: "$195",
    availability: "Phoenix North • Will-call",
    location: "Phoenix North",
    img: "/media/trane-xr14.png",
  },
  {
    title: "TYC 2-13992 Alternator",
    specs: "130A • New Aftermarket",
    price: "$165",
    availability: "Tempe • Transfer 2hrs",
    location: "Tempe",
    img: "/media/lennox-ml14xc1.png",
  },
];

const COMPATIBILITY_QUESTION = "What air handler pairs with the Carrier unit?";
const COMPATIBILITY_ANSWER = "Carrier FB4CNF036 and FB4CNF042 are factory-matched air handlers for the 25VNA4. Want variable-speed or lowest cost?";

// Demo 1: Technical Search
function TechnicalSearchDemo({ isActive }) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (!isActive) {
      setQuery("");
      setShowResults(false);
      setSelectedIndex(-1);
      return;
    }

    let i = 0;
    const timers = [];

    // Type query
    const typeInterval = setInterval(() => {
      if (i < DEMO_QUERY.length) {
        setQuery(DEMO_QUERY.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowResults(true), 600));
        timers.push(setTimeout(() => setSelectedIndex(0), 2000));
      }
    }, 35);
    timers.push(typeInterval);

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="space-y-4">
      {/* System Status Bar */}
      <div className="flex items-center justify-between text-xs text-black/60 dark:text-white/60 px-1">
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

      <SearchBar query={query} placeholder="Search for parts, equipment, or specs..." />

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 space-y-3"
        >
          <div className="flex items-start gap-2 text-sm text-black/80 dark:text-white/80">
            <Sparkles className="h-4 w-4 mt-0.5 text-fuchsia-600 flex-shrink-0" />
            <p>
              Found 3 compatible alternators for 2019 Camry 2.5L. Checked inventory across all locations, verified direct-fit compatibility, and filtered by availability today.
            </p>
          </div>

          <div className="space-y-2">
            {EQUIPMENT.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.15 }}
                className={`rounded-xl border p-4 transition-all ${
                  selectedIndex === i
                    ? "border-fuchsia-400 bg-fuchsia-50/50 dark:bg-fuchsia-900/20 ring-2 ring-fuchsia-400/50"
                    : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-black/90 dark:text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 mt-0.5">
                      {item.specs}
                    </p>
                    <div className="flex flex-col gap-1.5 mt-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-black/70 dark:text-white/70 font-medium">
                          {item.price}
                        </span>
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                          {item.availability}
                        </span>
                      </div>
                      <span className="text-black/50 dark:text-white/50">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 2: RFQ Capture
function RFQCaptureDemo({ isActive }) {
  const [query, setQuery] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    jobsiteZip: "",
    timeline: "",
    quoteType: "",
  });

  const RFQ_QUERY = "Need quote for brake job • 2018 Honda Accord";

  useEffect(() => {
    if (!isActive) {
      setQuery("");
      setShowResponse(false);
      setShowForm(false);
      setShowConfirmation(false);
      setFormData({ name: "", company: "", phone: "", jobsiteZip: "", timeline: "", quoteType: "" });
      return;
    }

    let i = 0;
    const timers = [];

    // Type query
    const typeInterval = setInterval(() => {
      if (i < RFQ_QUERY.length) {
        setQuery(RFQ_QUERY.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowResponse(true), 600));
        timers.push(setTimeout(() => setShowForm(true), 1200));
        
        // Simulate form filling
        timers.push(setTimeout(() => setFormData(d => ({ ...d, name: "Mike Johnson" })), 2000));
        timers.push(setTimeout(() => setFormData(d => ({ ...d, company: "Phoenix HVAC Co" })), 2300));
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
    <div className="space-y-4">
      {/* Account Context Bar */}
      <div className="text-xs text-black/60 dark:text-white/60 px-1">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Account: Phoenix HVAC Co
          </span>
          <span>•</span>
          <span>Contractor pricing active</span>
        </div>
      </div>

      <SearchBar query={query} placeholder="Describe your repair need or request a quote..." />

      {showResponse && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4"
        >
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-black/80 dark:text-white/80">
              <FileText className="h-4 w-4 mt-0.5 text-fuchsia-600 flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">I can help you get a quote for a brake job on your 2018 Honda Accord.</p>
                <p className="text-black/60 dark:text-white/60">
                  To provide an accurate quote, I'll need a few details:
                </p>
              </div>
            </div>
            <div className="text-xs text-black/50 dark:text-white/50 pl-6">
              Will route to: Phoenix counter team • Priority response: same day
            </div>
          </div>
        </motion.div>
      )}

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800 bg-white/80 dark:bg-white/5 p-5 space-y-4"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-fuchsia-600" />
            <h3 className="font-semibold text-black/90 dark:text-white/90">
              RFQ Summary (ready for sales)
            </h3>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                  Contact Name
                </label>
                <input
                  readOnly
                  value={formData.name}
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-sm"
                  placeholder="Name..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                  Company
                </label>
                <input
                  readOnly
                  value={formData.company}
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-sm"
                  placeholder="Company..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                  Phone
                </label>
                <input
                  readOnly
                  value={formData.phone}
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-sm"
                  placeholder="Phone..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                  Jobsite ZIP
                </label>
                <input
                  readOnly
                  value={formData.jobsiteZip}
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-sm"
                  placeholder="ZIP..."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                  Timeline
                </label>
                <input
                  readOnly
                  value={formData.timeline}
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-sm"
                  placeholder="Timeline..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-black/70 dark:text-white/70 mb-1">
                  Quote Type
                </label>
                <input
                  readOnly
                  value={formData.quoteType}
                  className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2 text-sm"
                  placeholder="Quote type..."
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10 p-4"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-sm text-black/90 dark:text-white/90">
                RFQ Captured
              </p>
              <div className="text-sm text-black/70 dark:text-white/70 space-y-1">
                <p><strong>Routed to:</strong> Phoenix Counter Team</p>
                <p><strong>Priority:</strong> Emergency / same day</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 3: Compatibility Q&A
function CompatibilityDemo({ isActive }) {
  const [question, setQuestion] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setQuestion("");
      setShowAnswer(false);
      setShowSpecs(false);
      return;
    }

    let i = 0;
    const timers = [];

    // Type question
    const typeInterval = setInterval(() => {
      if (i < COMPATIBILITY_QUESTION.length) {
        setQuestion(COMPATIBILITY_QUESTION.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        timers.push(setTimeout(() => setShowAnswer(true), 600));
        timers.push(setTimeout(() => setShowSpecs(true), 1800));
      }
    }, 45);
    timers.push(typeInterval);

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="space-y-4">
      {/* Context Bar */}
      <div className="text-xs text-black/60 dark:text-white/60 px-1">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Referencing: OEM spec sheets + compatibility matrix
          </span>
          <span>•</span>
          <span>Phoenix inventory</span>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
        <div className="text-xs font-medium text-black/60 dark:text-white/60 mb-2">
          Selected Product
        </div>
        <div className="font-semibold text-black/90 dark:text-white/90">
          Carrier 25VNA4 3-Ton Heat Pump
        </div>
        <div className="text-sm text-black/60 dark:text-white/60 mt-1">
          16 SEER2 • Single Stage • $3,450
        </div>
      </div>

      <div className="rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800 bg-white/80 dark:bg-white/5 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-fuchsia-600" />
          <span className="text-sm font-medium text-black/70 dark:text-white/70">
            Ask about compatibility
          </span>
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 px-3 py-2.5 min-h-[40px] text-sm">
          {question || <span className="text-black/40 dark:text-white/40">Type your question...</span>}
          {question && question.length < COMPATIBILITY_QUESTION.length && (
            <span className="animate-pulse">|</span>
          )}
        </div>

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            <div className="rounded-lg bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 border border-fuchsia-100 dark:border-fuchsia-800 p-3">
              <p className="text-sm text-black/80 dark:text-white/80 leading-relaxed">
                {COMPATIBILITY_ANSWER}
              </p>
            </div>
            <div className="text-xs text-black/50 dark:text-white/50">
              Source: Carrier installation manual + compatibility database
            </div>
          </motion.div>
        )}

        {showSpecs && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-2"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
              Compatible Air Handlers
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10">
                    <img
                      src="/media/carrier-air-handler-new.png"
                      alt="Carrier FB4CNF036"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-black/90 dark:text-white/90">
                      Carrier FB4CNF036
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                      3-ton capacity • Variable speed
                    </div>
                    <div className="text-xs text-black/50 dark:text-white/50 mt-1">
                      Phoenix • Pickup today
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/80 dark:bg-white/10 border border-black/5 dark:border-white/10">
                    <img
                      src="/media/carrier-air-handler-new.png"
                      alt="Carrier FB4CNF042"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-black/90 dark:text-white/90">
                      Carrier FB4CNF042
                    </div>
                    <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                      3.5-ton capacity • Variable speed
                    </div>
                    <div className="text-xs text-black/50 dark:text-white/50 mt-1">
                      Phoenix • Ships tomorrow
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="ai" className="flex-1">
                Add to RFQ
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Add to Cart
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function HeroDemo({ className = "" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    { id: "search", label: "Technical Search" },
    { id: "rfq", label: "RFQ Capture" },
    { id: "compatibility", label: "Compatibility Q&A" },
  ];

  const goPrev = () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % slides.length);

  return (
    <div className={`${className}`}>
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl shadow-2xl border border-black/5 dark:border-white/10 bg-gradient-to-br from-violet-50 via-white to-emerald-50 dark:from-violet-900/20 dark:via-zinc-900 dark:to-emerald-900/10 p-3 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="text-xs uppercase tracking-[0.35em] text-black/50 dark:text-white/60">
              {slides[activeIndex].label}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous demo"
                className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next demo"
                className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex items-stretch transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="w-full shrink-0">
                <TechnicalSearchDemo isActive={activeIndex === 0} />
              </div>
              <div className="w-full shrink-0">
                <RFQCaptureDemo isActive={activeIndex === 1} />
              </div>
              <div className="w-full shrink-0">
                <CompatibilityDemo isActive={activeIndex === 2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
