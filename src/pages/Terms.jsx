import React from "react";
import PageLayout from "../components/PageLayout";

const LEGAL_NAME = "Locusive, Inc. d/b/a Nobi";
const SHORT_NAME = "Nobi";
const EFFECTIVE = "October 1, 2025";
const CONTACT = "legal@nobi.ai";

export default function Terms() {
  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">Legal</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">Terms of Service</h1>
          <p className="mt-3 text-sm text-black/50 dark:text-white/50">
            Effective {EFFECTIVE}. If you have questions, email{" "}
            <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed">
          <h2>1) Agreement to Terms</h2>
          <p>
            These Terms of Service (the "Terms") govern your access to and use of
            {` `}{SHORT_NAME}'s websites, products, and services (collectively, the "Service").
            By accessing or using the Service, you agree to be bound by these Terms.
          </p>

          <h2>2) Eligibility & Accounts</h2>
          <p>
            You must be at least 18 years old to use the Service. You are responsible for maintaining
            the confidentiality of your account credentials and for all activities under your account.
          </p>

          <h2>3) License & Acceptable Use</h2>
          <p>
            Subject to these Terms, {SHORT_NAME} grants you a limited, non-exclusive, non-transferable,
            revocable license to access and use the Service during your subscription term.
          </p>

          <h2>4) Customer Content & Data</h2>
          <p>
            You retain all rights to content and data you submit to the Service. You grant {SHORT_NAME} a
            worldwide, non-exclusive, royalty-free license to host, process, transmit, and display Customer
            Content solely to provide and improve the Service.
          </p>

          <h2>5) Fees, Trials & Taxes</h2>
          <p>
            If you purchase a subscription, you agree to pay the fees described at checkout or in an Order.
            Unless stated otherwise, fees are non-refundable and do not include taxes.
          </p>

          <h2>6) Intellectual Property</h2>
          <p>
            {SHORT_NAME} and its licensors own all right, title, and interest in and to the Service,
            including software, models, algorithms, documentation, and logos.
          </p>

          <h2>7) Disclaimers</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW,
            {` `}{SHORT_NAME} DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED.
          </p>

          <h2>8) Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, COVER, OR PUNITIVE DAMAGES.
          </p>

          <h2>9) Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Delaware, without regard to its
            conflicts of law rules.
          </p>

          <p className="mt-12 text-black/40 dark:text-white/40">
            Contact: <a href={`mailto:${CONTACT}`} className="underline">{CONTACT}</a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
