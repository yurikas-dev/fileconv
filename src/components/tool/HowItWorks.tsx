import { Monitor, Server, ShieldCheck, Zap } from 'lucide-react'

export function HowItWorks() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-gray-900 mb-2">このツールが安全な理由</h2>
      <p className="text-sm text-gray-500 mb-6">「アップロード不要」とはどういう意味か、仕組みをわかりやすく説明します。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="border border-red-100 bg-red-50/50 rounded-xl p-4">
          <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3">一般的な変換サービス</p>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
              <Monitor className="w-6 h-6 text-gray-500" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-red-300" />
              <div className="text-xs text-red-500 font-medium">ファイルを送信 ↑↓</div>
              <div className="w-px h-4 bg-red-300" />
            </div>
            <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              サーバーで変換 → 返却<br />
              <span className="text-red-500">写真データが他者のサーバーに残る可能性あり</span>
            </p>
          </div>
        </div>
        <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-4">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-3">このツール（FileConv）</p>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 bg-white border border-teal-200 rounded-xl flex items-center justify-center">
              <Monitor className="w-6 h-6 text-teal-500" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-teal-300" />
              <div className="text-xs text-teal-600 font-medium">ブラウザ内で完結 ✓</div>
              <div className="w-px h-4 bg-teal-300" />
            </div>
            <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center opacity-30">
              <Server className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              サーバーに到達しない<br />
              <span className="text-teal-600">ネットワーク通信ゼロで変換</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: ShieldCheck, title: 'プライバシー安全', desc: 'ファイルはあなたのPCのメモリ内で処理。外部には一切送信されません。', color: 'text-teal-600', bg: 'bg-teal-50' },
          { icon: Zap,         title: '高速',             desc: 'ネットワーク転送がないため、回線速度に関わらず高速に変換できます。', color: 'text-brand-600', bg: 'bg-brand-50' },
          { icon: Monitor,     title: 'オフライン対応',   desc: 'ページ読み込み後はネット接続がなくても変換可能です。',             color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(({ icon: Icon, title, desc, color, bg }) => (
          <div key={title} className="bg-white border border-gray-100 rounded-xl p-4">
            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-1">{title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
