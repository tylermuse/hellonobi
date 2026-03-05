import React, { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import FAQList from "../components/FAQList.jsx";
import FAQ_ITEMS from "../constants/faqs";

export default function FAQs() {
  useEffect(() => {
    document.title = "FAQs | Nobi: AI Copilot for Counter Sales";
  }, []);

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 text-base text-black/60 dark:text-white/60">
          Quick answers about how Nobi works with your distribution business.
        </p>
      </div>

      <FAQList groupByCategory padding="pb-20" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </PageLayout>
  );
}
