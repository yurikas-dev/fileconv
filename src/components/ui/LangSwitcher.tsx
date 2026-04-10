'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'

export function LangSwitcher() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')

  const jaPath = isEn ? pathname.slice(3) || '/' : pathname
  const enPath = isEn ? pathname : '/en' + (pathname === '/' ? '' : pathname)

  const isBlog = pathname.startsWith('/blog') || pathname.startsWith('/en/blog')
  if (isBlog) return null

  return (
    <div className="flex items-center gap-1 text-gray-400">
      <Globe className="w-3.5 h-3.5" />
      <Link
        href={jaPath}
        className={`text-xs font-semibold px-1 transition-colors ${
          !isEn ? 'text-brand-600' : 'hover:text-gray-600'
        }`}
      >
        JA
      </Link>
      <span className="text-gray-200 text-xs">|</span>
      <Link
        href={enPath}
        className={`text-xs font-semibold px-1 transition-colors ${
          isEn ? 'text-brand-600' : 'hover:text-gray-600'
        }`}
      >
        EN
      </Link>
    </div>
  )
}
