// app/privacy/page.jsx

import React from 'react'

export const metadata = {
  title: 'Privacy Policy — DSQR Studio',
  description:
    'Privacy Policy for DSQR Studio — how we collect, use, and protect your personal data.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen text-gray-900 py-12 px-4 sm:px-8 lg:px-20 font-sans">
      <article className="max-w-4xl mx-auto">
        <header className="mb-6">
          <div className="bg-primary rounded-xl shadow-xl p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Privacy Policy
            </h1>
            <p className="mt-2 text-base text-gray-500">
              Last updated:{' '}
              <strong className="text-gray-700">1st Sep, 2025</strong>
            </p>
            <p className="mt-4 text-base md:text-lg text-gray-700">
              At <strong>DSQR Studio</strong>, we value your privacy and are
              committed to protecting your personal information. This policy
              explains what information we collect, how we use it, and your
              rights.
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <SubSection title="1. Information We Collect">
            <p className="text-base">
              <strong>a. Personal Information:</strong> When you use our
              services, we may collect personal information such as your name,
              email address, postal address, phone number, and payment details.
            </p>
            <p className="text-base mt-2">
              <strong>b. Content Information:</strong> We store the videos and
              related content you provide for editing and service delivery.
            </p>
          </SubSection>

          <SubSection title="2. How We Use Your Information">
            <p className="text-base">
              We use your information to provide and improve our services, to
              communicate with you about your account and our offerings, and to
              analyze usage patterns so we can make the product better.
            </p>
            <ul className="list-disc list-inside mt-2 text-base text-gray-700 space-y-1">
              <li>
                To provide editing, production, and delivery of your content.
              </li>
              <li>
                To send service updates, billing notices, and promotional offers
                (with opt-out where required).
              </li>
              <li>
                To analyze and improve our services using feedback and usage
                data.
              </li>
            </ul>
          </SubSection>

          <SubSection title="3. Information Sharing & Disclosure">
            <p className="text-base">
              <strong>a. Client's Ownership:</strong> Videos produced and
              published for clients belong to the clients, and they control
              distribution.
            </p>
            <p className="text-base mt-2">
              <strong>b. Service Providers:</strong> We may share personal
              information with trusted third-party vendors that help deliver our
              services (e.g., hosting, analytics, Frame.io). These providers are
              contractually obligated to protect your data.
            </p>
            <p className="text-base mt-2">
              <strong>c. Legal Requirements:</strong> We may disclose
              information to comply with laws or legal processes or to protect
              our rights, property, or safety.
            </p>
          </SubSection>

          <SubSection title="4. Data Security">
            <p className="text-base">
              We implement reasonable administrative and technical safeguards to
              protect your personal data from unauthorized access, alteration,
              or destruction. However, no online system is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </SubSection>

          <SubSection title="5. Cookies & Tracking Technologies">
            <p className="text-base">
              Our website may use cookies and similar tracking technologies to
              enhance user experience, analyze trends, and administer the site.
              You can manage cookie preferences via your browser settings or any
              cookie banner controls we provide.
            </p>
          </SubSection>

          <SubSection title="6. Your Choices & Rights">
            <p className="text-base">
              You have rights over your personal data, including the right to
              access, correct, or request deletion of personal information we
              hold. To exercise these rights, contact us at the address below.
            </p>
          </SubSection>

          <SubSection title="7. Changes to This Policy">
            <p className="text-base">
              We may update this privacy policy periodically. We will post
              changes here and update the "last updated" date. Continued use
              after changes constitutes acceptance of the revised policy.
            </p>
          </SubSection>

          <SubSection title="8. Contact Us">
            <p className="text-base">
              For questions or requests related to this Privacy Policy, please
              contact us:
            </p>
            <p className="text-base mt-2">
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
    <section className="bg-primary p-4 md:p-5 rounded-lg shadow-xl border border-gray-100">
      <h3 className="text-lg md:text-xl font-semibold mb-1">{title}</h3>
      <div className="text-gray-700 leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </section>
  )
}
