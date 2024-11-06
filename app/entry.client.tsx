/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser, useLocation, useMatches } from '@remix-run/react'
import { startTransition, StrictMode, useEffect } from 'react'
import { hydrateRoot } from 'react-dom/client'

function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const matches = useMatches()

  useEffect(() => {
    // 错误上报
    const reportError = (error: Error) => {
      console.error('Client Error:', error)
      // 这里可以添加错误上报服务
    }

    window.addEventListener('error', (event) => {
      reportError(event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      reportError(event.reason)
    })
  }, [])

  return <>{children}</>
}

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <ErrorBoundaryWrapper>
          <RemixBrowser />
        </ErrorBoundaryWrapper>
      </StrictMode>
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  window.setTimeout(hydrate, 1)
}
