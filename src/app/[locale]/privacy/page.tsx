import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: { locale: string } }

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Use',
  description: 'FileConv Privacy Policy and Terms of Use. All files are processed in your browser and never sent to any server.',
}

export default function PrivacyPageEn({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Privacy Policy &amp; Terms of Use</h1>
      <p className="text-xs text-gray-400 mb-10">Last updated: April 29, 2026</p>

      <div className="space-y-10 text-sm text-gray-700 leading-relaxed">

        {/* ── Privacy Policy ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">Privacy Policy</h2>
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">File Handling</h3>
              <p>
                All files processed by FileConv are handled entirely within your browser.
                No files are ever uploaded to our servers, and we have no access to your file contents at any time.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Analytics</h3>
              <p>
                We use Google Analytics (Google Analytics 4) to help us understand how visitors use this service.
                Google Analytics collects anonymous data such as page views and usage patterns using cookies.
                No personally identifiable information is collected.
                For more details, see{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                  Google&apos;s Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Advertising</h3>
              <p>
                This site may display ads served by Google AdSense.
                Google AdSense may use cookies to show interest-based advertisements.
                For more details, see{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                  Google&apos;s Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Cookies</h3>
              <p>
                We may use cookies to remember your language preference and to enable Google Analytics and Google AdSense functionality.
                You can disable cookies in your browser settings, though some features may not work as expected.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Contact Form Data</h3>
              <p>
                Personal information submitted via the contact form (such as your name and email address) will be used solely for the purpose of responding to your inquiry and will not be shared with any third parties.
              </p>
            </section>
          </div>
        </div>

        {/* ── Terms of Use ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">Terms of Use</h2>
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Use of the Service</h3>
              <p>
                FileConv is provided free of charge. The operator accepts no liability for any damages arising from the use of this service.
                Conversion results depend on your browser&apos;s capabilities and the condition of the source file — successful conversion cannot be guaranteed for every file.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Prohibited Activities</h3>
              <p>The following activities are prohibited:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>Using the service for any purpose that violates applicable laws or public order</li>
                <li>Actions that place an excessive load on the service</li>
                <li>Reproducing or redistributing service content without permission</li>
                <li>Any other activity deemed inappropriate by the operator</li>
              </ul>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Disclaimer</h3>
              <p>
                This service relies on browser capabilities and may not function correctly in all environments.
                The content and availability of the service may be changed or discontinued without prior notice.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Intellectual Property</h3>
              <p>
                All intellectual property rights related to the FileConv logo, design, and content belong to the operator.
                Copyright of files converted by users remains with the respective users.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Changes to These Terms</h3>
              <p>
                These terms may be updated without prior notice. Continued use of the service after any changes constitutes acceptance of the revised terms.
              </p>
            </section>
          </div>
        </div>

        {/* ── Contact ── */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Contact</h2>
          <p>
            For questions about this policy or these terms, please visit our{' '}
            <a href="/en/contact" className="text-brand-600 hover:underline">contact page</a>.
          </p>
        </section>

      </div>
    </div>
  )
}
