import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://heic-converter.jp/sitemap.xml', // 本番ドメインに変更
  }
}
