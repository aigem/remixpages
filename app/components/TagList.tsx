import { Link } from '@remix-run/react'

interface TagListProps {
  tags: string[]
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          to={`/tags/${tag}`}
          className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
} 