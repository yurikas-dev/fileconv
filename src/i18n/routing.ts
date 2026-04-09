import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  localePrefix: 'as-needed', // /  → 日本語, /en → 英語
})
