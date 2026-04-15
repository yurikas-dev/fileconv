import type { Metadata } from 'next'
import { ConverterPage } from '@/components/tool/ConverterPage'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'JPG 変換ツール（PNG・WebP）｜FileConv',
    description: 'JPG画像を無料でPNGやWebPに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されません。',
  }
}

export default function JpgConverterPage() {
  return (
    <ConverterPage
      heroNamespace="jpgHero"
      allowedInputs={['jpg']}
      allowedOutputs={['png', 'webp']}
      defaultOutput="png"
    />
  )
}
