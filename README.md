Free web tool to convert iPhone HEIC photos to JPG/PNG.  
All files are processed entirely in your browser — nothing is sent to any server.

iPhoneの写真（HEIC）をJPG・PNGに変換する無料Webツール。  
ファイルはすべてブラウザ内で処理され、サーバーには送信されません。

🌐 **Live:** [fileconv.app](https://fileconv.app)

---

## Why Browser-Only? / なぜブラウザ処理にしたのか

HEIC files often contain sensitive EXIF data — GPS coordinates, timestamps, and device info.  
Uploading them to a server creates unnecessary privacy risks and infrastructure costs.  
By processing everything client-side with WebAssembly-capable libraries, FileConv is:

- **Free to run** — no server, no storage costs
- **Private by design** — your photos never leave your device
- **Fast** — no upload/download round-trip

HEICファイルにはGPS・日時・機種情報などのプライバシーに関わるEXIFデータが含まれます。  
サーバーへのアップロードはプライバシーリスクとインフラコストを生みます。  
クライアントサイド処理にすることで：

- **運営コストゼロ** — サーバー・ストレージ不要
- **プライバシー保護** — 写真がデバイスの外に出ない
- **高速** — アップロード待ちなし

---

## Features / 機能一覧

| Feature             | Details                                                                        |
| ------------------- | ------------------------------------------------------------------------------ |
| 📷 HEIC → JPG / PNG | Batch conversion / 複数ファイル一括変換                                        |
| 🎚️ Quality control  | High (0.95) / Standard (0.80) / Light (0.60) — JPG only                        |
| 🔒 EXIF removal     | Strips GPS, timestamp, device info / GPS・日時・機種情報を削除（デフォルトON） |
| 🖱️ Drag & Drop      | Supported / ドラッグ&ドロップ対応                                              |
| 💸 Monetization     | Google AdSense + SEO blog / AdSense + SEOブログによる収益化                    |

---

## Screenshots / スクリーンショット

| Converter Tool | Blog |
| -------------- | ---- |
| converter      | blog |

---

## Tech Stack / 技術スタック

| Category        | Library                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| Framework       | Next.js 14 (App Router)                                                          |
| Language        | TypeScript                                                                       |
| Styling         | Tailwind CSS                                                                     |
| i18n            | [next-intl](https://next-intl-docs.vercel.app/) v4 (JA `/` · EN `/en`)           |
| HEIC conversion | [heic2any](https://github.com/alexcorvi/heic2any) (browser-only, dynamic import) |
| EXIF removal    | [piexifjs](https://github.com/hMatoba/piexifjs) (browser-only, dynamic import)   |
| Blog            | next-mdx-remote + gray-matter                                                    |
| Hosting         | Vercel                                                                           |

---

## Project Structure / プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx              # Root layout (html/body only) / ルートレイアウト
│   ├── globals.css
│   ├── sitemap.ts              # Auto-generated sitemap / サイトマップ自動生成
│   ├── robots.ts               # robots.txt
│   ├── (ja)/                   # Route group for Japanese (URL unchanged) / 日本語用ルートグループ（URLに影響しない）
│   │   ├── layout.tsx          # JA layout with Header/Footer / 日本語レイアウト
│   │   ├── page.tsx            # Top page / トップページ (/)
│   │   ├── blog/
│   │   │   ├── page.tsx        # Article list / ブログ一覧
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Article page / 記事ページ
│   │   ├── privacy/
│   │   │   └── page.tsx        # Privacy policy / プライバシーポリシー
│   │   └── contact/
│   │       └── page.tsx        # Contact / お問い合わせ
│   └── [locale]/               # English and other locales / 英語など他言語
│       ├── layout.tsx          # Locale layout with Header/Footer
│       ├── page.tsx            # Top page / トップページ (/en)
│       ├── privacy/
│       │   └── page.tsx        # Privacy policy (/en/privacy)
│       └── contact/
│           └── page.tsx        # Contact (/en/contact)
├── components/
│   ├── tool/
│   │   ├── ConverterPage.tsx   # Shared page component (Server) / 共通ページコンポーネント
│   │   ├── ConverterTool.tsx   # Converter core (Client Component) / 変換ツール本体
│   │   ├── HowItWorks.tsx      # How it works section / 仕組みの説明
│   │   └── Faq.tsx             # FAQ
│   └── ui/
│       ├── Header.tsx          # Locale-aware header / 多言語対応ヘッダー
│       ├── Footer.tsx          # Locale-aware footer / 多言語対応フッター
│       └── LangSwitcher.tsx    # JA / EN language switcher / 言語切り替え
├── i18n/
│   ├── routing.ts              # next-intl routing config / ルーティング設定
│   └── request.ts              # next-intl server config / サーバー設定
├── lib/
│   └── blog.ts                 # MDX file loader utility / MDXファイル読み込みユーティリティ
└── types/
    └── lucide-react.d.ts       # Type declarations / 型定義

messages/
├── ja.json                     # Japanese translations / 日本語テキスト
└── en.json                     # English translations / 英語テキスト

content/
└── blog/
    └── *.mdx                   # ← Add blog articles here / ブログ記事を追加
```

---

## Deployment / デプロイ

Hosted on [Vercel](https://vercel.com).  
Set `BASE_URL=https://fileconv.app` in environment variables before deploying.

---

## SEO Features / SEO対応済み機能

- ✅ `<title>` / `<meta description>` optimization / 最適化
- ✅ JSON-LD structured data (WebApplication / Article) / 構造化データ
- ✅ OGP / Twitter Card
- ✅ Auto-generated sitemap (`/sitemap.xml`) / サイトマップ自動生成
- ✅ robots.txt (`/robots.txt`)
- ✅ `datePublished` per article (for Google Discover) / 記事ごとのdatePublished
