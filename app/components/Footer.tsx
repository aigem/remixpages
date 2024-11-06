import { siteConfig } from '~/config'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} {siteConfig.site.name}. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          {siteConfig.social.github && (
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary"
            >
              GitHub
            </a>
          )}
          {siteConfig.social.twitter && (
            <a
              href={siteConfig.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </footer>
  )
} 