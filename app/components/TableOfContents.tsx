import { useCallback, useEffect, useState, useMemo } from 'react'

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState('')

  const processedHeadings = useMemo(() => {
    return headings.reduce((acc: TOCItem[], heading) => {
      if (!heading.text.trim()) return acc
      
      const id = heading.id || heading.text.toLowerCase().replace(/\s+/g, '-')
      
      return [...acc, { ...heading, id }]
    }, [])
  }, [headings])

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const visibleHeadings = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => {
        const aDistance = Math.abs(a.boundingClientRect.top)
        const bDistance = Math.abs(b.boundingClientRect.top)
        return aDistance - bDistance
      })

    if (visibleHeadings.length > 0) {
      setActiveId(visibleHeadings[0].target.id)
    }
  }, [])

  useEffect(() => {
    try {
      const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      const items = elements.map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }))
      setHeadings(items)

      const observer = new IntersectionObserver(handleIntersection, {
        rootMargin: '0% 0% -80% 0%',
        threshold: [0, 0.5, 1],
      })

      elements.forEach((element) => observer.observe(element))
      return () => observer.disconnect()
    } catch (error) {
      console.error('Error setting up TableOfContents:', error)
      setHeadings([])
    }
  }, [handleIntersection])

  if (processedHeadings.length === 0) return null

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto" aria-label="文章目录">
      <h2 className="font-bold mb-4">目录</h2>
      <ul className="space-y-2">
        {processedHeadings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`block text-sm hover:text-primary transition-colors ${
                activeId === heading.id ? 'text-primary font-medium' : 'text-gray-600 dark:text-gray-400'
              }`}
              aria-current={activeId === heading.id ? 'true' : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
} 