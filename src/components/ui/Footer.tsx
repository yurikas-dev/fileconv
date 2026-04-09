import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

type Props = { locale: string }

export async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'footer' })
  const showBlog = locale !== 'en' // 英語ブログ未対応のため英語時は非表示

  return (
    <footer className="border-t border-gray-100 bg-white mt-10">
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} {t('tagline')}
        </p>
        <nav className="flex gap-4">
          {showBlog && (
            <Link href="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {t('blog')}
            </Link>
          )}
          <Link href={locale === 'en' ? '/en/privacy' : '/privacy'} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            {t('privacy')}
          </Link>
          <Link href={locale === 'en' ? '/en/contact' : '/contact'} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            {t('contact')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
