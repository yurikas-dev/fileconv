import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = process.env.BASE_URL ?? 'https://fileconv.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const enPosts = getAllPosts('en')

  const blogUrls = posts.map(post => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const enBlogUrls = enPosts.map(post => ({
    url: `${BASE_URL}/en/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolPaths = [
    '/tools/converter/heic-to-jpg',
    '/tools/converter/jpg-converter',
    '/tools/converter/png-converter',
    '/tools/converter/webp-converter',
    '/tools/audio/to-mp3',
  ]

  const toolUrls = toolPaths.map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const enToolUrls = toolPaths.map(path => ({
    url: `${BASE_URL}/en${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...toolUrls,
    ...enToolUrls,
    ...blogUrls,
    ...enBlogUrls,
  ]
}
