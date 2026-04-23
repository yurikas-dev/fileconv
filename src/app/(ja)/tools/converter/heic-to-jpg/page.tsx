import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('heicHero')
  return {
    title: 'HEIC → JPG・PNG 変換｜FileConv' + t('qualityHigh'),
    description: 'iPhoneのHEIC写真を無料でJPGやPNGに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
  }
}

export default function HeicToJpgPage() {
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
