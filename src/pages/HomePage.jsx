import React, { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Settings,
  Search as SearchIcon,
  Sparkles,
  Package,
  Quote,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQList from "../components/FAQList.jsx";
import { posts } from "../content/utils/mdxPostLoader";
import HeroDemo from "../components/HeroDemo";
import { useDemoForm } from "../context/DemoFormContext";
import DemoCTAButton from "../components/DemoCTAButton";
import {
  TechnicalSearchAnimation,
  RFQCaptureAnimation,
  SubstitutesAnimation,
  CompatibilityAnimation,
} from "../components/FeatureAnimations";

const SHOW_LOGOS = false;
const SHOW_PRICING = false;

/* ───── shared helpers ───── */

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

function Logo({ className = "h-7 md:h-9 lg:h-10" }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`inline-flex items-center ${className}`}>
      {!failed ? (
        <img src="/media/nobi-logo@2x.png" alt="Nobi" className="h-full w-auto" onError={() => setFailed(true)} />
      ) : (
        <svg viewBox="0 0 100 28" fill="none" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="22" fontSize="24" fontWeight="700" fontFamily="system-ui, sans-serif" fill="currentColor">nobi</text>
        </svg>
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════
   HERO — updated copy for counter sales
   ═══════════════════════════════════════════ */

function Hero() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 pt-32 pb-8 md:pt-40 md:pb-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance text-black dark:text-white leading-[1.1]">
            AI Copilot for Counter Sales{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              in Industrial Distribution
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
            Nobi helps counter staff and inside sales teams quickly identify the correct parts customers need — even when the request is vague or incomplete.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" onClick={scrollToContact}>Request a Demo</Button>
            <DemoCTAButton variant="outline" size="lg">Learn More</DemoCTAButton>
          </div>

          <p className="mt-6 text-sm text-black/40 dark:text-white/40">
            Connects to your catalog, ERP, and branch-level inventory • Cross-branch part search included
          </p>
        </div>

        <div className="mt-14">
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   THE PROBLEM — new section
   ═══════════════════════════════════════════ */

function TheProblem() {
  return (
    <section id="problem" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-800/30">
      <div className="mx-auto max-w-3xl px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">
          The Challenge
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
          The Counter Knowledge Problem
        </h2>

        <div className="mt-8 space-y-6 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed">
          <p>When contractors walk up to the counter asking for parts, the request is rarely precise.</p>

          <div>
            <p className="font-medium text-black/80 dark:text-white/80">They might say:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-violet-500">
              <li>"I need a replacement valve for this boiler."</li>
              <li>"A fitting for a 2-inch pipe."</li>
              <li>"A part that works with a Kohler toilet."</li>
            </ul>
          </div>

          <p>The counterperson must figure out exactly which SKU corresponds to that request.</p>

          <div>
            <p className="font-medium text-black/80 dark:text-white/80">This often means:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-violet-500">
              <li>Searching multiple systems</li>
              <li>Asking experienced coworkers for help</li>
              <li>Guessing and risking the wrong part</li>
              <li>Customers returning later when the part doesn't work</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 md:p-8">
          <p className="text-base md:text-lg font-medium text-black/80 dark:text-white/80">
            This problem is getting worse as distribution companies consolidate.
          </p>
          <p className="mt-4 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed">
            Employees who once specialized in one product category are now expected to handle
            plumbing, HVAC, electrical, fasteners, and more.
          </p>
          <p className="mt-4 text-base md:text-lg font-medium text-black/80 dark:text-white/80">
            No one can memorize every product.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES — existing animated cards, updated copy
   ═══════════════════════════════════════════ */

function Features() {
  const items = [
    {
      title: "Find the right part fast",
      desc: "Employees describe what the customer needs — \"replacement motor for Trane RTU\" or \"compatible bearing for Copeland compressor\" — and Nobi finds exact matches across all branches instantly.",
      icon: <SearchIcon className="w-5 h-5" />,
      animation: "technical-search",
    },
    {
      title: "Suggest substitutes when parts are unavailable",
      desc: "Part unavailable? Nobi instantly recommends cross-compatible alternatives from your catalog so jobs don't stall while staff call around.",
      icon: <Package className="w-5 h-5" />,
      animation: "substitutes",
    },
    {
      title: "Answer compatibility questions",
      desc: "Reduce counter calls by answering \"will this work with X?\" instantly. Nobi references OEM specs, compatibility data, and your cross-reference tables.",
      icon: <Settings className="w-5 h-5" />,
      animation: "compatibility",
    },
    {
      title: "Quote and order faster",
      desc: "Turn urgent part requests into quotes fast. Nobi captures quantities, compatibility requirements, and branch preferences then routes to your counter team.",
      icon: <Quote className="w-5 h-5" />,
      animation: "rfq-capture",
    },
  ];

  const [active, setActive] = useState(0);
  const [restartKey, setRestartKey] = useState(0);

  const renderAnimation = () => {
    const animationType = items[active]?.animation;
    switch (animationType) {
      case "technical-search":
        return <TechnicalSearchAnimation isActive={true} />;
      case "rfq-capture":
        return <RFQCaptureAnimation isActive={true} />;
      case "substitutes":
        return <SubstitutesAnimation isActive={true} />;
      case "compatibility":
        return <CompatibilityAnimation isActive={true} />;
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Features</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white max-w-xl">
          Nobi gives your team a faster way to find the right parts
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
          Nobi searches your catalog + cross-branch inventory to find replacement parts fast — reducing counter calls and helping customers stay on schedule.
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1">
            {renderAnimation()}
          </div>

          <div className="order-1 lg:order-2 space-y-4">
            {items.map((f, i) => (
              <button
                key={f.title}
                onClick={() => { setActive(i); setRestartKey((k) => k + 1); }}
                className={`w-full text-left rounded-2xl border p-5 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 dark:focus-visible:ring-white/20 ${
                  i === active
                    ? "border-violet-200 bg-violet-50/70 dark:bg-white/5"
                    : "border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-violet-500">{f.icon}</span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-black dark:text-white">{f.title}</h3>
                    <p className="mt-1 text-sm text-black/60 dark:text-white/60 leading-relaxed">{f.desc}</p>
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

/* ═══════════════════════════════════════════
   HOW IT WORKS — updated to 4-step flow
   ═══════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    { h: "Describe the request", p: "The employee enters the customer's request — plain language like \"replacement valve for a 2-inch boiler line\" works perfectly." },
    { h: "Nobi analyzes the catalog", p: "Nobi interprets the request using product specs, compatibility information, and your catalog data across all branches." },
    { h: "Recommended parts appear", p: "Nobi suggests the most likely SKUs along with alternatives, key specifications, and real-time availability." },
    { h: "Serve the customer with confidence", p: "The employee provides the correct part without needing to track down an expert or search multiple systems." },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-800/30">
      <div className="mx-auto max-w-3xl px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Process</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
          How Nobi Works
        </h2>

        <div className="mt-12 space-y-8">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-5 md:gap-6">
              <div className="flex-shrink-0">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-bold">
                  {i + 1}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white">{s.h}</h3>
                <p className="mt-2 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed">{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WHO IT'S FOR — new section
   ═══════════════════════════════════════════ */

function WhoItsFor() {
  const verticals = [
    "Plumbing distributors",
    "HVAC distributors",
    "Fastener distributors",
    "Electrical supply houses",
    "Building materials distributors",
    "Industrial parts distributors",
  ];

  return (
    <section id="who-its-for" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Audience</span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
          Built for Industrial Distributors
        </h2>
        <p className="mt-4 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed">
          Nobi is designed for distributors with large catalogs and counter sales teams, including:
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {verticals.map((v) => (
            <div key={v} className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-5 py-4">
              <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-violet-500" />
              <span className="text-base md:text-lg text-black/70 dark:text-white/70">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   INSIGHTS — existing section, updated copy
   ═══════════════════════════════════════════ */

function Insights({ onOpenForm }) {
  const intents = [
    { label: "Finding replacement parts", value: 156 },
    { label: "Checking cross-branch availability", value: 132 },
    { label: "Looking for compatible substitutes", value: 98 },
    { label: "Urgent / same-day needs", value: 76 },
  ];

  const objections = [
    { label: "Part unavailable at primary branch", value: 84 },
    { label: "Unclear compatibility for replacement", value: 62 },
    { label: "Can't find discontinued part number", value: 41 },
    { label: "Need it today / emergency repair", value: 38 },
  ];

  const categories = [
    { label: "HVAC repair parts", value: 142 },
    { label: "Electrical components", value: 118 },
    { label: "Pumps & motor replacements", value: 89 },
    { label: "Bearings & seals", value: 67 },
  ];

  const max = (arr) => Math.max(...arr.map((d) => d.value));

  function InsightsBar({ value, maxValue }) {
    const pct = Math.max(0, Math.min(100, Math.round((value / maxValue) * 100)));
    return (
      <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${pct}%` }} />
      </div>
    );
  }

  return (
    <section id="insights" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-800/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Insights</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
            See what parts buyers search for most.
          </h2>
          <p className="mt-4 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed">
            Nobi captures repair and replacement part searches — showing you which inventory gaps cause friction and where buyers need help.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-black/80 dark:text-white/80 mb-4">Top buyer intents</h3>
            <div className="space-y-4">
              {intents.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-black/60 dark:text-white/60">{d.label}</span>
                    <span className="font-medium text-black dark:text-white">{d.value}</span>
                  </div>
                  <InsightsBar value={d.value} maxValue={max(intents)} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-black/80 dark:text-white/80 mb-4">Example queries</h3>
            <div className="space-y-3">
              <div className="rounded-xl bg-violet-50/50 dark:bg-violet-500/5 p-3 text-sm text-black/70 dark:text-white/70 italic">
                "Replacement compressor for 2018 Carrier RTU — do any branches have it today?"
              </div>
              <div className="rounded-xl bg-violet-50/50 dark:bg-violet-500/5 p-3 text-sm text-black/70 dark:text-white/70 italic">
                "What's the substitute for Carrier part #38MGRQ36D3 if that's backordered?"
              </div>
              <div className="rounded-xl bg-violet-50/50 dark:bg-violet-500/5 p-3 text-sm text-black/70 dark:text-white/70 italic">
                "Compatible bearing for Trane centrifugal chiller model CGAM — need it this week"
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-black/80 dark:text-white/80 mb-4">Common friction points</h3>
            <div className="space-y-4">
              {objections.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-black/60 dark:text-white/60">{d.label}</span>
                    <span className="font-medium text-black dark:text-white">{d.value}</span>
                  </div>
                  <InsightsBar value={d.value} maxValue={max(objections)} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-black/80 dark:text-white/80 mb-4">Top product categories</h3>
            <div className="space-y-4">
              {categories.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-black/60 dark:text-white/60">{d.label}</span>
                    <span className="font-medium text-black dark:text-white">{d.value}</span>
                  </div>
                  <InsightsBar value={d.value} maxValue={max(categories)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT — updated CTA section with form
   ═══════════════════════════════════════════ */

function ContactSection() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", role: "", message: "", botcheck: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("access_key", "c7a3fd79-0e4f-47ce-aa30-c141616d21e3");
      formData.append("subject", "Demo Request — hellonobi.com");
      formData.append("name", form.name);
      formData.append("company", form.company);
      formData.append("email", form.email);
      formData.append("role", form.role);
      formData.append("message", form.message);
      formData.append("botcheck", form.botcheck);
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
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
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-xl px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Get Started</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
            Bring AI to Your Counter Sales Team
          </h2>
          <p className="mt-4 text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed">
            If your employees spend too much time searching catalogs or asking coworkers for help identifying parts, Nobi can help.
          </p>
          <p className="mt-3 text-sm text-black/40 dark:text-white/40">
            We're currently working with a small group of distributors to refine the product.
          </p>
        </div>

        {!done ? (
          <form onSubmit={submit} className="space-y-5">
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={update} />
            {[
              { id: "name", label: "Name", type: "text", required: true },
              { id: "company", label: "Company", type: "text", required: true },
              { id: "email", label: "Email", type: "email", required: true },
              { id: "role", label: "Role", type: "text", required: false, placeholder: "e.g. VP of Sales, Branch Manager" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1.5">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  id={field.id} name={field.id} type={field.type} required={field.required}
                  value={form[field.id]} onChange={update} placeholder={field.placeholder || ""}
                  className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-base text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1.5">
                Message <span className="text-black/30 dark:text-white/30 font-normal">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={3} value={form.message} onChange={update}
                className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-3 text-base text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 resize-none" />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={submitting}
              className="w-full h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-medium text-base hover:opacity-90 transition shadow-sm active:scale-[.98] disabled:opacity-60">
              {submitting ? "Sending…" : "Request a Demo"}
            </button>
          </form>
        ) : (
          <div className="text-center py-12 rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5">
            <p className="text-lg font-medium text-black dark:text-white">Thanks! We'll be in touch soon.</p>
            <p className="mt-2 text-base text-black/50 dark:text-white/50">We'll reach out within 24 hours to set up a demo.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   LATEST POSTS — kept from original
   ═══════════════════════════════════════════ */

function LatestPosts() {
  const featured = posts.filter((p) => p.meta.featured);
  const nonFeatured = posts.filter((p) => !p.meta.featured);
  const ordered = [...featured, ...nonFeatured].slice(0, 3);
  const recent = ordered;
  if (!recent.length) return null;

  return (
    <section id="resources" className="py-20 md:py-28 bg-slate-50/60 dark:bg-slate-800/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-3">Resources</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">Latest from Nobi</h2>
          <p className="mt-3 text-base text-black/60 dark:text-white/60">Best practices for industrial distribution.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {recent.map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 overflow-hidden hover:border-black/20 dark:hover:border-white/20 transition">
              {post.meta.heroImage && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={post.meta.heroImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition" />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-base font-semibold text-black dark:text-white">{post.meta.title}</h3>
                <p className="mt-2 text-sm text-black/60 dark:text-white/60 line-clamp-2">{post.meta.excerpt}</p>
                <p className="mt-3 text-xs text-black/40 dark:text-white/40">
                  {new Date(post.meta.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/blog" className="text-sm font-medium text-black/60 dark:text-white/60 hover:opacity-80">View all →</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  const { onOpen: onOpenForm } = useDemoForm();

  useEffect(() => {
    document.title = "Nobi: AI Copilot for Counter Sales in Industrial Distribution";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <TheProblem />
        <Features />
        <HowItWorks />
        <WhoItsFor />
        <Insights onOpenForm={onOpenForm} />
        <LatestPosts />
        <ContactSection />
        <FAQList limit={5} id="faq" padding="py-20" />
        <div className="text-center pb-16">
          <a href="/faqs" className="text-sm font-medium text-black/60 dark:text-white/60 hover:opacity-80">
            See all FAQs →
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
