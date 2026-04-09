import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'FileConv のプライバシーポリシー。ファイルはすべてブラウザ内で処理され、サーバーに送信されません。',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">プライバシーポリシー</h1>
      <p className="text-xs text-gray-400 mb-10">最終更新：2026年4月</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">ファイルの取り扱い</h2>
          <p>
            FileConv にアップロードされたファイルは、すべてお使いのブラウザ内で処理されます。
            ファイルはサーバーに送信されることはなく、当サービスがファイルの内容を取得・保存することは一切ありません。
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">アクセス解析</h2>
          <p>
            当サービスでは、サービス改善を目的として Google アナリティクスを使用する場合があります。
            Google アナリティクスは Cookie を使用し、ページビューや利用状況などの匿名データを収集します。
            収集されるデータに個人を特定できる情報は含まれません。
            詳細は{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Google のプライバシーポリシー
            </a>{' '}をご確認ください。
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">広告</h2>
          <p>
            当サービスでは Google AdSense による広告を掲載する場合があります。
            Google AdSense は Cookie を使用して、ユーザーの興味に基づいた広告を表示することがあります。
            詳細は{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
              Google のプライバシーポリシー
            </a>{' '}をご確認ください。
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">Cookie</h2>
          <p>
            当サービスでは、言語設定の保持および Google アナリティクス・Google AdSense の機能提供のために Cookie を使用する場合があります。
            ブラウザの設定から Cookie を無効にすることができますが、一部の機能が正しく動作しない場合があります。
          </p>
        </section>
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">お問い合わせ</h2>
          <p>
            プライバシーに関するご質問は、
            <a href="/contact" className="text-brand-600 hover:underline">お問い合わせページ</a>
            からご連絡ください。
          </p>
        </section>
      </div>
    </div>
  )
}
