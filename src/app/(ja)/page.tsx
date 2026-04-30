import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { HomePage } from '@/components/home/HomePage'

export async function generateMetadata(): Promise<Metadata> {
  setRequestLocale('ja')
  const t = await getTranslations('meta')
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://fileconv.app/',
      languages: {
        'ja': 'https://fileconv.app/',
        'en': 'https://fileconv.app/en',
        'x-default': 'https://fileconv.app/en',
      },
    },
  }
}

export default function RootPage() {
  setRequestLocale('ja')
  return <HomePage locale="ja" />
}
