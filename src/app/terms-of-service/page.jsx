// 'use client'

import React from 'react'

export const metadata = {
  title: 'Terms of Service — DSQR Studio',
  description:
    'Terms of Service for DSQR Studio — subscription plans, billing, IP, privacy, and more.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen text-gray-900 py-12 px-4 sm:px-8 lg:px-20 font-sans">
      <article className="max-w-4xl mx-auto">
        <header className="mb-6">
          <div className="bg-primary rounded-xl border-gray-300 shadow-xl p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Terms of Service
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Effective Date:{' '}
              <strong className="text-gray-700">1st Oct, 2025</strong>{' '}
              &nbsp;·&nbsp; Last Updated:{' '}
              <strong className="text-gray-700">1st Sep, 2025</strong>
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              Welcome to <strong>DSQR Studio Inc.</strong> ("DSQR Studio", "we",
              "our", or "us"). These Terms of Service ("Terms") govern your
              access to and use of our subscription-based creative services. By
              subscribing, accessing, or using our platform, you agree to be
              bound by these Terms. If you do not agree, please discontinue use
              immediately.
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <SubSection title="1. Service Overview">
            <p className="text-base">
              DSQR Studio is a creative subscription service offering
              high-quality video editing, content production, and AI-powered
              creative solutions. Our services are designed for businesses,
              agencies, creators, and entrepreneurs who need consistent,
              scalable creative output. All DSQR Studio plans include the
              following features: Unlimited Video Requests, Unlimited Revisions,
              Dedicated Project Manager, Unlimited Brands & User Seats, Upgrade
              or Downgrade Anytime, Pause or Cancel Anytime, No Contract
              Commitment, Monday–Friday Workdays (EST & IST).
            </p>
          </SubSection>

          <SubSection title="2. Subscription Plans">
            <p className="text-base">
              We offer multiple plans designed to meet different creative and
              business needs. Each plan defines your delivery speed, active
              request limit, and support level. You are responsible for
              selecting a plan that best suits your requirements. Plan details
              and pricing are available at our website and may change without
              prior notice.
            </p>
          </SubSection>

          <SubSection title="3. Free Trials, Billing & Renewal">
            <p className="text-base">
              <strong>3.1 Eligibility & Activation:</strong> Free trials may be
              offered at DSQR Studio’s discretion to qualified clients who have
              existing video materials to submit and can make a purchase
              decision after receiving a few edited samples.
            </p>
            <p className="text-base mt-2">
              <strong>3.2 Free Trial Usage Policy:</strong> To ensure fair
              usage, if no updates, communication, or feedback are received from
              you for seven (7) consecutive days during your free trial, DSQR
              Studio reserves the right to charge your registered payment method
              for the period of service utilized during the trial, cancel your
              trial plan, and provide you with the video(s) created during that
              period without a watermark. No refunds will be issued for such
              charges.
            </p>
            <p className="text-base mt-2">
              <strong>3.3 Billing & Renewal:</strong> Subscriptions are billed
              monthly or semi-annually, and renew automatically unless cancelled
              or paused before renewal. Annual subscribers may pause their plan
              for up to 30 total days per year. Failed payments or chargebacks
              may result in suspension or termination of service. DSQR Studio
              reserves the right to approve, deny, or revoke any free trial or
              paid plan.
            </p>
          </SubSection>

          <SubSection title="4. Workflow">
            <p className="text-base">
              Subscribe and access your Client Dashboard. Submit project
              requests with required assets, references, and instructions. You
              will typically receive your first draft within approximately 48
              business hours. Request unlimited revisions until approval. Final
              approved files are delivered via Frame.io or equivalent secure
              sharing platforms.
            </p>
          </SubSection>

          <SubSection title="5. Pause Policy">
            <p className="text-base">
              Annual plans include up to 30 days of pause time per year. During
              a pause, your queue is frozen and no new requests are worked on.
              Pauses must be requested via email at least 3 business days in
              advance. After 30 total paused days, the plan resumes
              automatically. Unused pause time cannot be carried forward or
              transferred.
            </p>
          </SubSection>

          <SubSection title="6. Work Schedule & Operations">
            <p className="text-base">
              DSQR Studio operates Monday through Friday, excluding weekends and
              statutory Canadian holidays. Standard operating hours align with
              Eastern Standard Time (EST). Custom schedules or rush delivery may
              be arranged under a custom agreement.
            </p>
          </SubSection>

          <SubSection title="7. Acceptable Use Policy">
            <p className="text-base">
              You agree not to use DSQR Studio services for illegal, defamatory,
              obscene, or abusive content; misleading or fraudulent activities;
              harassment of DSQR Studio employees; reverse- engineering,
              reselling, or replicating DSQR’s proprietary workflows. Violation
              may result in suspension or termination without refund.
            </p>
          </SubSection>

          <SubSection title="8. Intellectual Property">
            <p className="text-base">
              All final deliverables - including edited videos, graphics, and
              creative outputs - produced by DSQR Studio for a client are the
              exclusive property of the client once the project is delivered and
              payment is completed in full. DSQR Studio retains the right to use
              completed works for portfolio display, case studies, and marketing
              purposes. However, if a client wishes to opt out of public
              showcase, they may notify our team in writing, and we will
              promptly remove or exclude their content from promotional use.
            </p>
          </SubSection>

          <SubSection title="9. Confidentiality & Privacy">
            <p className="text-base">
              All materials and data shared by clients are treated as strictly
              confidential. DSQR Studio complies with PIPEDA and applicable
              Canadian privacy laws. Data is securely stored and used solely for
              the purpose of providing services.
            </p>
          </SubSection>

          <SubSection title="10. File Retention & Expiry">
            <p className="text-base">
              Final deliverables are stored on DSQR’s platform for 30 days after
              completion. Working files and raw project data are retained for 15
              days after approval. Clients are responsible for downloading files
              before expiration.
            </p>
          </SubSection>

          <SubSection title="11. Refund Policy">
            <p className="text-base">
              No refunds are issued for dissatisfaction; unlimited revisions are
              included to ensure desired results. Refunds are only provided if
              DSQR fails to deliver due to legitimate operational constraints.
              Approved refunds are processed within 10–15 business days from
              approval. Refund requests must be made within 7 days of service
              commencement.
            </p>
          </SubSection>

          <SubSection title="12. Account Security">
            <p className="text-base">
              You are responsible for maintaining the confidentiality of your
              account credentials. DSQR is not liable for unauthorized access
              caused by sharing or negligence.
            </p>
          </SubSection>

          <SubSection title="13. Third-Party Tools">
            <p className="text-base">
              We utilize third-party software and platforms (e.g., Frame.io,
              Notion, project dashboards) for efficient service delivery. Use of
              these tools is subject to their own terms and conditions, and DSQR
              Studio is not liable for outages or issues on those platforms.
            </p>
          </SubSection>

          <SubSection title="14. Downtime & Force Majeure">
            <p className="text-base">
              Temporary interruptions may occur due to scheduled maintenance,
              third-party software outages, or force majeure events. In such
              cases, DSQR will promptly communicate expected delays and revised
              timelines.
            </p>
          </SubSection>

          <SubSection title="15. Revisions & Project Archiving">
            <p className="text-base">
              Unlimited genuine revisions are included per project. Projects
              with no response for 15 consecutive days may be archived. Archived
              projects can be reactivated depending on queue capacity and plan
              status.
            </p>
          </SubSection>

          <SubSection title="16. Non-Solicitation">
            <p className="text-base">
              Clients agree not to directly hire or solicit DSQR Studio
              employees, contractors, or staff during their active plan and for
              six (6) months thereafter without written consent from DSQR
              Studio.
            </p>
          </SubSection>

          <SubSection title="17. Indemnification">
            <p className="text-base">
              You agree to indemnify and hold DSQR Studio harmless against any
              claims or liabilities arising from misuse of deliverables,
              copyright or trademark issues related to your submitted assets, or
              breach of these Terms.
            </p>
          </SubSection>

          <SubSection title="18. Limitation of Liability">
            <p className="text-base">
              To the maximum extent permitted by Canadian law, DSQR Studio’s
              total liability is limited to the amount paid by you in the
              preceding 12 months. DSQR is not liable for indirect,
              consequential, or incidental damages.
            </p>
          </SubSection>

          <SubSection title="19. Governing Law & Jurisdiction">
            <p className="text-base">
              These Terms are governed by and construed in accordance with the
              laws of Ontario, Canada. Any disputes will first attempt amicable
              resolution; failing that, they will be handled exclusively in
              Ontario courts.
            </p>
          </SubSection>

          <SubSection title="20. Updates to Terms">
            <p className="text-base">
              DSQR Studio may update these Terms periodically. Major changes
              will be communicated via email or dashboard notice. Your continued
              use of DSQR Studio services after any updates constitutes
              acceptance of the revised Terms.
            </p>
          </SubSection>

          <SubSection title="21. Contact Information">
            <p className="text-base">
              DSQR Studio Inc.
              <br />
              Toronto, Ontario, Canada
              <br />
              <a
                href="mailto:info@dsqrstudio.com"
                className="text-blue-600 font-medium"
              >
                info@dsqrstudio.com
              </a>
              <br />
              <a
                href="https://www.dsqrstudio.com"
                className="text-blue-600 font-medium"
              >
                www.dsqrstudio.com
              </a>
            </p>
          </SubSection>
        </section>

        <footer className="mt-8 text-sm text-gray-600">
          © {new Date().getFullYear()} DSQR Studio Inc. All rights reserved.
        </footer>
      </article>
    </main>
  )
}

function SubSection({ title, children }) {
  return (
    <section className="bg-primary p-4 md:p-5 rounded-lg border border-gray-200 shadow-xl">
      <h3 className="text-lg md:text-xl font-semibold mb-1">{title}</h3>
      <div className="text-gray-700 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </section>
  )
}
