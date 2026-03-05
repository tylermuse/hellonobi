import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { posts } from "../content/utils/mdxPostLoader";

export default function Blog() {
  useEffect(() => {
    document.title = "Blog | Nobi";
  }, []);

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">Blog</h1>
        <p className="mt-3 text-base text-black/60 dark:text-white/60">
          Updates and insights from the Nobi team.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        {posts.length === 0 && (
          <p className="text-base text-black/50 dark:text-white/50">No posts yet. Check back soon.</p>
        )}
        {posts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="block mb-8 p-6 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition">
            <h2 className="text-lg font-semibold text-black dark:text-white">{post.meta.title}</h2>
            {post.meta.excerpt && <p className="mt-2 text-sm text-black/60 dark:text-white/60">{post.meta.excerpt}</p>}
            <p className="mt-2 text-xs text-black/40 dark:text-white/40">
              {new Date(post.meta.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </a>
        ))}
      </div>
    </PageLayout>
  );
}
