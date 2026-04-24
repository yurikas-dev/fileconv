import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FileConvについて',
  description:
    'FileConv は、画像・音声ファイルをブラウザ内で変換できる無料ツールです。ファイルはサーバーに送信されず、プライバシーを守りながら変換できます。',
};

export default function AboutPage() {
  setRequestLocale('ja');
  return (
    <div className='max-w-2xl mx-auto px-4 py-12'>
      <h1 className='text-2xl font-bold text-gray-900 mb-10'>
        FileConvについて
      </h1>

      <div className='space-y-10 text-sm text-gray-700 leading-relaxed'>
        <section>
          <h2 className='text-base font-semibold text-gray-900 mb-3'>
            このサービスについて
          </h2>
          <p>
            FileConv
            は、画像・音声ファイルをブラウザ内で変換できる無料のオンラインツールです。
            HEIC・JPG・PNG・WebP の相互変換や、各種音声ファイルの MP3
            変換に対応しています。
          </p>
          <p className='mt-3'>
            最大の特徴は、
            <strong className='text-gray-900'>
              ファイルがサーバーに送信されない
            </strong>
            点です。
            変換処理はすべてお使いのブラウザ内で完結するため、個人の写真や音声データが外部に漏れる心配がありません。
            登録不要・完全無料でご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className='text-base font-semibold text-gray-900 mb-3'>
            作った理由
          </h2>
          <p>
            iPhoneで撮影した HEIC 写真を Windows や Android で開こうとしたとき、
            ファイルをアップロードすることへの不安から、どの変換サービスを使うべきか悩んだことがきっかけです。
          </p>
          <p className='mt-3'>
            写真には撮影場所や日時など個人情報が含まれる場合があります。
            そこで、ファイルを一切サーバーに送らずブラウザだけで変換できるツールを作ることにしました。
          </p>
        </section>

        <section>
          <h2 className='text-base font-semibold text-gray-900 mb-3'>
            対応ツール
          </h2>
          <ul className='space-y-2'>
            <li>
              <Link
                href='/tools/converter/heic-to-jpg'
                className='text-brand-600 hover:underline font-medium'
              >
                HEIC → JPG / PNG 変換
              </Link>
              <span className='text-gray-400 ml-2'>
                iPhoneの写真をJPGやPNGに変換
              </span>
            </li>
            <li>
              <Link
                href='/tools/converter/jpg-converter'
                className='text-brand-600 hover:underline font-medium'
              >
                JPG 変換ツール
              </Link>
              <span className='text-gray-400 ml-2'>JPGをPNG・WebPに変換</span>
            </li>
            <li>
              <Link
                href='/tools/converter/png-converter'
                className='text-brand-600 hover:underline font-medium'
              >
                PNG 変換ツール
              </Link>
              <span className='text-gray-400 ml-2'>PNGをJPG・WebPに変換</span>
            </li>
            <li>
              <Link
                href='/tools/converter/webp-converter'
                className='text-brand-600 hover:underline font-medium'
              >
                WebP 変換ツール
              </Link>
              <span className='text-gray-400 ml-2'>WebPをJPG・PNGに変換</span>
            </li>
            <li>
              <Link
                href='/tools/audio/to-mp3'
                className='text-brand-600 hover:underline font-medium'
              >
                音声 → MP3 変換
              </Link>
              <span className='text-gray-400 ml-2'>
                AAC・WAV・FLAC・M4AをMP3に変換
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-base font-semibold text-gray-900 mb-3'>
            プライバシーへの取り組み
          </h2>
          <p>
            FileConv
            では、ユーザーのファイルをサーバーに収集・保存することは一切ありません。
            変換処理は JavaScript ライブラリ（heic2any・lamejs）とブラウザの標準
            API のみを使用して、 お使いのデバイスのメモリ内で完結します。
          </p>
          <p className='mt-3'>
            詳しくは
            <Link
              href='/privacy'
              className='text-brand-600 hover:underline mx-1'
            >
              プライバシーポリシー
            </Link>
            をご確認ください。
          </p>
        </section>

        <section>
          <h2 className='text-base font-semibold text-gray-900 mb-3'>
            お問い合わせ
          </h2>
          <p>
            ご意見・不具合のご報告は
            <Link
              href='/contact'
              className='text-brand-600 hover:underline mx-1'
            >
              お問い合わせフォーム
            </Link>
            からお気軽にどうぞ。
          </p>
        </section>
      </div>
    </div>
  );
}
