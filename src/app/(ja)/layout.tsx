import { setRequestLocale } from 'next-intl/server'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'

export default function JaLayout({ children }: { children: React.ReactNode }) {
  setRequestLocale('ja')
  return (
    <>
      <Header locale="ja" />
      <main className="flex-1">{children}</main>
      <Footer locale="ja" />
    </>
  )
}
