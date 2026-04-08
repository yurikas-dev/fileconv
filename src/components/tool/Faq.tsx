'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'HEICとは何ですか？',
    a: 'HEIC（High Efficiency Image Container）はAppleが採用している画像フォーマットです。iOS 11以降のiPhoneではデフォルトでHEIC形式で写真が保存されます。JPGと比べてほぼ同画質で約半分のファイルサイズを実現できますが、WindowsやAndroidでは標準では開けません。',
  },
  {
    q: 'なぜiPhoneはHEIC形式なのですか？',
    a: 'ストレージ節約のためです。HEICはJPGの約半分のサイズで同等の画質を維持できます。写真を大量に撮るスマートフォンには理想的なフォーマットですが、互換性の問題からJPGに変換したいケースが多く生じます。',
  },
  {
    q: '本当にサーバーに送信されませんか？',
    a: 'はい、確実に送信されません。このツールはheic2anyというJavaScriptライブラリを使用し、変換処理はすべてブラウザのメモリ内で行われます。ブラウザの開発者ツール（F12）のNetworkタブを開いた状態で変換を試みると、ファイルの送信が一切記録されないことで確認できます。',
  },
  {
    q: 'EXIF情報とは何ですか？',
    a: 'EXIF（Exchangeable Image File Format）は写真に埋め込まれたメタデータです。撮影日時・GPS位置情報・カメラ機種・ISO感度などが含まれます。SNSに写真を投稿すると、EXIFから自宅の住所が特定されるリスクがあるため、削除することをおすすめします。',
  },
  {
    q: 'JPGとPNGどちらを選べばいいですか？',
    a: '写真の場合はJPG（高画質設定）がおすすめです。ファイルサイズが小さく、Webや印刷に適しています。透過が必要な場合や文字・図形が多い画像はPNGが向いています。',
  },
  {
    q: 'Live Photoも変換可能ですか？',
    a: 'Live Photoの場合、静止画部分のみJPG/PNGに変換されます。動画部分（動き）は変換されません。',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className='mb-10'>
      <h2 className='text-xl font-bold text-gray-900 mb-6'>よくある質問</h2>
      <div className='flex flex-col gap-2'>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className='border border-gray-200 rounded-xl overflow-hidden bg-white'
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className='w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors'
            >
              <span className='text-sm font-medium text-gray-800 pr-4'>
                {faq.q}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className='px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4'>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
