import { Link } from '@remix-run/react'
import type { Post } from '~/types'
import { ImageWithFallback } from './ImageWithFallback'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow">
      {post.coverImage && (
        <div className="mb-4 aspect-video overflow-hidden rounded-lg">
          <ImageWithFallback 
            src={post.coverImage}
            alt={post.title}
            width={800}
            height={450}
            loading="lazy"
            className="w-full h-full object-cover transition-transform hover:scale-105"
            fallbackSrc="/images/post-placeholder.jpg"
          />
        </div>
      )}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
        {post.category && (
          <Link 
            to={`/categories/${post.category}`}
            className="px-2 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20"
          >
            {post.category}
          </Link>
        )}
        {post.author && (
          <span className="flex items-center gap-1">
            <img 
              src={post.author.avatar || '/images/default-avatar.png'} 
              alt={post.author.name}
              className="w-5 h-5 rounded-full"
            />
            {post.author.name}
          </span>
        )}
      </div>
      <Link to={`/blog/${post.slug}`} className="group">
        <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('zh-CN')}
        </time>
        <span className="mx-2">·</span>
        <span>{post.readingTime} 分钟阅读</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            to={`/tags/${tag}`}
            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  )
} 