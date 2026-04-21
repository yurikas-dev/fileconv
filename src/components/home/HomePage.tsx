import { getTranslations, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import Link from 'next/link'
import { ArrowRight, ImageIcon, FileImage, Layers, Globe, Music } from 'lucide-react'
import { HowItWorks } from '@/components/tool/HowItWorks'
import { Faq } from '@/components/tool/Faq'

type ToolCard = {
  href: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  desc: string
  tags: string[]
  comingSoon?: boolean
}

type HomePageProps = {
  locale: string
}

export async function HomePage({ locale }: HomePageProps) {
  const [t, messages] = await Promise.all([
    getTranslations('home'),
    getMessages(),
  ])

  const prefix = locale === 'en' ? '/en' : ''

  const tools: ToolCard[] = [
    {
      href: `${prefix}/tools/converter/heic-to-jpg`,
      icon: FileImage,
      iconColor: 'text-brand-600',
      iconBg: 'bg-brand-50',
      title: locale === 'en' ? 'HEIC → JPG / PNG' : 'HEIC → JPG / PNG 変換',
      desc: locale === 'en'
        ? 'Convert iPhone HEIC photos to JPG or PNG.'
        : 'iPhoneのHEIC写真をJPGやPNGに変換します。',
      tags: ['HEIC', 'JPG', 'PNG'],
    },
    {
      href: `${prefix}/tools/converter/jpg-converter`,
      icon: ImageIcon,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
      title: locale === 'en' ? 'JPG Converter' : 'JPG 変換ツール',
      desc: locale === 'en'
        ? 'Convert JPG images to PNG or WebP.'
        : 'JPG画像をPNGやWebPに変換します。',
      tags: ['JPG', 'PNG', 'WebP'],
    },
    {
      href: `${prefix}/tools/converter/png-converter`,
      icon: Layers,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      title: locale === 'en' ? 'PNG Converter' : 'PNG 変換ツール',
      desc: locale === 'en'
        ? 'Convert PNG images to JPG or WebP.'
        : 'PNG画像をJPGやWebPに変換します。',
      tags: ['PNG', 'JPG', 'WebP'],
    },
    {
      href: `${prefix}/tools/converter/webp-converter`,
      icon: Globe,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50',
      title: locale === 'en' ? 'WebP Converter' : 'WebP 変換ツール',
      desc: locale === 'en'
        ? 'Convert WebP images to JPG or PNG.'
        : 'WebP画像をJPGやPNGに変換します。',
      tags: ['WebP', 'JPG', 'PNG'],
    },
    {
      href: `${prefix}/tools/audio/to-mp3`,
      icon: Music,
      iconColor: 'text-pink-600',
      iconBg: 'bg-pink-50',
      title: locale === 'en' ? 'Audio to MP3' : '音声 → MP3 変換',
      desc: locale === 'en'
        ? 'Convert AAC, WAV, FLAC, M4A and more to MP3.'
        : 'AAC・WAV・FLAC・M4AなどをMP3に変換します。',
      tags: ['MP3', 'AAC', 'WAV', 'FLAC'],
    },
  ]

  const comingSoonTools = [
    {
      title: locale === 'en' ? 'Image Compressor' : '画像圧縮',
      desc: locale === 'en' ? 'Reduce file size without losing quality.' : '画質を保ちながらファイルサイズを削減。',
    },
    {
      title: locale === 'en' ? 'Background Remover' : '背景削除',
      desc: locale === 'en' ? 'Remove image backgrounds automatically.' : '画像の背景を自動で削除。',
    },
  ]

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block" />
            {t('badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {t('h1')}
            <span className="hidden sm:inline"> - </span>
            <br className="sm:hidden" />
            {t('h1Sub')}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-2">
            {t('tagline')}
          </p>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            {t('description')}
          </p>
        </section>

        {/* ツールカード */}
        <section className="mb-14">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{t('toolsTitle')}</h2>
          <div className="flex flex-col gap-3">
            {tools.map(({ href, icon: Icon, iconColor, iconBg, title, desc, tags }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-1">{title}</p>
                  <p className="text-sm text-gray-500 mb-2">{desc}</p>
                  <div className="flex gap-1.5">
                    {tags.map(tag => (
                      <span key={tag} className="text-xs font-mono font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 transition-colors flex-shrink-0" />
              </Link>
            ))}

            {/* 近日公開 */}
            {comingSoonTools.map(({ title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 opacity-60 cursor-not-allowed"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-500">{title}</p>
                    <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                      {t('comingSoon')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HowItWorks />
        <Faq />
      </div>
    </NextIntlClientProvider>
  )
}
