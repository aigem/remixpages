import { useEffect, useState } from 'react'
import { useTheme } from '~/hooks/useTheme'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      aria-label="切换主题"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
} 