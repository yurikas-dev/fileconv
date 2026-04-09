import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  setRequestLocale(locale)
  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </>
  )
}
