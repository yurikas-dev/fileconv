import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

type Props = { params: { locale: string } }

export const metadata: Metadata = {
  title: 'About FileConv',
  description: 'FileConv is a free browser-based tool for converting images and audio files. Files are never sent to a server — all processing happens locally in your browser.',
}

export default function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">About FileConv</h1>
      <p className="text-xs text-gray-400 mb-10">FileConvについて</p>

      <div className="space-y-10 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">What is FileConv?</h2>
          <p>
            FileConv is a free, browser-based file conversion tool. It supports image conversion
            between HEIC, JPG, PNG, and WebP formats, as well as audio conversion to MP3 from
            formats like AAC, WAV, FLAC, and M4A.
          </p>
          <p className="mt-3">
            The key feature is that <strong className="text-gray-900">your files are never sent to a server</strong>.
            All processing happens entirely within your browser, so your personal photos and audio data
            stay private. No account required — completely free.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Why we built this</h2>
          <p>
            The idea came from a simple frustration: trying to open an iPhone HEIC photo on a
            Windows PC and feeling uneasy about uploading personal photos to an unknown conversion service.
          </p>
          <p className="mt-3">
            Photos often contain sensitive metadata — GPS location, timestamps, and more.
            We built FileConv so that anyone can convert files without ever uploading them anywhere.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Available Tools</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/en/tools/converter/heic-to-jpg" className="text-brand-600 hover:underline font-medium">
                HEIC to JPG / PNG
              </Link>
              <span className="text-gray-400 ml-2">Convert iPhone photos to JPG or PNG</span>
            </li>
            <li>
              <Link href="/en/tools/converter/jpg-converter" className="text-brand-600 hover:underline font-medium">
                JPG Converter
              </Link>
              <span className="text-gray-400 ml-2">Convert JPG to PNG or WebP</span>
            </li>
            <li>
              <Link href="/en/tools/converter/png-converter" className="text-brand-600 hover:underline font-medium">
                PNG Converter
              </Link>
              <span className="text-gray-400 ml-2">Convert PNG to JPG or WebP</span>
            </li>
            <li>
              <Link href="/en/tools/converter/webp-converter" className="text-brand-600 hover:underline font-medium">
                WebP Converter
              </Link>
              <span className="text-gray-400 ml-2">Convert WebP to JPG or PNG</span>
            </li>
            <li>
              <Link href="/en/tools/audio/to-mp3" className="text-brand-600 hover:underline font-medium">
                Audio to MP3
              </Link>
              <span className="text-gray-400 ml-2">Convert AAC, WAV, FLAC, M4A to MP3</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Our privacy commitment</h2>
          <p>
            FileConv never collects or stores your files. Conversion is handled entirely by
            JavaScript libraries (heic2any, lamejs) and standard browser APIs, running in your
            device&apos;s memory only — nothing ever leaves your browser.
          </p>
          <p className="mt-3">
            See our
            <Link href="/en/privacy" className="text-brand-600 hover:underline mx-1">Privacy Policy</Link>
            for full details.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            For feedback, bug reports, or questions, please use our
            <Link href="/en/contact" className="text-brand-600 hover:underline mx-1">contact form</Link>.
          </p>
        </section>
      </div>
    </div>
  )
}
