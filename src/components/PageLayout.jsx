import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
