import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { siteConfig } from './config'
import styles from './tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
]

export const meta: MetaFunction = () => {
  return [
    { charset: 'utf-8' },
    { title: siteConfig.site.name },
    { viewport: 'width=device-width,initial-scale=1' },
    { name: 'description', content: siteConfig.site.description },
    { 'http-equiv': 'Content-Language', content: 'zh-CN' },
  ]
}

export default function App() {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
