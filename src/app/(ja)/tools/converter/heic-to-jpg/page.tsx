import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

export const metadata: Metadata = {
  title: 'HEIC → JPG・PNG 変換｜FileConv',
  description: 'iPhoneのHEIC写真を無料でJPGやPNGに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
  alternates: {
    canonical: 'https://fileconv.app/tools/converter/heic-to-jpg/',
    languages: {
      ja: 'https://fileconv.app/tools/converter/heic-to-jpg/',
      en: 'https://fileconv.app/en/tools/converter/heic-to-jpg/',
      'x-default': 'https://fileconv.app/tools/converter/heic-to-jpg/',
    },
  },
}

export default function HeicToJpgPage() {
  setRequestLocale('ja')
  return (
    <ConverterPage
      heroNamespace="heicHero"
      allowedInputs={['heic']}
      allowedOutputs={['jpg', 'png']}
      defaultOutput="jpg"
      faqNamespace="faqHeic"
    />
  )
}
