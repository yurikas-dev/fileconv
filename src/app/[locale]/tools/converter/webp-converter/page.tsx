import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'WebP Converter (JPG / PNG) | FileConv',
    description: 'Convert WebP images to JPG or PNG for free. Files are processed in your browser — never sent to a server.',
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
