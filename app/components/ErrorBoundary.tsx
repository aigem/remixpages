import { useRouteError, isRouteErrorResponse } from '@remix-run/react'

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">
          {error.status} {error.statusText}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{error.data}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">出错了</h1>
      <p className="text-gray-600 dark:text-gray-400">
        抱歉,发生了一些错误。请稍后再试。
      </p>
    </div>
  )
} 