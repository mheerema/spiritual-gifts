import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Charismata",
  description: "Privacy Policy for the Charismata spiritual gifts assessment",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-stone-500 mt-2 text-base">
          Effective March 16, 2026
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Introduction
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            This Privacy Policy describes how Charismata (charismata.org) collects, uses,
            and protects your information. The Service is operated by Matt Heerema. I take
            your privacy seriously and aim to collect only what is necessary to deliver the
            assessment experience.
          </p>
        </section>

        {/* What We Collect */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            What We Collect
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            When you take the assessment, the following data may be collected:
          </p>
          <ul className="text-sm text-stone-600 leading-relaxed list-disc list-inside space-y-1.5 ml-1">
            <li>
              <strong>Name</strong> &mdash; optional, only if you choose to provide it
            </li>
            <li>
              <strong>Email address</strong> &mdash; optional, only if you choose to
              provide it
            </li>
            <li>
              <strong>Church name</strong> &mdash; optional, only if you choose to provide
              it
            </li>
            <li>
              <strong>Group name</strong> &mdash; optional, only if you choose to provide
              it
            </li>
            <li>
              <strong>Assessment responses</strong> &mdash; your answers to 100 statements
              on a 1&ndash;5 scale
            </li>
            <li>
              <strong>Calculated scores</strong> &mdash; your results across 10 gift
              categories, derived from your responses
            </li>
          </ul>
          <p className="text-sm text-stone-600 leading-relaxed">
            If your session was provisioned by a third-party integration (such as Trellis),
            your name and email may be provided by that service rather than entered by you
            directly.
          </p>
        </section>

        {/* How We Use Your Data */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            How We Use Your Data
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Your data is used to:
          </p>
          <ul className="text-sm text-stone-600 leading-relaxed list-disc list-inside space-y-1.5 ml-1">
            <li>Generate and display your assessment results</li>
            <li>Allow you to return to your results via your session link</li>
            <li>
              Improve the assessment through aggregate, anonymized analysis of response
              patterns
            </li>
          </ul>
        </section>

        {/* What We Don't Do */}
        <section className="bg-stone-100/60 rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            What We Don&apos;t Do
          </h2>
          <ul className="text-sm text-stone-600 leading-relaxed list-disc list-inside space-y-1.5 ml-1">
            <li>We do not sell your data to anyone, ever</li>
            <li>We do not use advertising or ad-tracking services</li>
            <li>We do not use analytics or tracking cookies</li>
            <li>
              We do not share your data with third parties, except as described below
            </li>
          </ul>
        </section>

        {/* Third-Party Integrations */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Third-Party Integrations
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            If your assessment session was provisioned through a third-party application
            (such as Trellis), your results will be sent back to that service via a secure
            callback as part of the integration your organization opted into. In that case,
            the third party&apos;s own privacy policy governs how they handle your data
            once received.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Outside of this specific scenario, your data is never shared with any third
            party.
          </p>
        </section>

        {/* Cookies */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Cookies
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Charismata does not use tracking cookies, analytics cookies, or advertising
            cookies. The only cookie used is a functional authentication cookie for the
            administrative panel, which does not affect regular users of the assessment.
          </p>
        </section>

        {/* Data Storage and Security */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Data Storage and Security
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Your data is stored in a PostgreSQL database hosted by Neon in the United
            States. The application is hosted on Vercel, also in the United States.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            All data is encrypted in transit using HTTPS/TLS. Database connections use SSL.
            While no system is perfectly secure, I take reasonable measures to protect your
            information.
          </p>
        </section>

        {/* Data Retention and Deletion */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Data Retention and Deletion
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Assessment data is retained indefinitely to allow you to access your results at
            any time. If you would like your data deleted, you may request deletion by
            emailing{" "}
            <a
              href="mailto:matt@mattheerema.com"
              className="text-stone-800 underline hover:text-stone-600 transition-colors"
            >
              matt@mattheerema.com
            </a>
            . I will delete all data associated with your session upon request.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Children&apos;s Privacy
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Charismata is intended for users aged 13 and older. The Service does not
            knowingly collect personal information from children under 13, in compliance
            with COPPA (Children&apos;s Online Privacy Protection Act).
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            For users between 13 and 16, parental consent is recommended, particularly in a
            church or youth group context. If you believe a child under 13 has provided
            personal information through the Service, please contact me at{" "}
            <a
              href="mailto:matt@mattheerema.com"
              className="text-stone-800 underline hover:text-stone-600 transition-colors"
            >
              matt@mattheerema.com
            </a>{" "}
            and I will promptly delete that data.
          </p>
        </section>

        {/* Changes to This Policy */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Changes to This Policy
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            I may update this Privacy Policy from time to time. Changes will be reflected on
            this page with an updated effective date. Continued use of the Service after
            changes are posted constitutes acceptance of the revised policy.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-stone-100/60 rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Contact
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            If you have questions about this Privacy Policy or want to request data
            deletion, you can reach me at{" "}
            <a
              href="mailto:matt@mattheerema.com"
              className="text-stone-800 underline hover:text-stone-600 transition-colors"
            >
              matt@mattheerema.com
            </a>
            .
          </p>
          <p className="text-sm text-stone-500 leading-relaxed">
            Matt Heerema<br />
            2916 Bayberry Rd.<br />
            Ames, IA 50014
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-stone-200 text-center space-y-2">
        <div className="flex justify-center gap-4">
          <Link
            href="/terms"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            Terms of Service
          </Link>
          <span className="text-stone-300">|</span>
          <Link
            href="/resources"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            Resources
          </Link>
        </div>
      </div>
    </main>
  );
}
