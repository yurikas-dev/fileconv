'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

type SubItem = {
  label: string
  href: string
  comingSoon?: boolean
}

type NavItem = {
  label: string
  subItems: SubItem[]
}

type Props = {
  locale: string
}

export function NavMenu({ locale }: Props) {
  const pathname = usePathname()
  const prefix = locale === 'en' ? '/en' : ''
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const navItems: NavItem[] = [
    {
      label: locale === 'en' ? 'Converter' : '変換',
      subItems: [
        {
          label: locale === 'en' ? 'HEIC → JPG / PNG' : 'HEIC → JPG / PNG',
          href: `${prefix}/tools/converter/heic-to-jpg`,
        },
        {
          label: locale === 'en' ? 'JPG → PNG / WebP' : 'JPG → PNG / WebP',
          href: `${prefix}/tools/converter/jpg-converter`,
        },
        {
          label: locale === 'en' ? 'PNG → JPG / WebP' : 'PNG → JPG / WebP',
          href: `${prefix}/tools/converter/png-converter`,
        },
      ],
    },
    {
      label: locale === 'en' ? 'Compressor' : '圧縮',
      subItems: [
        {
          label: locale === 'en' ? 'Image Compressor' : '画像圧縮',
          href: '#',
          comingSoon: true,
        },
      ],
    },
    {
      label: locale === 'en' ? 'BG Remover' : '背景削除',
      subItems: [
        {
          label: locale === 'en' ? 'Background Remover' : '背景削除',
          href: '#',
          comingSoon: true,
        },
      ],
    },
  ]

  // メニュー外クリックで閉じる
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="flex items-center gap-1">
      {navItems.map(item => {
        const isOpen = openMenu === item.label
        const isActive = item.subItems.some(s => !s.comingSoon && pathname === s.href)

        return (
          <div key={item.label} className="relative">
            <button
              onClick={() => setOpenMenu(isOpen ? null : item.label)}
              className={`flex items-center gap-1 text-sm px-2.5 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? 'text-brand-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {item.label}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-50">
                {item.subItems.map(sub => (
                  sub.comingSoon ? (
                    <div
                      key={sub.label}
                      className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 cursor-not-allowed"
                    >
                      <span>{sub.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                        {locale === 'en' ? 'Soon' : '近日'}
                      </span>
                    </div>
                  ) : (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setOpenMenu(null)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === sub.href
                          ? 'text-brand-600 font-semibold bg-brand-50'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
