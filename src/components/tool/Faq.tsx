'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type FaqItem = { q: string; a: string; link?: string; linkText?: string }

type Props = { namespace?: string }

export function Faq({ namespace = 'faq' }: Props) {
  const t = useTranslations(namespace)
  const [open, setOpen] = useState<number | null>(null)
  const items = t.raw('items') as FaqItem[]

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{t('title')}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800 pr-4">{item.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {item.a}
                {item.link && item.linkText && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 mt-3 text-brand-600 hover:text-brand-700 font-medium transition-colors"
                  >
                    {item.linkText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
