import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HomePage } from '@/components/home/HomePage'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function RootPage() {
  return <HomePage locale="ja" />
}
