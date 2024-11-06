export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
  tags?: string[]
  category?: string
  author?: string
  readingTime?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
} 