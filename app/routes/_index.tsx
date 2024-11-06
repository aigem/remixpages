import { json } from '@remix-run/cloudflare'
import type { MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getAllPosts } from '~/lib/posts.server'
import { RootLayout } from '~/components/layouts/RootLayout'
import { PostCard } from '~/components/PostCard'
import { siteConfig } from '~/config'

export const meta: MetaFunction = () => {
  return [
    { title: siteConfig.site.name },
    { name: 'description', content: siteConfig.site.description },
  ]
}

export async function loader() {
  try {
    const posts = await getAllPosts()
    return json({ posts })
  } catch (error) {
    console.error('Error loading posts:', error)
    return json({ posts: [] })
  }
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-8">
        <section>
          <h1 className="text-3xl font-bold mb-8">最新文章</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </RootLayout>
  )
}
