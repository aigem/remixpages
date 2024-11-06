export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
  tags: string[]
  readingTime: number
  coverImage?: string
  category?: string
  author?: {
    name: string
    avatar?: string
  }
}

export interface Tag {
  name: string
  slug: string
  count: number
}

export interface SiteConfig {
  site: {
    name: string
    description: string
    url: string
    logo?: string
  }
  nav: {
    title: string
    href: string
  }[]
  social: {
    github?: string
    twitter?: string
    email?: string
  }
} 