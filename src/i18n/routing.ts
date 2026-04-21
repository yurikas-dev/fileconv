import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  localePrefix: 'as-needed', // /  → Japanese, /en → English
  localeDetection: false, // disabled for automatic redirection via Accept-Language.
});
