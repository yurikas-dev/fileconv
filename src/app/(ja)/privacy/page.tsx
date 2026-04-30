import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'プライバシーポリシー・利用規約',
  description: 'FileConv のプライバシーポリシーと利用規約。ファイルはすべてブラウザ内で処理され、サーバーに送信されません。',
}

export default function PrivacyPage() {
  setRequestLocale('ja')
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">プライバシーポリシー・利用規約</h1>
      <p className="text-xs text-gray-400 mb-10">最終更新：2026年4月29日</p>

      <div className="space-y-10 text-sm text-gray-700 leading-relaxed">

        {/* ── プライバシーポリシー ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">プライバシーポリシー</h2>
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">ファイルの取り扱い</h3>
              <p>
                FileConv にアップロードされたファイルは、すべてお使いのブラウザ内で処理されます。
                ファイルはサーバーに送信されることはなく、当サービスがファイルの内容を取得・保存することは一切ありません。
              </p>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">アクセス解析</h3>
              <p>
                当サービスでは、サービス改善を目的として Google アナリティクス（Google Analytics 4）を使用しています。
                Google アナリティクスは Cookie を使用し、ページビューや利用状況などの匿名データを収集します。
                収集されるデータに個人を特定できる情報は含まれません。
                詳細は{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                  Google のプライバシーポリシー
                </a>{' '}をご確認ください。
              </p>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">広告</h3>
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
              <h3 className="text-base font-semibold text-gray-900 mb-2">Cookie</h3>
              <p>
                当サービスでは、言語設定の保持および Google アナリティクス・Google AdSense の機能提供のために Cookie を使用する場合があります。
                ブラウザの設定から Cookie を無効にすることができますが、一部の機能が正しく動作しない場合があります。
              </p>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">お問い合わせフォームの個人情報</h3>
              <p>
                お問い合わせフォームでご入力いただいたお名前・メールアドレス等の個人情報は、お問い合わせへの返信目的にのみ使用し、第三者への提供は行いません。
              </p>
            </section>
          </div>
        </div>

        {/* ── 利用規約 ── */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">利用規約</h2>
          <div className="space-y-6">
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">サービスの利用</h3>
              <p>
                FileConv は無料でご利用いただけます。当サービスを利用した結果生じたいかなる損害についても、運営者は責任を負いません。
                変換結果の品質はブラウザの処理能力や対象ファイルの状態に依存するため、すべてのファイルで変換が保証されるわけではありません。
              </p>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">禁止事項</h3>
              <p>以下の行為を禁止します。</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>法令または公序良俗に反する目的での利用</li>
                <li>当サービスへの過度な負荷をかける行為</li>
                <li>当サービスのコンテンツを無断で複製・転載する行為</li>
                <li>その他、運営者が不適切と判断する行為</li>
              </ul>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">免責事項</h3>
              <p>
                当サービスはブラウザの処理能力に依存するため、環境によっては一部の機能が正常に動作しない場合があります。
                また、サービスの内容は予告なく変更・停止される場合があります。あらかじめご了承ください。
              </p>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">知的財産権</h3>
              <p>
                当サービスのロゴ・デザイン・コンテンツに関する知的財産権は運営者に帰属します。
                ユーザーが変換したファイルの著作権はユーザー自身に帰属します。
              </p>
            </section>
            <section>
              <h3 className="text-base font-semibold text-gray-900 mb-2">規約の変更</h3>
              <p>
                本規約は予告なく変更される場合があります。変更後も当サービスを利用された場合は、変更後の規約に同意したものとみなします。
              </p>
            </section>
          </div>
        </div>

        {/* ── お問い合わせ ── */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">お問い合わせ</h2>
          <p>
            本ポリシー・規約に関するご質問は、
            <a href="/contact" className="text-brand-600 hover:underline mx-1">お問い合わせページ</a>
            からご連絡ください。
          </p>
        </section>

      </div>
    </div>
  )
}
