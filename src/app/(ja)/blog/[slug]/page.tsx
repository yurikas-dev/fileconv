import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPost, getAllPosts } from '@/lib/blog'
import { BlogPost } from '@/components/blog/BlogPost'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  setRequestLocale('ja')
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
  setRequestLocale('ja')
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return <BlogPost post={post} slug={slug} locale="ja" />
}
