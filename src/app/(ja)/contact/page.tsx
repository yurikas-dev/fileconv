import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'FileConv へのお問い合わせはこちらから。',
  robots: { index: false },
}

const CONTACT_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfs5i9sBVMfU-LCYe_GfAgeXeFak-z3Qua6hL3YQEDbDxmySg/viewform'

export default function ContactPage() {
  setRequestLocale('ja')
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">お問い合わせ</h1>
      <p className="text-sm text-gray-400 mb-10">Contact</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 text-sm text-gray-700 leading-relaxed space-y-6">
        <p>
          FileConv に関するご質問・ご意見・不具合のご報告は、以下のフォームからお気軽にご連絡ください。
          サービスの改善に役立てるため、いただいたフィードバックはすべて確認しています。
        </p>

        <div className="space-y-3 bg-gray-50 rounded-xl p-4 text-gray-600">
          <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">よくあるお問い合わせ内容</p>
          <ul className="space-y-1.5">
            <li>・ 変換がうまくいかない・エラーが出る</li>
            <li>・ 対応してほしいファイル形式のリクエスト</li>
            <li>・ プライバシーポリシーや利用規約に関するご質問</li>
            <li>・ サービスの改善提案・ご意見</li>
          </ul>
        </div>

        <p className="text-gray-500">
          英語でのお問い合わせも同じフォームでお受けしています。<br />
          For inquiries in English, please use the same form below.
        </p>

        <div className="pt-2">
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            お問い合わせフォームを開く
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
          ※ 返信にお時間をいただく場合があります。通常2〜3営業日以内にご返信します。
        </p>
      </div>
    </div>
  )
}
