import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData, useRouteError, isRouteErrorResponse } from '@remix-run/react'
import { getPost } from '~/lib/posts.server'
import { RootLayout } from '~/components/layouts/RootLayout'
import { TagList } from '~/components/TagList'
import { TableOfContents } from '~/components/TableOfContents'
import { ReadingProgress } from '~/components/ReadingProgress'
import { siteConfig } from '~/config'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: '文章未找到 - ' + siteConfig.site.name },
      { name: 'description', content: '抱歉，您请求的文章不存在。' },
    ]
  }

  return [
    { title: `${data.post.title} - ${siteConfig.site.name}` },
    { name: 'description', content: data.post.excerpt },
  ]
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  // 验证和清理 slug
  if (!params.slug || typeof params.slug !== 'string') {
    throw new Response('缺少文章标识', { status: 400 })
  }

  // 只允许字母、数字和连字符
  const safeSlug = params.slug.replace(/[^a-zA-Z0-9-]/g, '')
  if (!safeSlug) {
    throw new Response('无效的文章标识', { status: 400 })
  }

  try {
    const post = await getPost(safeSlug)
    if (!post) {
      throw new Response('文章未找到', { status: 404 })
    }

    return json({ post })
  } catch (error) {
    console.error('Error loading post:', error)
    throw new Response('文章加载失败', { status: 500 })
  }
}

export function ErrorBoundary() {
  const error = useRouteError()
  
  if (isRouteErrorResponse(error)) {
    return (
      <RootLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">
            {error.status === 404 ? '文章未找到' : '出错了'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {error.data}
          </p>
        </div>
      </RootLayout>
    )
  }

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">服务器错误</h1>
        <p className="text-gray-600 dark:text-gray-400">
          抱歉，服务器出现了问题。请稍后再试。
        </p>
      </div>
    </RootLayout>
  )
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <RootLayout>
      <ReadingProgress />
      <article className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            {post.author && (
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar || '/images/default-avatar.png'}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
            )}
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </time>
            <span>{post.readingTime} 分钟阅读</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <aside className="hidden lg:block">
            <TableOfContents />
          </aside>
        </div>

        <footer className="mt-8 pt-8 border-t dark:border-gray-800">
          <TagList tags={post.tags} />
        </footer>
      </article>
    </RootLayout>
  )
} 