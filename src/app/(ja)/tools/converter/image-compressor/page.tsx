import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ImageCompressorPage } from '@/components/tool/ImageCompressorPage'

export const metadata: Metadata = {
  title: '画像圧縮ツール｜JPG・PNG・WebPをブラウザ内で圧縮【無料】',
  description:
    'JPG・PNG・WebP画像のファイルサイズを無料で削減。画質スライダーで圧縮率を調整。ファイルはすべてブラウザ内で処理され、サーバーに送信されません。',
  alternates: {
    canonical: 'https://fileconv.app/tools/converter/image-compressor/',
    languages: {
      ja: 'https://fileconv.app/tools/converter/image-compressor/',
      en: 'https://fileconv.app/en/tools/converter/image-compressor/',
      'x-default': 'https://fileconv.app/en/tools/converter/image-compressor/',
    },
  },
}

export default function ImageCompressorRoutePage() {
  setRequestLocale('ja')
  return <ImageCompressorPage />
}
