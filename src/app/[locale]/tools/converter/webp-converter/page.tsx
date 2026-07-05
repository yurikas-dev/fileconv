import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'WebP Converter (JPG / PNG) | FileConv',
    description: 'Convert WebP images to JPG or PNG for free. Files are processed in your browser — never sent to a server.',
    alternates: {
      canonical: 'https://fileconv.app/en/tools/converter/webp-converter/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/webp-converter/',
        en: 'https://fileconv.app/en/tools/converter/webp-converter/',
        'x-default': 'https://fileconv.app/tools/converter/webp-converter/',
      },
    },
  }
}

export default function WebpConverterPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
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
