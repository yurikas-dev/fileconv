import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { LangSwitcher } from './LangSwitcher'

type Props = { locale: string }

export async function Header({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'header' })
  const showBlog = locale !== 'en' // 英語ブログ未対応のため英語時は非表示

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={locale === 'en' ? '/en' : '/'} className="flex items-center hover:opacity-80 transition-opacity">
          <Image src="/logo-header.svg" alt="FileConv" width={155} height={39} priority />
        </Link>
        <nav className="flex items-center gap-4">
          {showBlog && (
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
              {t('blog')}
            </Link>
          )}
          <LangSwitcher />
        </nav>
      </div>
    </header>
  )
}
