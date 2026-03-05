import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import ArticleLayout from "../components/ArticleLayout";
import { getPostBySlug } from "../content/utils/mdxPostLoader";

const components = {};

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post?.meta?.title) {
      document.title = `${post.meta.title} | Nobi`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-black/50 dark:text-white/50">Sorry, we couldn't find that article.</p>
      </div>
    );
  }

  const { Component, meta } = post;

  return (
    <ArticleLayout meta={meta}>
      <MDXProvider components={components}>
        <Component />
      </MDXProvider>
    </ArticleLayout>
  );
}
