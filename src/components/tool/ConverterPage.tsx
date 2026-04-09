import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ConverterTool } from './ConverterTool'
import { HowItWorks } from './HowItWorks'
import { Faq } from './Faq'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FileConv',
  description: 'Convert HEIC files to JPG/PNG — free, browser-only',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  featureList: [
    'HEIC to JPG conversion',
    'HEIC to PNG conversion',
    'Batch conversion',
    'Browser-only processing (no server upload)',
    'Quality control',
    'EXIF data removal',
  ],
}

// / と /en 両方から使われる共有コンポーネント
// Provider をここに持つことで、どちらのルートでも正しいロケールのメッセージが渡る
export async function ConverterPage() {
  const [t, messages] = await Promise.all([
    getTranslations('hero'),
    getMessages(),
  ])

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" />
            {t('badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {t('h1')}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            {t('descPart1')}<br />
            {t('descPart2')}
            <strong className="text-gray-700">{t('descStrong')}</strong>
            {t('descEnd')}
          </p>
        </section>

        <ConverterTool />
        <HowItWorks />
        <Faq />
      </div>
    </NextIntlClientProvider>
  )
}
