import type { Metadata } from 'next'
import { ConverterTool } from '@/components/tool/ConverterTool'
import { HowItWorks } from '@/components/tool/HowItWorks'
import { Faq } from '@/components/tool/Faq'

export const metadata: Metadata = {
  title: 'FileConv｜無料でHEICをJPG・PNGに変換【サーバー送信なし】',
  description: 'iPhoneのHEIC写真を無料でJPG・PNGに変換。ファイルはすべてブラウザ内で処理されるので、サーバーに送信されません。複数ファイルの一括変換、画質選択、EXIF削除に対応。',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FileConv',
  description: 'HEICファイルをJPG・PNGに変換する無料オンラインツール',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  featureList: [
    'HEICからJPGへの変換',
    'HEICからPNGへの変換',
    '複数ファイルの一括変換',
    'ブラウザ内処理（サーバー送信なし）',
    '画質選択対応',
    'EXIF情報の削除',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" />
            無料 · サーバー送信なし · 高速
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            HEIC 変換ツール
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            iPhoneの写真（.heic）をJPGやPNGに変換。<br />
            ファイルはブラウザ内で処理されるので、
            <strong className="text-gray-700">アップロード不要で安心</strong>です。
          </p>
        </section>

        <ConverterTool />
        <HowItWorks />
        <Faq />
      </div>
    </>
  )
}
