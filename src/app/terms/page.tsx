import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Charismata",
  description: "Terms of Service for the Charismata spiritual gifts assessment",
};

export default function TermsOfService() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          Terms of Service
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
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of Charismata, a
            spiritual gifts assessment tool available at charismata.org (&ldquo;the
            Service&rdquo;). The Service is operated by Matt Heerema (&ldquo;I,&rdquo;
            &ldquo;me,&rdquo; or &ldquo;my&rdquo;).
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            By using the Service, you agree to these Terms. If you do not agree, please do
            not use the Service.
          </p>
        </section>

        {/* Nature of the Assessment */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Nature of the Assessment
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Charismata is a self-report assessment designed to offer directional insight
            into spiritual gifting. It is <strong>not</strong> a clinical or psychological
            instrument, and it is not a substitute for pastoral counsel, community
            discernment, or the guidance of the Holy Spirit.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Results are <strong>descriptive, not definitive</strong>. They reflect patterns
            in your self-reported responses and should be considered alongside the
            affirmation of your local church community, observable fruit in your life and
            ministry, and continued study of Scripture.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            without warranty of any kind, whether express or implied, including but not
            limited to warranties of accuracy, fitness for a particular purpose, or
            non-infringement.
          </p>
        </section>

        {/* Your Use of the Service */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Your Use of the Service
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Charismata is free to use. You may take the assessment, view your results, and
            share them with others for personal, church, or ministry purposes.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            By submitting your responses, you grant me a license to store your assessment
            data for the purpose of generating and delivering your results, and for
            aggregate analysis to improve the assessment over time.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            If your assessment session was initiated through a third-party integration
            (such as Trellis), your results will be sent back to that service as part of
            the integration you or your organization opted into.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Intellectual Property
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            The assessment content &mdash; including questions, category descriptions,
            scoring methodology, and theological framework &mdash; is proprietary. You may
            not scrape, reverse-engineer, reproduce, or commercially redistribute any
            portion of the assessment content without prior written permission.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            You are welcome to share your personal results and link to the Service freely.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Limitation of Liability
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            To the fullest extent permitted by law, Matt Heerema shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages, or any
            loss of data, opportunities, reputation, or profits, whether direct or
            indirect, arising out of or related to your use of the Service.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            In no event shall total liability exceed $100 USD.
          </p>
        </section>

        {/* Changes and Availability */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Changes and Availability
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            I reserve the right to modify, suspend, or discontinue the Service at any time
            without notice. I may also update these Terms from time to time. Continued use
            of the Service after changes are posted constitutes acceptance of the revised
            Terms.
          </p>
        </section>

        {/* Dispute Resolution */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Dispute Resolution
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Any dispute arising out of or relating to these Terms or the Service shall be
            resolved by binding arbitration conducted in Ames, Iowa, in accordance with the
            rules of the American Arbitration Association. Each party shall bear its own
            costs. You agree that any dispute resolution proceedings will be conducted only
            on an individual basis and not in a class, consolidated, or representative
            action.
          </p>
        </section>

        {/* Governing Law */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Governing Law
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            These Terms are governed by and construed in accordance with the laws of the
            State of Iowa, without regard to its conflict of law principles.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-stone-100/60 rounded-2xl border border-stone-200 p-6 space-y-3">
          <h2 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Contact
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            If you have questions about these Terms, you can reach me at{" "}
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
            href="/privacy"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            Privacy Policy
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
