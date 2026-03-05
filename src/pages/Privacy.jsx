import React from "react";
import PageLayout from "../components/PageLayout";

export default function Privacy() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">Privacy Policy</h1>
        <p className="mt-3 text-sm text-black/50 dark:text-white/50">
          Effective October&nbsp;1,&nbsp;2025. This Privacy Policy explains how Nobi
          collects, uses, and shares information. If you have questions, email{" "}
          <a href="mailto:privacy@nobi.ai" className="underline">privacy@nobi.ai</a>.
        </p>

        <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed mt-10">
          <h2>Who We Are</h2>
          <p>
            Locusive, Inc. d/b/a Nobi ("Nobi", "we", "us", or "our") provides
            AI-powered product identification and related services for industrial distributors (the "Service").
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li><strong>Account & Contact Data</strong> — name, email, role, company and similar details when you request a demo or contact us.</li>
            <li><strong>Usage Data</strong> — queries, clicks, device/browser info, IP address, timestamps and interactions with our service.</li>
            <li><strong>Technical Data</strong> — cookies, error logs, performance metrics and diagnostics.</li>
            <li><strong>Customer Content</strong> — catalogue data or inputs that our customers send to Nobi to power the Service.</li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>Provide, operate and improve the Service;</li>
            <li>Personalize results and measure performance;</li>
            <li>Detect, prevent and investigate security incidents and abuse;</li>
            <li>Respond to inquiries and provide support;</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>How We Share Information</h2>
          <ul>
            <li><strong>Vendors & Sub-processors</strong> — cloud hosting, analytics, model providers and support tools under contractual safeguards.</li>
            <li><strong>Business & Safety</strong> — to comply with law and protect rights, safety and the Service.</li>
            <li><strong>Business Transfers</strong> — in connection with a merger, acquisition or asset sale.</li>
          </ul>

          <p className="mt-8">
            For additional details or to exercise your rights, please contact us at{" "}
            <a href="mailto:privacy@nobi.ai" className="underline">privacy@nobi.ai</a>.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
