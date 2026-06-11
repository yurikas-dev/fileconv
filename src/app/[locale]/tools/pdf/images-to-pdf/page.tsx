import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ImageToPdfPage } from '@/components/tool/ImageToPdfPage'

export const metadata: Metadata = {
  title: 'Image to PDF Converter | Free JPG, PNG & WebP to PDF',
  description:
    'Convert JPG, PNG, and WebP images to PDF for free. Combine multiple images into one PDF. All processing happens in your browser — no server upload.',
  alternates: {
    canonical: 'https://fileconv.app/en/tools/pdf/images-to-pdf/',
    languages: {
      ja: 'https://fileconv.app/tools/pdf/images-to-pdf/',
      en: 'https://fileconv.app/en/tools/pdf/images-to-pdf/',
      'x-default': 'https://fileconv.app/tools/pdf/images-to-pdf/',
    },
  },
}

export default function ImagesToPdfRoutePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  setRequestLocale(locale)
  return <ImageToPdfPage />
}
