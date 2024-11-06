import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '~/hooks/useDebounce'
import { useNavigate } from '@remix-run/react'
import type { Post } from '~/types'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const debouncedQuery = useDebounce(query, 300)
  const navigate = useNavigate()
  const resultsRef = useRef<HTMLDivElement>(null)

  const loadMore = async () => {
    if (!debouncedQuery || !hasMore || isLoading) return

    setIsLoading(true)
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(debouncedQuery)}&page=${page}&limit=10`
      )
      const data = await res.json()
      setResults(prev => [...prev, ...data.posts])
      setHasMore(data.hasMore)
      setPage(p => p + 1)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (debouncedQuery) {
      setResults([])
      setPage(1)
      setHasMore(true)
      loadMore()
    }
  }, [debouncedQuery])

  // 处理滚动加载
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.5 }
    )

    if (resultsRef.current) {
      observer.observe(resultsRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, debouncedQuery, page])

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
      />
      {(results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-[60vh] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          {results.map((post) => (
            <button
              key={post.slug}
              onClick={() => {
                navigate(`/blog/${post.slug}`)
                setQuery('')
                setResults([])
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="font-medium">{post.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {post.excerpt}
              </div>
            </button>
          ))}
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-pulse">加载中...</div>
            </div>
          )}
          <div ref={resultsRef} />
        </div>
      )}
    </div>
  )
} 