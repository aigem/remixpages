import { Link } from '@remix-run/react'
import { SearchBar } from './SearchBar'
import { ThemeToggle } from './ThemeToggle'
import { siteConfig } from '~/config'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">{siteConfig.site.name}</span>
        </Link>
        <nav className="flex items-center space-x-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 