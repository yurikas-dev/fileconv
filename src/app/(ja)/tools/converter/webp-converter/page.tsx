import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'WebP 変換ツール（JPG・PNG）｜FileConv',
    description: 'WebP画像を無料でJPGやPNGに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
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
