import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ArticleLayout({ meta, children }) {
  const { title, date, author, tags = [], heroImage } = meta || {};
  const formattedDate = date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <Header />

      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <a href="/blog" className="text-sm text-black/50 dark:text-white/50 hover:opacity-80">← Blog</a>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">{title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-black/50 dark:text-white/50">
            {formattedDate && <span>{formattedDate}</span>}
            {author && <span>• {author}</span>}
            {tags.length > 0 && (
              <div className="flex gap-1.5 ml-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-0.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {heroImage && (
          <div className="mx-auto max-w-4xl px-6 mb-10">
            <img src={heroImage} alt="" className="w-full rounded-2xl" />
          </div>
        )}

        <article className="prose dark:prose-invert mx-auto max-w-3xl px-6 pb-20">
          {children}
        </article>
      </main>

      <Footer />
    </div>
  );
}
