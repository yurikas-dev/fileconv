import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

type Props = { params: { locale: string } }

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the FileConv team with questions, feedback, or bug reports.',
  robots: { index: false },
}

const CONTACT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfs5i9sBVMfU-LCYe_GfAgeXeFak-z3Qua6hL3YQEDbDxmySg/viewform'

export default function ContactPageEn({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact</h1>
      <p className="text-xs text-gray-400 mb-10">Get in touch</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-sm text-gray-700 leading-relaxed space-y-6">
        <p>
          Have a question, found a bug, or want to share feedback about FileConv?
          We&apos;d love to hear from you — please use the form below.
        </p>

        <div className="pt-2">
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Open Contact Form
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
          We will do our best to respond promptly.
        </p>
      </div>
    </div>
  )
}
