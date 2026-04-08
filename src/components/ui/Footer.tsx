import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-10">
      <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} FileConv — ファイルはサーバーに送信されません
        </p>
        <nav className="flex gap-4">
          <Link href="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">ブログ</Link>
          <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">プライバシー</Link>
        </nav>
      </div>
    </footer>
  )
}
