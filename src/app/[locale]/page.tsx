import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { HomePage } from '@/components/home/HomePage'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function LocaleHomePage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  return <HomePage locale={locale} />
}
