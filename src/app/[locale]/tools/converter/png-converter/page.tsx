import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'PNG Converter (JPG / WebP) | FileConv',
    description: 'Convert PNG images to JPG or WebP for free. Files are processed in your browser — never sent to a server.',
    alternates: {
      canonical: 'https://fileconv.app/en/tools/converter/png-converter/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/png-converter/',
        en: 'https://fileconv.app/en/tools/converter/png-converter/',
        'x-default': 'https://fileconv.app/tools/converter/png-converter/',
      },
    },
  }
}

export default function PngConverterPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
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
