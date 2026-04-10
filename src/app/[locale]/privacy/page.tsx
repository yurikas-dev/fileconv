import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: { locale: string } }

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FileConv Privacy Policy. All files are processed in your browser and never sent to any server.',
}

export default function PrivacyPageEn({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Privacy Policy</h1>
      <p className="text-xs text-gray-400 mb-10">Last updated: April 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">File Handling</h2>
          <p>
            All files processed by FileConv are handled entirely within your browser.
            No files are ever uploaded to our servers, and we have no access to your file contents at any time.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Analytics</h2>
          <p>
            We may use Google Analytics to help us understand how visitors use this service.
            Google Analytics collects anonymous data such as page views and usage patterns using cookies.
            No personally identifiable information is collected.
            For more details, see{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Google&apos;s Privacy Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Advertising</h2>
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
          <h2 className="text-base font-semibold text-gray-900 mb-2">Cookies</h2>
          <p>
            We may use cookies to remember your language preference and to enable Google Analytics and Google AdSense functionality.
            You can disable cookies in your browser settings, though some features may not work as expected.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Contact Form Data</h2>
          <p>
            Personal information submitted via the contact form (such as your name and email address) will be used solely for the purpose of responding to your inquiry and will not be shared with any third parties.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Contact</h2>
          <p>
            For privacy-related inquiries, please visit our{' '}
            <a href="/en/contact" className="text-brand-600 hover:underline">contact page</a>.
          </p>
        </section>

      </div>
    </div>
  )
}
