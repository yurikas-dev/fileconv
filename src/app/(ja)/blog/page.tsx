import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ブログ｜画像・音声フォーマットをわかりやすく解説',
  description:
    'HEIC・JPG・PNG・WebPの変換方法、MP3などの音声フォーマット、EXIFのプライバシーリスクなど、ファイル変換にまつわる情報をわかりやすく解説します。',
};

export default function BlogPage() {
  setRequestLocale('ja')
  const posts = getAllPosts();
  return (
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>記事一覧</h1>
        <p className='text-sm text-gray-500'>
          画像・音声フォーマット、ファイル変換、プライバシーについてわかりやすく解説します。
        </p>
      </div>
      {posts.length === 0 ? (
        <div className='text-center py-20 text-gray-400'>
          <p className='text-sm'>記事を準備中です。しばらくお待ちください。</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='block bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all group'
            >
              <div className='flex items-center gap-2 mb-2'>
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center gap-1 text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full'
                  >
                    <Tag className='w-2.5 h-2.5' />
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className='text-base font-bold text-gray-900 group-hover:text-brand-700 transition-colors mb-2 leading-snug'>
                {post.title}
              </h2>
              <p className='text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2'>
                {post.description}
              </p>
              <div className='flex items-center gap-3 text-xs text-gray-400'>
                <span>{post.date}</span>
                <span className='flex items-center gap-1'>
                  <Clock className='w-3 h-3' />約{post.readingTime}分
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
