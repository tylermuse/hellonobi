import React, {useEffect, useRef, useState, useMemo} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {
    BarChart3,
    FileText,
    Settings,
    PlayCircle,
    Quote,
    Search as SearchIcon,
    Sparkles,
    Package,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQList from "../components/FAQList.jsx";
import { posts } from "../content/utils/mdxPostLoader";
import HeroDemo from "../components/HeroDemo";
import {VideoModal} from "../components/VideoModal";
import {useDemoForm} from "../context/DemoFormContext";
import DemoCTAButton from "../components/DemoCTAButton";
import { TechnicalSearchAnimation, RFQCaptureAnimation, SubstitutesAnimation, CompatibilityAnimation } from "../components/FeatureAnimations";


// ===== feature flags =====
const SHOW_LOGOS = false;
const SHOW_PRICING = false;

function ChatBubble({ from = "user", children }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-[15px] leading-6",
          isUser
            ? "bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/90"
            : "bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

function HeroProductCard({ title = "Heat Pump", price = "$3,450", img }) {
  const hasImage = Boolean(img);

  if (hasImage) {
    return (
      <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
        <div className="aspect-[6/5] bg-black/5 dark:bg-white/10">
          <AssetImage
            src={img}
            alt={title}
            className="w-full h-full object-cover object-top"
            labelForPlaceholder="Product image"
          />
        </div>
        <div className="p-2.5">
          <div className="text-[13px] font-medium text-black/90 dark:text-white/90 line-clamp-1">
            {title}
          </div>
          <div className="text-[13px] text-black/60 dark:text-white/60">{price}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-2.5">
      <div className="aspect-[6/5] w-full rounded-lg bg-black/5 dark:bg-white/10" />
      <div className="mt-2 text-[13px] font-medium text-black/80 dark:text-white/90">{title}</div>
      <div className="text-[13px] text-black/60 dark:text-white/60">{price}</div>
    </div>
  );
}

function HeroConversationDemo({ script, startKey, ratio = 4 / 3, ratioVar }) {
  const {
    userText = `3-ton heat pump SEER2 compliant available in Phoenix this week`,
    aiText = "I found 4 compatible systems in stock at your Phoenix branch. These units meet SEER2 requirements and include matched air handlers for optimal performance.",
    products = [
      { title: "Carrier 3-Ton 16 SEER2", price: "$3,450", img: "/media/prod-1.png" },
      { title: "Trane XR14 3-Ton", price: "$3,280", img: "/media/prod-2.png" },
      { title: "Lennox ML14XC1 3-Ton", price: "$3,620", img: "/media/prod-3.png" },
    ],
  } = script || {};

  const [step, setStep] = React.useState(-1);
  const scrollerRef = React.useRef(null);
  const productsRef = React.useRef(null);

  React.useEffect(() => {
    if (startKey < 0) return;
    const hasUser = Boolean(userText?.trim());
    const hasAi = Boolean(aiText?.trim());
    if (!hasUser && !hasAi) {
      setStep(2);
      return;
    }
    setStep(hasUser ? 0 : 1);
    scrollerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    const t1 = hasAi ? setTimeout(() => setStep(1), 900) : null;
    const t2 = setTimeout(() => setStep(2), hasAi ? 1800 : 900);
    return () => { if (t1) clearTimeout(t1); clearTimeout(t2); };
  }, [startKey, userText, aiText, products]);

  React.useEffect(() => {
    if (step === 2 && scrollerRef.current && productsRef.current) {
      const id = setTimeout(() => {
        const top = productsRef.current.offsetTop - 12;
        scrollerRef.current.scrollTo({ top, behavior: "smooth" });
      }, 140);
      return () => clearTimeout(id);
    }
  }, [step]);

  const showUser1 = step >= 0 && Boolean(userText?.trim());
  const showAi1 = step >= 1 && Boolean(aiText?.trim());
  const showProducts = step >= 2;

  return (
    <div className="hero-preview-panel w-full rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 overflow-hidden shadow-inner">
      <AspectBox ratio={ratio} ratioVar={ratioVar}>
        <div className="absolute inset-0 px-4 md:px-5 py-4 flex flex-col gap-2.5 sm:gap-3">
          <div ref={scrollerRef} className="flex-1 overflow-y-auto hero-demo-scroll">
            <div className="flex h-full flex-col gap-2.5 sm:gap-3">
              {showUser1 && userText && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                  <ChatBubble from="user">{userText}</ChatBubble>
                </motion.div>
              )}
              {showAi1 && aiText && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                  <ChatBubble from="ai">{aiText}</ChatBubble>
                </motion.div>
              )}
              {showProducts && (
                <motion.div
                  key={`prods-${startKey}`}
                  ref={productsRef}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.55 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1"
                >
                  {products.map((p) => (
                    <HeroProductCard key={p.title} title={p.title} price={p.price} img={p.img} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </AspectBox>
    </div>
  );
}

function makeScript(mode, q = "heat pump") {
  if (mode === "ai") {
    return {
      userText: `3-ton heat pump SEER2 compliant available in Phoenix this week`,
      aiText: "I found 4 compatible systems in stock at your Phoenix branch. These units meet SEER2 requirements and include matched air handlers.",
      products: [
        { title: "Carrier 3-Ton 16 SEER2", price: "$3,450", img: "/media/prod-1.png" },
        { title: "Trane XR14 3-Ton", price: "$3,280", img: "/media/prod-2.png" },
        { title: "Lennox ML14XC1 3-Ton", price: "$3,620", img: "/media/prod-3.png" },
      ],
    };
  }
  return {
    userText: "",
    aiText: "",
    products: [
      { title: "Generic Heat Pump A", price: "$3,200", img: "/media/prod-default-1.png" },
      { title: "Generic Heat Pump B", price: "$3,400", img: "/media/prod-default-2.png" },
      { title: "Generic Heat Pump C", price: "$3,600", img: "/media/prod-default-3.png" },
    ],
  };
}

function ConversationDemo({ mode, playKey, query }) {
  return <HeroConversationDemo script={makeScript(mode, query)} startKey={playKey} />;
}

function PlaceholderSVG({ label = "Image", className = "w-full h-full" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${label} placeholder`}
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopOpacity="1" stopColor="#f5f5f5" />
          <stop offset="100%" stopOpacity="1" stopColor="#ebebeb" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill="url(#g)" />
      <g opacity="0.6">
        <circle cx="34" cy="90" r="12" fill="#d1d5db" />
        <rect x="60" y="80" width="70" height="8" rx="4" fill="#d1d5db" />
        <rect x="60" y="94" width="40" height="8" rx="4" fill="#d1d5db" />
      </g>
      <text x="100" y="56" textAnchor="middle" fontFamily="ui-sans-serif,system-ui" fontSize="14" fill="#9ca3af">
        {label}
      </text>
    </svg>
  );
}

function AspectBox({ ratio = 16 / 9, className = "", ratioVar, children }) {
  const style = ratioVar
    ? { paddingTop: `calc(100% / var(${ratioVar}, ${ratio}))` }
    : { paddingTop: `${100 / ratio}%` };

  return (
    <div className={`relative w-full ${className}`} style={style}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

function isVideoSource(src = "") {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

function MediaBox({ src, alt = "", restartKey, objectPosition }) {
  const [failed, setFailed] = useState(false);
  const vidRef = useRef(null);

  useEffect(() => setFailed(false), [src]);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    try {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } catch {}
  }, [restartKey, src]);

  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) v.play?.(); else v.pause?.(); },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [restartKey, src]);

  if (!src) return <PlaceholderSVG label="" className="w-full h-full" />;

  if (isVideoSource(src) && !failed) {
    return (
      <video
        key={restartKey || src}
        ref={vidRef}
        src={src}
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{ objectPosition: objectPosition || "top" }}
        onError={() => setFailed(true)}
        aria-hidden="true"
        tabIndex={-1}
      />
    );
  }

  return (
    <AssetImage
      src={failed ? undefined : src}
      alt={alt}
      className="w-full h-full object-contain"
    />
  );
}

function AssetImage({ src, alt, className = "", labelForPlaceholder, ...imgProps }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <PlaceholderSVG label={labelForPlaceholder || alt || "Image"} className={className} />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
      {...imgProps}
    />
  );
}

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

function Logo({ className = "h-7 md:h-9 lg:h-10" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!failed ? (
        <img
          src="/media/nobi-logo.png"
          srcSet="/media/nobi-logo.png 1x, /media/nobi-logo@2x.png 2x"
          alt="Nobi"
          className="h-full w-auto"
          onError={() => setFailed(true)}
        />
      ) : (
        <svg className="h-full w-auto" viewBox="0 0 120 24" aria-label="Nobi logo">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" fill="url(#lg)" />
          <rect x="28" y="6" width="86" height="12" rx="6" fill="#111827" />
        </svg>
      )}
    </div>
  );
}

function Hero({ onOpenVideo }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-10 sm:pt-12 lg:pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-balance">
            Contractors ask.{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Nobi answers.
            </span>
          </h1>

          <p className="mt-4 text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          Find parts, check stock, and request quotes in seconds.
          </p>

          <div className="grid grid-cols-[1fr_auto] items-center gap-1 max-w-xl mx-auto">
            <DemoCTAButton />
            <Button
              size="lg"
              variant="ghost"
              onClick={onOpenVideo}
              className="whitespace-nowrap px-3"
            >
              <PlayCircle className="h-5 w-5" />
              <span className="sm:hidden">Demo</span>
              <span className="hidden sm:inline">See it in action</span>
            </Button>
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto">
          <HeroDemo />
        </div>

        {SHOW_LOGOS && (
          <div className="mt-10 max-w-5xl mx-auto text-center">
            <p className="text-sm font-semibold text-fuchsia-600">
              Trusted by industrial distributors
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              {CUSTOMER_LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-28 object-contain select-none grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "Technical search that understands specs",
      desc: "Buyers search like engineers: \"3-phase 480V stainless steel pump.\" Nobi's semantic search finds exact matches without endless filters.",
      icon: <SearchIcon className="h-4 w-4" />,
      animation: "technical-search",
    },
    {
      title: "Capture quote requests automatically",
      desc: "Turn product questions into qualified RFQs. Nobi captures project context, specs, and contact info—then routes to your sales team.",
      icon: <FileText className="h-4 w-4" />,
      animation: "rfq-capture",
    },
    {
      title: "Suggest substitutes when parts are unavailable",
      desc: "Out-of-stock doesn't mean lost sales. Nobi instantly recommends equivalent alternatives so buyers stay on-site instead of calling competitors.",
      icon: <Package className="h-4 w-4" />,
      animation: "substitutes",
    },
    {
      title: "Answer compatibility questions",
      desc: "Reduce support load by answering \"will this work with X?\" queries instantly. Nobi references your specs and compatibility data.",
      icon: <Settings className="h-4 w-4" />,
      animation: "compatibility",
    },
  ];

  const [active, setActive] = useState(0);
  const [restartKey, setRestartKey] = useState(0);

  const renderAnimation = () => {
    const animationType = items[active]?.animation;
    const isActive = true; // Always active when visible
    
    switch (animationType) {
      case "technical-search":
        return <TechnicalSearchAnimation key={restartKey} isActive={isActive} />;
      case "rfq-capture":
        return <RFQCaptureAnimation key={restartKey} isActive={isActive} />;
      case "substitutes":
        return <SubstitutesAnimation key={restartKey} isActive={isActive} />;
      case "compatibility":
        return <CompatibilityAnimation key={restartKey} isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <section id="features" className="scroll-mt-20 py-20 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold text-fuchsia-600">Features</p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2 text-balance">
          Help buyers find, quote, and order.
        </h2>
        <p className="mt-3 text-black/70 dark:text-white/70">
          Nobi acts like your best counter-person—guiding buyers to the right products and capturing opportunities you'd otherwise miss.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div
            className="order-1 lg:order-2 rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-full shadow-lg"
            role="tabpanel"
            id="feature-preview"
            aria-labelledby={`feature-tab-${active}`}
          >
            {renderAnimation()}
          </div>

          <div className="order-2 lg:order-1 space-y-4" role="tablist" aria-controls="feature-preview">
            {items.map((f, i) => (
              <button
                key={f.title}
                id={`feature-tab-${i}`}
                role="tab"
                aria-selected={i === active}
                onClick={() => { setActive(i); setRestartKey(k => k + 1); }}
                className={`w-full text-left rounded-2xl border p-5 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20 ${
                  i === active
                    ? "border-fuchsia-200 bg-fuchsia-50/70 dark:bg-white/5"
                    : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-fuchsia-600">{f.icon}</span>
                  <div>
                    <div className="font-semibold">{f.title}</div>
                    <p className="mt-1 text-sm text-black/70 dark:text-white/70">{f.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Results() {
  const rows = [
    { metric: "Quote Requests Captured", defaultVal: "12%", nobiVal: "38%", impact: "+217%" },
    { metric: "Search-to-RFQ", defaultVal: "3.2%", nobiVal: "8.1%", impact: "+153%" },
    { metric: "Support Ticket Reduction", defaultVal: "—", nobiVal: "42%", impact: "42%" },
    { metric: "Average Order Value", defaultVal: "$8,450", nobiVal: "$11,200", impact: "+33%" },
  ];

  return (
    <section id="results" className="scroll-mt-20 py-20 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold text-fuchsia-600">Results</p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">
          Capture more quotes and reduce sales friction.
        </h2>
        <p className="mt-3 text-black/70 dark:text-white/70">
          Industrial distributors using Nobi see measurable improvements in quote capture, order value, and operational efficiency.
        </p>

        <div className="mt-8">
          <table className="w-full text-left border-collapse table-fixed">
            <colgroup>
              <col style={{ width: "40%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>

            <thead>
              <tr className="text-xs sm:text-sm font-semibold text-black/70 dark:text-white/70">
                <th className="py-2 px-2 sm:px-4"></th>
                <th className="py-2 px-2 sm:px-4 text-center">Before</th>
                <th className="py-2 px-2 sm:px-4 text-center">With Nobi</th>
                <th className="py-2 px-2 sm:px-4 text-center bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Impact
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.metric}
                  className={i !== rows.length - 1 ? "border-b border-dashed border-black/20 dark:border-white/15" : ""}
                >
                  <td className="py-3 px-2 sm:px-4 font-medium text-black/80 dark:text-white/90 leading-snug">
                    {r.metric}
                  </td>

                  <td className="py-3 px-2 sm:px-4 text-center text-xl sm:text-2xl font-semibold tabular-nums">
                    {r.defaultVal}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center text-xl sm:text-2xl font-semibold tabular-nums">
                    {r.nobiVal}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-center text-xl sm:text-2xl font-bold tabular-nums whitespace-nowrap bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                    {r.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-black/50 dark:text-white/50">
          Results from mid-market industrial distributors using Nobi for 6+ months.
        </p>
      </div>
    </section>
  );
}

function Testimonial() {
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    if (!leftRef.current) return;
    const el = leftRef.current;

    if (typeof window === "undefined" || typeof window.ResizeObserver === "undefined") {
      setLeftHeight(el.getBoundingClientRect().height || 320);
      return;
    }

    const ro = new ResizeObserver(() => {
      setLeftHeight(el.getBoundingClientRect().height);
    });
    ro.observe(el);
    setLeftHeight(el.getBoundingClientRect().height);

    return () => ro.disconnect();
  }, []);

  return (
    <section id="testimonial" className="py-20 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div
            ref={leftRef}
            className="lg:col-span-2 self-start rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-8 shadow-sm"
          >
            <Quote className="h-6 w-6 text-fuchsia-600 mb-4" />
            <p className="text-2xl leading-snug font-medium text-black/90 dark:text-white">
              "Our contractors used to call us constantly asking 'do you have X in stock?' and 'what's the right air handler for this unit?' Now Nobi handles those questions instantly. Our counter staff can focus on complex quotes instead of repetitive lookups."
            </p>
            <div className="mt-6 flex items-center gap-4">
              {!avatarFailed ? (
                <img
                  src="/media/testimonial-avatar.png"
                  alt="Customer avatar"
                  className="h-10 w-10 rounded-full object-cover bg-black/10 dark:bg-white/10"
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-fuchsia-400 to-indigo-500" />
              )}
              <div>
                <div className="font-semibold">Mike Sullivan</div>
                <div className="text-sm text-black/60 dark:text-white/60">
                  Operations Manager, Regional Industrial Distributor
                </div>
              </div>
            </div>
          </div>

          <div
            className="relative self-start rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden bg-white/70 dark:bg-white/5"
            style={{
              height: leftHeight || 320,
            }}
          >
            {!photoFailed ? (
              <img
                src="/media/industrial-testimonial-image.png"
                alt="Industrial facility"
                className="h-full w-full object-cover"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-zinc-200 via-white to-zinc-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white text-center">
              <div className="text-3xl sm:text-4xl font-semibold leading-tight">
                62% more RFQs
              </div>
              <div className="text-lg sm:text-xl font-medium text-white/90">
                captured in first 90 days
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { h: "Install the script", p: "Add two code snippets to your site. Nobi reads your catalog and learns your products." },
    { h: "Configure entry points", p: "Choose where Nobi appears: search bar, product pages, quote forms, or custom triggers." },
    { h: "Track performance", p: "Monitor RFQ capture, search quality, and support deflection in a simple dashboard." },
  ];
  return (
    <section id="how" className="scroll-mt-20 py-20 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold mb-8">Live on your site fast</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 list-decimal list-inside">
          {steps.map((s) => (
            <li key={s.h} className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
              <div className="font-medium">{s.h}</div>
              <p className="mt-2 text-sm text-black/70 dark:text-white/70">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Insights({ onOpenForm }) {
  const intents = [
    { label: "Requesting quote / pricing", value: 156 },
    { label: "Checking availability / lead time", value: 132 },
    { label: "Asking about compatibility", value: 98 },
    { label: "Looking for substitutes", value: 76 },
  ];

  const objections = [
    { label: "Out of stock / long lead time", value: 84 },
    { label: "Unclear specs / compatibility", value: 62 },
    { label: "Need volume pricing", value: 41 },
    { label: "Delivery timing concerns", value: 38 },
  ];

  const max = (arr) => Math.max(...arr.map((d) => d.value));

  function InsightsBar({ value, maxValue }) {
    const pct = Math.max(0, Math.min(100, Math.round((value / maxValue) * 100)));
    return (
      <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/10">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    );
  }

  return (
    <section id="insights" className="scroll-mt-20 py-20 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-fuchsia-600">Insights</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">
              Understand what buyers really need.
            </h2>
            <p className="mt-3 text-black/70 dark:text-white/70">
              Nobi captures buyer intent in real conversations—giving your sales and product teams actionable intelligence.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-sm">
              <div className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-fuchsia-600" />
                Top buyer intents
              </div>
              <div className="mt-4 space-y-3">
                {intents.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/80 dark:text-white/90">{d.label}</span>
                      <span className="tabular-nums text-black/60 dark:text-white/60">{d.value}</span>
                    </div>
                    <InsightsBar value={d.value} maxValue={max(intents)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-sm">
              <div className="font-semibold flex items-center gap-2">
                <Quote className="h-4 w-4 text-fuchsia-600" />
                Example queries
              </div>
              <div className="mt-3 space-y-3 text-sm text-black/80 dark:text-white/90">
                <blockquote className="rounded-xl p-3 bg-black/5 dark:bg-white/10">
                  "Do you have a 200 amp panel outdoor rated in stock at the Dallas branch?"
                </blockquote>
                <blockquote className="rounded-xl p-3 bg-black/5 dark:bg-white/10">
                  "What's the substitute for Carrier part #38MGRQ36D3 if that's backordered?"
                </blockquote>
                <blockquote className="rounded-xl p-3 bg-black/5 dark:bg-white/10">
                  "I need a 3-phase 480V motor compatible with a centrifugal pump—what options do you have?"
                </blockquote>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6 shadow-sm">
              <div className="font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-fuchsia-600" />
                Common friction points
              </div>
              <div className="mt-4 space-y-3">
                {objections.map((d) => (
                  <div key={d.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/80 dark:text-white/90">{d.label}</span>
                      <span className="tabular-nums text-black/60 dark:text-white/60">{d.value}</span>
                    </div>
                    <InsightsBar value={d.value} maxValue={max(objections)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestDemoModal({ open, onClose }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    website: "",
    platform: "Magento",
    message: "",
    botcheck: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const accessKey = "c7a3fd79-0e4f-47ce-aa30-c141616d21e3";

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("company", form.company);
      formData.append("website", form.website);
      formData.append("platform", form.platform);
      formData.append("message", form.message);
      formData.append("botcheck", form.botcheck);

      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err.message || "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-label="Close form" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">See Nobi on your site</h2>
          <button
            onClick={onClose}
            className="inline-flex items-center rounded-full bg-black/5 dark:bg-white/10 px-2 py-1 hover:opacity-80"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {!done ? (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <input type="text" name="botcheck" value={form.botcheck} onChange={update} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm block mb-1">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  required
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm block mb-1">Company</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={update}
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Website</label>
                <input
                  name="website"
                  value={form.website}
                  onChange={update}
                  placeholder="https://yoursite.com"
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm block mb-1">Platform</label>
                <select
                  name="platform"
                  value={form.platform}
                  onChange={update}
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                >
                  <option>Magento</option>
                  <option>BigCommerce</option>
                  <option>Custom / Headless</option>
                  <option>Shopify</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1">Tell us about your catalog</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={update}
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none"
                placeholder="# of SKUs, buyer types, current search experience..."
              />
            </div>

            {error && <div className="text-sm text-red-600 dark:text-rose-400">{error}</div>}

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Request Demo"}
              </Button>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <p className="text-black/80 dark:text-white/90">
              Thanks! We'll reach out within 24 hours to set up a demo on your site.
            </p>
            <div className="mt-4">
              <Button onClick={onClose}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LatestPosts() {
  const featured = posts.filter((p) => p.meta.featured);
  const nonFeatured = posts.filter((p) => !p.meta.featured);
  const ordered = [...featured, ...nonFeatured].slice(0, 3);
  const recent = ordered;
  if (!recent.length) return null;

  const articleLd = useMemo(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://nobi.ai";
    return recent.map((post, index) => ({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.meta.title,
      "datePublished": post.meta.date,
      "image": post.meta.heroImage || undefined,
      "url": `${origin}/blog/${post.slug}`,
      "position": index + 1,
    }));
  }, [recent]);

  return (
    <section className="scroll-mt-20 py-20 border-t border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-fuchsia-600">Resources</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-2">Latest from Nobi</h2>
            <p className="mt-2 text-black/70 dark:text-white/70 max-w-2xl">Best practices for industrial commerce.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:-translate-y-1 hover:shadow-lg transition-all overflow-hidden"
            >
              {post.meta.heroImage && (
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={post.meta.heroImage}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="mt-2 text-xl font-semibold group-hover:text-purple-600 transition-colors">{post.meta.title}</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-white/70 line-clamp-3">{post.meta.excerpt}</p>
                <div className="mt-3 text-xs text-black/50 dark:text-white/60">
                  {new Date(post.meta.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a href="/blog" className="text-sm font-semibold text-black hover:text-purple-600">
            View all →
          </a>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd.length === 1 ? articleLd[0] : articleLd) }}
        />
      </div>
    </section>
  );
}

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { onOpen: onOpenForm } = useDemoForm();
  
  useEffect(() => {
    document.title = "Nobi: digital counter-person for industrial distributors";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-[#0a0a0a] dark:to-black text-black dark:text-white">
      <Header />
      <Hero onOpenVideo={() => setIsVideoOpen(true)} />
      <Features />
      <Results />
      <Insights onOpenForm={onOpenForm} />
      <Testimonial />
      <HowItWorks />
      <LatestPosts />
      {SHOW_PRICING && <div>Pricing section placeholder</div>}
      <FAQList
        limit={4}
        showBorderTop
        padding="py-20"
        columns={2}
        headingAlign="center"
      />
      <div className="mx-auto max-w-6xl px-6 -mt-6 mb-14 flex justify-center">
        <a
          href="/faqs"
          className="text-sm font-semibold text-black hover:text-purple-600 transition-colors underline"
        >
          See all FAQs →
        </a>
      </div>
      <Footer />

      <VideoModal
        open={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        youtube="https://www.youtube.com/watch?v=RKqGC3CVZd0"
      />
    </div>
  );
}
