import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ImageCompressorTool } from './ImageCompressorTool'
import { HowItWorks } from './HowItWorks'
import { Faq } from './Faq'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FileConv Image Compressor',
  description: 'Compress images for free — browser-only, no server upload',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  featureList: [
    'Browser-only processing (no server upload)',
    'Batch compression',
    'Quality slider control',
    'Size reduction preview',
  ],
}

export async function ImageCompressorPage() {
  const [t, tc, messages] = await Promise.all([
    getTranslations('compressorHero'),
    getTranslations('heroCommon'),
    getMessages(),
  ])

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='max-w-3xl mx-auto px-4 py-10'>
        <section className='text-center mb-10'>
          <div className='inline-flex items-center gap-2 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-5'>
            <span className='w-1.5 h-1.5 rounded-full bg-brand-500 inline-block' />
            {tc('badge')}
          </div>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4'>
            {t('h1')}
          </h1>
          <p className='text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto'>
            {t('descPart1')}
            <br />
            {tc('descPart2')}
            <strong className='text-gray-700'>{tc('descStrong')}</strong>
            {tc('descEnd')}
          </p>
        </section>

        <ImageCompressorTool />

        <div className='mt-10 p-6 bg-gray-50 border border-gray-100 rounded-2xl'>
          <h2 className='text-base font-semibold text-gray-800 mb-2'>
            {t('noteTitle')}
          </h2>
          <p className='text-sm text-gray-600 leading-relaxed'>{t('noteBody')}</p>
        </div>
        <div className='mt-14'>
          <HowItWorks />
          <Faq namespace='faqCompressor' />
        </div>
      </div>
    </NextIntlClientProvider>
  )
}
