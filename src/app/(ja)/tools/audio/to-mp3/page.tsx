import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { AudioConverterPage } from '@/components/tool/AudioConverterPage'

export const metadata: Metadata = {
  title: '音声ファイルをMP3に変換｜無料オンラインツール',
  description: 'AAC・WAV・FLAC・M4AなどをMP3に変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。無料・登録不要。',
}

export default function ToMp3Page() {
  setRequestLocale('ja')
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <span className="inline-block text-xs font-semibold bg-brand-100 text-brand-700 px-3 py-1 rounded-full mb-4">
          音声変換
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          音声ファイルをMP3に変換
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          AAC・WAV・FLAC・M4AなどをMP3に変換。
          <br />
          すべてブラウザ内で処理されるので、ファイルはサーバーに送信されません。
        </p>
      </div>
      <AudioConverterPage />
    </div>
  )
}
