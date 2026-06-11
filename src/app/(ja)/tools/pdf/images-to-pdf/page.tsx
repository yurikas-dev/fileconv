import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ImageToPdfPage } from '@/components/tool/ImageToPdfPage'

export const metadata: Metadata = {
  title: '画像をPDFに変換｜JPG・PNG・WebPをまとめてPDF化【無料】',
  description:
    'JPG・PNG・WebP画像を無料でPDFに変換。複数ファイルをまとめて1つのPDFに。ファイルはすべてブラウザ内で処理され、サーバーに送信されません。',
  alternates: {
    canonical: 'https://fileconv.app/tools/pdf/images-to-pdf/',
    languages: {
      ja: 'https://fileconv.app/tools/pdf/images-to-pdf/',
      en: 'https://fileconv.app/en/tools/pdf/images-to-pdf/',
      'x-default': 'https://fileconv.app/tools/pdf/images-to-pdf/',
    },
  },
}

export default function ImagesToPdfRoutePage() {
  setRequestLocale('ja')
  return <ImageToPdfPage />
}
