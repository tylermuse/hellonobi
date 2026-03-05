import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <a href="/" aria-label="Home">
          <Logo />
        </a>

        {/* Navigation */}
        <Nav />
      </div>
    </header>
  );
}
