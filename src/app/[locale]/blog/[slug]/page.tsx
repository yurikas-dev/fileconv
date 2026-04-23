import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPost, getAllPosts } from '@/lib/blog'
import { BlogPost } from '@/components/blog/BlogPost'

type Props = { params: { locale: string; slug: string } }

export function generateStaticParams() {
  return getAllPosts('en').map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params: { slug, locale } }: Props): Promise<Metadata> {
  const post = getPost(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date },
  }
}

export default function LocaleBlogPostPage({ params: { locale, slug } }: Props) {
  setRequestLocale(locale)
  const post = getPost(slug, locale)
  if (!post) notFound()

  return <BlogPost post={post} slug={slug} locale={locale} />
}
