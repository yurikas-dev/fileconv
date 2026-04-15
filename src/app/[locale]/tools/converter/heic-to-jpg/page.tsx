import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ConverterPage } from '@/components/tool/ConverterPage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'HEIC to JPG / PNG Converter | FileConv',
    description: 'Convert iPhone HEIC photos to JPG or PNG for free. Files are processed in your browser — never sent to a server.',
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
    />
  )
}
