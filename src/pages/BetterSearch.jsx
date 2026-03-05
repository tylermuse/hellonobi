import React from "react";
import PageLayout from "../components/PageLayout";

export default function BetterSearch() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">Coming Soon</h1>
        <p className="mt-3 text-base text-black/60 dark:text-white/60">
          This page is being updated. <a href="/" className="underline">Back to home</a>.
        </p>
      </div>
    </PageLayout>
  );
}
