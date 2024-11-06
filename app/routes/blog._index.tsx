import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getAllPosts } from '~/lib/posts.server'
import { PostCard } from '~/components/PostCard'

export async function loader({ request }: LoaderFunctionArgs) {
  const posts = await getAllPosts()
  return json({ posts })
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
} 