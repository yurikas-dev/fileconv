import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'HEIC to JPG / PNG Converter | FileConv',
    description: 'Convert iPhone HEIC photos to JPG or PNG for free. Files are processed in your browser — never sent to a server.',
    alternates: {
      canonical: 'https://fileconv.app/en/tools/converter/heic-to-jpg/',
      languages: {
        ja: 'https://fileconv.app/tools/converter/heic-to-jpg/',
        en: 'https://fileconv.app/en/tools/converter/heic-to-jpg/',
        'x-default': 'https://fileconv.app/tools/converter/heic-to-jpg/',
      },
    },
  }
}

export default function HeicToJpgPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
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
