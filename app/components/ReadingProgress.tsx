import { useState, useEffect } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const windowHeight = scrollHeight - clientHeight
      const currentProgress = (scrollTop / windowHeight) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50"
    >
      <div 
        className="h-full bg-primary transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
} 