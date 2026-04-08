import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

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

function calcReadingTime(content: string): number {
  // 日本語は1文字≒0.4秒、平均400-500字/分で計算
  const chars = content.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(chars / 400))
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
        readingTime: calcReadingTime(content),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    readingTime: calcReadingTime(content),
    content,
  }
}
