import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { AudioConverterPage } from '@/components/tool/AudioConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Convert Audio to MP3 | FileConv',
    description: 'Convert AAC, WAV, FLAC, M4A and more to MP3 for free. Files are processed entirely in your browser — never sent to a server.',
  }
}

export default function ToMp3Page({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <span className="inline-block text-xs font-semibold bg-brand-100 text-brand-700 px-3 py-1 rounded-full mb-4">
          Audio Converter
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Convert Audio Files to MP3
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Convert AAC, WAV, FLAC, M4A and more to MP3.
          <br />
          Everything runs in your browser — no files are sent to any server.
        </p>
      </div>
      <AudioConverterPage />
    </div>
  )
}
