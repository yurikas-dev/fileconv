import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL ?? 'https://fileconv.app'),
  title: {
    default: 'FileConv｜無料でHEICをJPG・PNGに変換',
    template: '%s｜FileConv',
  },
  description: 'iPhoneのHEIC写真を無料でJPG・PNGに変換。ファイルはブラウザ内で処理されるのでサーバーに送信されず安心。複数ファイルの一括変換にも対応。',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FileConv' }],
  },
  robots: { index: true, follow: true },
}

// html/body のみ。Header・Footer は各ロケールのレイアウトで管理する
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5149584959732751"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {children}
        <GoogleAnalytics gaId="G-ZTC9TEMHYV" />
      </body>
    </html>
  )
}
