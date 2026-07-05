import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'PNG 変換ツール（JPG・WebP）｜FileConv',
    description: 'PNG画像を無料でJPGやWebPに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
    alternates: {
      canonical: 'https://fileconv.app/tools/converter/png-converter/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/png-converter/',
        en: 'https://fileconv.app/en/tools/converter/png-converter/',
        'x-default': 'https://fileconv.app/tools/converter/png-converter/',
      },
    },
  }
}

export default function PngConverterPage() {
  setRequestLocale('ja')
  return (
    <ConverterPage
      heroNamespace="pngHero"
      allowedInputs={['png']}
      allowedOutputs={['jpg', 'webp']}
      defaultOutput="jpg"
      faqNamespace="faqPng"
    />
  )
}
