import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'JPG Converter (PNG / WebP) | FileConv',
    description: 'Convert JPG images to PNG or WebP for free. Files are processed in your browser — never sent to a server.',
    alternates: {
      canonical: 'https://fileconv.app/en/tools/converter/jpg-converter/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/jpg-converter/',
        en: 'https://fileconv.app/en/tools/converter/jpg-converter/',
        'x-default': 'https://fileconv.app/tools/converter/jpg-converter/',
      },
    },
  }
}

export default function JpgConverterPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <ConverterPage
      heroNamespace="jpgHero"
      allowedInputs={['jpg']}
      allowedOutputs={['png', 'webp']}
      defaultOutput="png"
      faqNamespace="faqJpg"
    />
  )
}
