import React from "react";
import Logo from "./Logo";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="max-w-sm">
            <Logo className="h-7 md:h-8" />
            <p className="mt-4 text-sm text-black/50 dark:text-white/50 leading-relaxed">
              Nobi is an AI copilot that helps counter staff at industrial distributors quickly identify the correct parts customers need.
            </p>
            <p className="mt-4 text-xs text-black/40 dark:text-white/40">
              &copy; {new Date().getFullYear()} Nobi
            </p>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                <li><a href="/" className="hover:opacity-80">Home</a></li>
                <li><a href="/faqs" className="hover:opacity-80">FAQs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                <li><a href="/blog" className="hover:opacity-80">Blog</a></li>
                <li>
                  <a href="https://docs.nobi.ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 inline-flex items-center gap-1">
                    Docs <ExternalLink className="w-3 h-3 opacity-40" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
                <li><a href="/terms" className="hover:opacity-80">Terms</a></li>
                <li><a href="/privacy" className="hover:opacity-80">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
