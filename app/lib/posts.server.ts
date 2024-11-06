import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { compileMDX } from './mdx.server'
import { calculateReadingTime } from '~/utils/reading-time'
import type { Post } from '~/types'

const POSTS_DIR = join(process.cwd(), 'posts')

export async function getPost(slug: string): Promise<Post | null> {
  const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '')
  if (!safeSlug) return null
  
  try {
    const filePath = join(POSTS_DIR, `${safeSlug}.mdx`)
    const source = await readFile(filePath, { encoding: 'utf-8' })
    
    const { data: frontmatter, content } = matter(source)
    
    const { code } = await compileMDX({ 
      source: content,
    })

    const readingTime = calculateReadingTime(content)

    if (!frontmatter.title || !frontmatter.date) {
      console.error(`Invalid frontmatter in post ${safeSlug}`)
      return null
    }

    return {
      slug: safeSlug,
      title: frontmatter.title,
      date: frontmatter.date,
      content: code,
      excerpt: frontmatter.excerpt || '',
      tags: frontmatter.tags || [],
      category: frontmatter.category || '',
      author: frontmatter.author || null,
      readingTime,
      coverImage: frontmatter.coverImage || null,
    }
  } catch (error) {
    console.error(`Error getting post ${safeSlug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = await readdir(POSTS_DIR)
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.mdx'))
        .map(async file => {
          const slug = file.replace(/\.mdx$/, '')
          return await getPost(slug)
        })
    )

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    if (!tag) return []
    
    const allPosts = await getAllPosts()
    return allPosts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    )
  } catch (error) {
    console.error(`Error getting posts by tag ${tag}:`, error)
    return []
  }
}

export async function searchPosts(query: string, page = 1, limit = 10) {
  if (!query.trim()) return { posts: [], hasMore: false, total: 0 }
  
  try {
    const allPosts = await getAllPosts()
    const filteredPosts = allPosts.filter(post => {
      const searchContent = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase()
      return searchContent.includes(query.toLowerCase())
    })

    const start = (page - 1) * limit
    const end = start + limit
    const posts = filteredPosts.slice(start, end)
    
    return {
      posts,
      hasMore: end < filteredPosts.length,
      total: filteredPosts.length
    }
  } catch (error) {
    console.error('Error searching posts:', error)
    return { posts: [], hasMore: false, total: 0 }
  }
}