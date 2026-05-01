import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { getAllPosts } from '@/lib/blog'
import { Clock, Tag } from 'lucide-react'

type Props = { params: { locale: string } }

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  if (locale === 'en') {
    return {
      title: 'Blog | Image Formats, Audio Conversion & More',
      description: 'Clear explanations of image formats (HEIC, JPG, PNG, WebP), audio conversion, EXIF privacy risks, and file management tips.',
    }
  }
  return {}
}

export default function LocaleBlogPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const posts = getAllPosts(locale)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Articles</h1>
        <p className="text-sm text-gray-500">
          Image formats, audio conversion, privacy, and file management — explained clearly.
        </p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-sm">Articles coming soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/en/blog/${post.slug}`}
              className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-base font-bold text-gray-900 group-hover:text-brand-700 transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />{post.readingTime} min read
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
