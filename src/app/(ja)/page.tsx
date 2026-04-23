import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { HomePage } from '@/components/home/HomePage'

export async function generateMetadata(): Promise<Metadata> {
  setRequestLocale('ja')
  const t = await getTranslations('meta')
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function RootPage() {
  setRequestLocale('ja')
  return <HomePage locale="ja" />
}
