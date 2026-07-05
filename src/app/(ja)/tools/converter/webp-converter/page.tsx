import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WebP 変換ツール（JPG・PNG）｜FileConv',
    description: 'WebP画像を無料でJPGやPNGに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
    alternates: {
      canonical: 'https://fileconv.app/tools/converter/webp-converter/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/webp-converter/',
        en: 'https://fileconv.app/en/tools/converter/webp-converter/',
        'x-default': 'https://fileconv.app/tools/converter/webp-converter/',
      },
    },
  }
}

export default function WebpConverterPage() {
  setRequestLocale('ja')
  return (
    <ConverterPage
      heroNamespace="webpHero"
      allowedInputs={['webp']}
      allowedOutputs={['jpg', 'png']}
      defaultOutput="jpg"
      faqNamespace="faqWebp"
    />
  )
}
