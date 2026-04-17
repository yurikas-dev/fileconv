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

  const jaPathFinal = isBlog
    ? isEn ? `/blog${pathname.slice('/en/blog'.length) || ''}` : pathname
    : jaPath
  const enPathFinal = isBlog
    ? isEn ? pathname : `/en/blog${pathname.slice('/blog'.length)}`
    : enPath

  return (
    <div className="flex items-center gap-1 text-gray-400">
      <Globe className="w-3.5 h-3.5" />
      <Link
        href={jaPathFinal}
        className={`text-xs font-semibold px-1 transition-colors ${
          !isEn ? 'text-brand-600' : 'hover:text-gray-600'
        }`}
      >
        JA
      </Link>
      <span className="text-gray-200 text-xs">|</span>
      <Link
        href={enPathFinal}
        className={`text-xs font-semibold px-1 transition-colors ${
          isEn ? 'text-brand-600' : 'hover:text-gray-600'
        }`}
      >
        EN
      </Link>
    </div>
  )
}
