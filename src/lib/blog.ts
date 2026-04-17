import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR_JA = path.join(process.cwd(), 'content/blog')
const BLOG_DIR_EN = path.join(process.cwd(), 'content/blog/en')

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
}

export type Post = PostMeta & {
  content: string
}

function calcReadingTime(content: string, locale = 'ja'): number {
  if (locale === 'en') {
    const words = content.trim().split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  }
  const chars = content.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / 400))
}

function getBlogDir(locale = 'ja'): string {
  return locale === 'en' ? BLOG_DIR_EN : BLOG_DIR_JA
}

export function getAllPosts(locale = 'ja'): PostMeta[] {
  const dir = getBlogDir(locale)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
        readingTime: calcReadingTime(content, locale),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string, locale = 'ja'): Post | null {
  const dir = getBlogDir(locale)
  const filePath = path.join(dir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    readingTime: calcReadingTime(content, locale),
    content,
  }
}
