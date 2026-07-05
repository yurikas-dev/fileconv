<img src="public/logo-mono.svg" alt="FileConv" width="300" />

Free browser-based file converter. Convert images (HEIC, JPG, PNG, WebP), audio files (to MP3), and images to PDF — entirely in your browser, with no file uploads.

**Live site:** [fileconv.app](https://fileconv.app/en/)

## Why Browser-Only?

HEIC files often contain sensitive EXIF data — GPS coordinates, timestamps, and device info.  
Uploading them to a server creates unnecessary privacy risks and infrastructure costs.  
By processing everything client-side, FileConv is:

- **Free to run** — no server, no storage costs
- **Private by design** — your files never leave your device
- **Fast** — no upload/download round-trip

## Features

### Image Conversion
- **HEIC → JPG / PNG** — Convert iPhone photos to widely compatible formats
- **JPG → PNG / WebP** — Re-export with format or quality changes
- **PNG → JPG / WebP** — Compress or convert transparent images
- **WebP → JPG / PNG** — Convert modern format to universals
- **Quality selection** — High (0.95) / Standard (0.80) / Light (0.60) for JPG output
- **EXIF removal** — Strip GPS, timestamp, and camera metadata (default ON for HEIC→JPG)
- **Batch conversion** — Multiple files at once with Save All (ZIP download)
- **Drag & drop** — Drop files directly onto the tool

### Image Compression
- **Image Compressor** — Reduce JPG, PNG, and WebP file sizes with a quality slider

### Audio Conversion
- **Audio → MP3** — Convert AAC, WAV, FLAC, M4A to MP3 via Web Audio API + lamejs

### PDF
- **Images → PDF** — Combine JPG, PNG, and WebP images into a single PDF (pdf-lib, browser-only)
- Page size options: A4, Letter, or original image size

### General
- **i18n** — Japanese and English (next-intl, `localePrefix: 'as-needed'`)
- **SEO blog** — MDX articles in Japanese and English (15 articles each)

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
| PDF creation     | pdf-lib                          |
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
│   │       ├── converter/            # heic-to-jpg, jpg-converter, png-converter,
│   │       │                         # webp-converter, image-compressor
│   │       ├── audio/to-mp3/         # /tools/audio/to-mp3
│   │       └── pdf/images-to-pdf/   # /tools/pdf/images-to-pdf
│   └── [locale]/                     # English routes (/en/...)
│       ├── page.tsx
│       ├── about/
│       ├── blog/
│       ├── privacy/
│       ├── contact/
│       └── tools/
│           ├── converter/
│           ├── audio/to-mp3/
│           └── pdf/images-to-pdf/
├── components/
│   ├── home/
│   │   └── HomePage.tsx              # Landing page with tool cards
│   ├── tool/
│   │   ├── ConverterPage.tsx         # Server wrapper for image converter
│   │   ├── ConverterTool.tsx         # Client component — image conversion logic
│   │   ├── AudioConverterPage.tsx    # Server wrapper for audio converter
│   │   ├── AudioConverterTool.tsx    # Client component — audio conversion logic
│   │   ├── ImageCompressorPage.tsx   # Server wrapper for image compressor
│   │   ├── ImageCompressorTool.tsx   # Client component — compression logic
│   │   ├── ImageToPdfPage.tsx        # Server wrapper for image to PDF
│   │   ├── ImageToPdfTool.tsx        # Client component — PDF creation logic
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
