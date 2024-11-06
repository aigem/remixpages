import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getPostsByTag } from '~/lib/posts.server'
import { RootLayout } from '~/components/layouts/RootLayout'
import { PostCard } from '~/components/PostCard'

export async function loader({ params }: LoaderFunctionArgs) {
  const posts = await getPostsByTag(params.tag as string)
  return json({ posts, tag: params.tag })
}

export default function TagPage() {
  const { posts, tag } = useLoaderData<typeof loader>()

  return (
    <RootLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">标签: {tag}</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </RootLayout>
  )
} 