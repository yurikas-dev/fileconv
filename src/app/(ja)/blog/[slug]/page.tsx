import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getPost, getAllPosts } from '@/lib/blog'
import { Clock, ArrowLeft, Tag } from 'lucide-react'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

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
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />記事一覧
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
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />約{post.readingTime}分で読めます</span>
          </div>
        </header>
        <article className="prose-custom">
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>
        <div className="mt-12 p-6 bg-brand-50 border border-brand-100 rounded-2xl text-center">
          <p className="text-sm font-semibold text-gray-800 mb-2">HEICファイルをすぐに変換する</p>
          <p className="text-xs text-gray-500 mb-4">ブラウザ内で処理するので、ファイルはサーバーに送信されません。</p>
          <Link href="/" className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors">
            無料変換ツールを使う →
          </Link>
        </div>
      </div>
    </>
  )
}
