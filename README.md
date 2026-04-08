# HEIC変換ツール

iPhoneの写真（HEIC）をJPG・PNGに変換する無料Webツール。  
ファイルはすべてブラウザ内で処理され、サーバーには送信されません。

## セットアップ

```bash
npm install
npm run dev
```

## プロジェクト構成

```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（SEO メタデータ）
│   ├── page.tsx            # トップページ（変換ツール）
│   ├── sitemap.ts          # サイトマップ自動生成
│   ├── robots.ts           # robots.txt
│   └── blog/
│       ├── page.tsx        # ブログ一覧
│       └── [slug]/
│           └── page.tsx    # 記事ページ
├── components/
│   ├── tool/
│   │   ├── ConverterTool.tsx   # 変換ツール本体（Client Component）
│   │   ├── HowItWorks.tsx      # 仕組みの説明
│   │   └── Faq.tsx             # FAQ
│   └── ui/
│       ├── Header.tsx
│       └── Footer.tsx
└── lib/
    └── blog.ts             # MDXファイル読み込みユーティリティ

content/
└── blog/
    └── *.mdx               # ← ここにブログ記事を追加
```

## ブログ記事の追加

`content/blog/` に `.mdx` ファイルを追加するだけです。

```mdx
---
title: 記事タイトル
description: 記事の説明（SEOのmeta descriptionに使用）
date: "2024-06-01"
tags: ["HEIC", "画像フォーマット"]
---

## 見出し

本文...
```

## 本番デプロイ（Vercel）

1. GitHubにpush
2. Vercelでリポジトリをインポート
3. `BASE_URL` を実際のドメインに変更（`sitemap.ts`, `robots.ts`, `layout.tsx`）
4. Google Search ConsoleでURLを登録

## SEO対応済み機能

- ✅ `<title>` / `<meta description>` の最適化
- ✅ JSON-LD構造化データ（WebApplication / Article）
- ✅ OGP / Twitter Card
- ✅ サイトマップ自動生成（`/sitemap.xml`）
- ✅ robots.txt（`/robots.txt`）
- ✅ 記事ごとのdatePublished（Google Discover対策）
