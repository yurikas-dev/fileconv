<img src="public/logo-mono.svg" alt="FileConv" width="300" />

Free browser-based file converter. Convert images (HEIC, JPG, PNG, WebP) and audio files (to MP3) — entirely in your browser, with no file uploads.

**Live site:** [fileconv.app](https://fileconv.app)

## Why Browser-Only?

HEIC files often contain sensitive EXIF data — GPS coordinates, timestamps, and device info.  
Uploading them to a server creates unnecessary privacy risks and infrastructure costs.  
By processing everything client-side, FileConv is:

- **Free to run** — no server, no storage costs
- **Private by design** — your files never leave your device
- **Fast** — no upload/download round-trip

## Features

- **HEIC → JPG / PNG** — Convert iPhone photos to widely compatible formats
- **JPG → PNG / WebP** — Re-export with format or quality changes
- **PNG → JPG / WebP** — Compress or convert transparent images
- **WebP → JPG / PNG** — Convert modern format to universals
- **Audio → MP3** — Convert AAC, WAV, FLAC, M4A to MP3 via Web Audio API + lamejs
- **Quality selection** — High (0.95) / Standard (0.80) / Light (0.60) for JPG output
- **EXIF removal** — Strip GPS, timestamp, and camera metadata (default ON for HEIC→JPG)
- **Batch conversion** — Multiple files at once with Save All (ZIP download)
- **Drag & drop** — Drop files directly onto the tool
- **i18n** — Japanese and English (next-intl, `localePrefix: 'as-needed'`)
- **SEO blog** — MDX articles in Japanese and English (8 articles each)

## Tech Stack

|                  |                                  |
| ---------------- | -------------------------------- |
| Framework        | Next.js 14 (App Router)          |
| Language         | TypeScript                       |
| Styling          | Tailwind CSS                     |
| i18n             | next-intl v4 (JA / EN)           |
| HEIC conversion  | heic2any                         |
| EXIF removal     | piexifjs                         |
| Audio conversion | Web Audio API + lamejs           |
| ZIP download     | jszip                            |
| Blog             | next-mdx-remote + gray-matter    |
| Hosting          | Cloudflare Pages (static export) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (html/body, AdSense)
│   ├── sitemap.ts                    # Auto-generated sitemap
│   ├── robots.ts
│   ├── (ja)/                         # Japanese routes (no prefix)
│   │   ├── page.tsx                  # Home /
│   │   ├── about/                    # /about
│   │   ├── blog/                     # /blog, /blog/[slug]
│   │   ├── privacy/
│   │   ├── contact/
│   │   └── tools/
│   │       ├── converter/            # /tools/converter/[tool]
│   │       └── audio/to-mp3/        # /tools/audio/to-mp3
│   └── [locale]/                     # English routes (/en/...)
│       ├── page.tsx
│       ├── about/                    # /en/about
│       ├── blog/                     # /en/blog, /en/blog/[slug]
│       ├── privacy/
│       ├── contact/
│       └── tools/
│           ├── converter/
│           └── audio/to-mp3/
├── components/
│   ├── home/
│   │   └── HomePage.tsx              # Landing page with tool cards
│   ├── tool/
│   │   ├── ConverterPage.tsx         # Server wrapper for image converter
│   │   ├── ConverterTool.tsx         # Client component — image conversion logic
│   │   ├── AudioConverterPage.tsx    # Server wrapper for audio converter
│   │   ├── AudioConverterTool.tsx    # Client component — audio conversion logic
│   │   ├── HowItWorks.tsx
│   │   └── Faq.tsx
│   └── ui/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── NavMenu.tsx               # Dropdown + mobile hamburger menu
│       ├── LangSwitcher.tsx
│       └── AdsenseScript.tsx
└── lib/
    └── blog.ts                       # MDX loader with locale support
```
