import React, { useState } from "react";
import { Menu, X, ExternalLink, Sparkles } from "lucide-react";
import Button from "./Button";
import { useDemoForm } from "../context/DemoFormContext";
import { trackDemoFormOpened } from "../utils/eventTracker";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { onOpen } = useDemoForm();

  const handleAskNobi = () => {
    if (window.Nobi) {
      window.Nobi.openChat();
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "FAQs", href: "/faqs" },
    { label: "Docs", href: "https://docs.nobi.ai", external: true },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleDemoClick = () => {
    trackDemoFormOpened();
    scrollToContact();
  };

  return (
    <>
      {/* Desktop nav (hidden on mobile) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black/70 dark:text-white/70">
        {navLinks.map((link) => {
          const className = "hover:opacity-80 flex items-center gap-1";
          return link.external ? (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
              {link.label}
              <ExternalLink className="w-3 h-3 opacity-40" />
            </a>
          ) : (
            <a key={link.label} href={link.href} className={className}>
              {link.label}
            </a>
          );
        })}
        <div className="w-px h-5 bg-black/10 dark:bg-white/10" />
        <button onClick={handleAskNobi} className="hover:opacity-80 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          Ask Nobi
        </button>
      </nav>

      {/* Right side: Demo button + Mobile menu button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleDemoClick} className="hidden md:inline-flex" size="sm">
          Request a Demo
        </Button>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-black dark:text-white" />
          ) : (
            <Menu className="w-5 h-5 text-black dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-t border-black/5 dark:border-white/10 shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 py-2 px-3 rounded-lg text-base font-medium text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10"
                onClick={closeMobileMenu}
              >
                {link.label}
                {link.external && <ExternalLink className="w-3 h-3 opacity-40" />}
              </a>
            ))}
            <button
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-base font-medium text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 text-left"
              onClick={() => { handleAskNobi(); closeMobileMenu(); }}
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              Ask Nobi
            </button>
            <button
              className="mt-2 py-2 px-3 rounded-lg text-base font-medium text-black/80 dark:text-white/80 bg-black/5 dark:bg-white/10 text-left"
              onClick={scrollToContact}
            >
              Request a Demo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
