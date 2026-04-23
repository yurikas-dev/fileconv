import { getTranslations, getMessages } from 'next-intl/server'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Clock, ArrowLeft, Tag } from 'lucide-react'
import type { Post } from '@/lib/blog'

type CtaConfig = { title: string; desc: string; href: string; btn: string }

type Props = {
  post: Post
  slug: string
  locale: string
}

export async function BlogPost({ post, slug, locale }: Props) {
  const [t, messages] = await Promise.all([
    getTranslations('blogPost'),
    getMessages(),
  ])

  const blogCta = messages.blogCta as Record<string, CtaConfig>
  const cta = blogCta[slug] ?? blogCta.default

  const blogListHref = locale === 'en' ? '/en/blog' : '/blog'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'FileConv' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href={blogListHref} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />{t('backLink')}
        </Link>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 text-xs text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{post.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {t('readingTime', { minutes: post.readingTime })}
            </span>
          </div>
        </header>
        <article className="prose-custom">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
        <div className="mt-12 p-6 bg-brand-50 border border-brand-100 rounded-2xl text-center">
          <p className="text-sm font-semibold text-gray-800 mb-2">{cta.title}</p>
          <p className="text-xs text-gray-500 mb-4">{cta.desc}</p>
          <Link href={cta.href} className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
            {cta.btn}
          </Link>
        </div>
      </div>
    </>
  )
}
