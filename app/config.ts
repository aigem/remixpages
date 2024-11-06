import type { SiteConfig } from './types'

export const siteConfig: SiteConfig = {
  site: {
    name: 'RemixPages',
    description: '基于 Remix 和 Cloudflare Workers 构建的现代化个人博客系统',
    url: 'https://your-domain.com',
  },
  nav: [
    { title: '首页', href: '/' },
    { title: '博客', href: '/blog' },
    { title: '标签', href: '/tags' },
    { title: '关于', href: '/about' },
  ],
  social: {
    github: 'https://github.com/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'your-email@example.com',
  },
} 