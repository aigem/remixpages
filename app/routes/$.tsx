import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { RootLayout } from '~/components/layouts/RootLayout'
import { Link } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
  throw new Response('Not Found', { status: 404 })
}

export default function NotFound() {
  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">404 - 页面未找到</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link 
          to="/"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </RootLayout>
  )
} 