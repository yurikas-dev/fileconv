import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { ImageCompressorPage } from '@/components/tool/ImageCompressorPage'

type Props = { params: { locale: string } }

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  setRequestLocale(locale)
  return {
    title: 'Image Compressor — Compress JPG, PNG & WebP in Your Browser',
    description:
      'Reduce image file sizes for free. Adjust quality with a slider and see size reduction per file. Files are processed locally — never sent to a server.',
    alternates: {
      canonical: `https://fileconv.app/${locale}/tools/converter/image-compressor/`,
      languages: {
        ja: 'https://fileconv.app/tools/converter/image-compressor/',
        en: 'https://fileconv.app/en/tools/converter/image-compressor/',
        'x-default': 'https://fileconv.app/en/tools/converter/image-compressor/',
      },
    },
  }
}

export default function LocaleImageCompressorPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return <ImageCompressorPage />
}
