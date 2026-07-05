import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JPG 変換ツール（PNG・WebP）｜FileConv',
    description: 'JPG画像を無料でPNGやWebPに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
    alternates: {
      canonical: 'https://fileconv.app/tools/converter/jpg-converter/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/jpg-converter/',
        en: 'https://fileconv.app/en/tools/converter/jpg-converter/',
        'x-default': 'https://fileconv.app/tools/converter/jpg-converter/',
      },
    },
  }
}

export default function JpgConverterPage() {
  setRequestLocale('ja')
  return (
    <ConverterPage
      heroNamespace="jpgHero"
      allowedInputs={['jpg']}
      allowedOutputs={['png', 'webp']}
      defaultOutput="png"
      faqNamespace="faqJpg"
    />
  )
}
