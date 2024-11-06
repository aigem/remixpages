import { json, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { searchPosts } from '~/lib/posts.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '10')

  try {
    const allResults = await searchPosts(query)
    const start = (page - 1) * limit
    const end = start + limit
    const posts = allResults.slice(start, end)
    const hasMore = end < allResults.length

    return json({
      posts,
      hasMore,
      total: allResults.length
    })
  } catch (error) {
    console.error('Search error:', error)
    return json({ 
      posts: [], 
      hasMore: false, 
      total: 0,
      error: '搜索出错，请稍后重试' 
    }, { 
      status: 500 
    })
  }
} 