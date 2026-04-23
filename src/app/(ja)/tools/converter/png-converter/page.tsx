import type { Metadata } from 'next'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'PNG 変換ツール（JPG・WebP）｜FileConv',
    description: 'PNG画像を無料でJPGやWebPに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
  }
}

export default function PngConverterPage() {
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
