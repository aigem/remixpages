interface ReadingTimeOptions {
  wordsPerMinute?: number
  wordBoundary?: RegExp
  language?: 'en' | 'zh' | 'ja' | 'ko'
}

const WORDS_PER_MINUTE = {
  en: 200, // 英文
  zh: 300, // 中文
  ja: 400, // 日文
  ko: 350  // 韩文
}

export function calculateReadingTime(
  content: string, 
  options: ReadingTimeOptions = {}
): number {
  const {
    language = 'zh',
    wordBoundary = /[\s\u4e00-\u9fa5\u3040-\u30ff\u3400-\u4dbf]/g
  } = options

  const wordsPerMinute = options.wordsPerMinute || WORDS_PER_MINUTE[language]

  // 移除 HTML 标签
  const text = content.replace(/<[^>]*>/g, '')
  
  // 计算字数
  const wordCount = text
    .trim()
    .split(wordBoundary)
    .filter(Boolean).length

  // 计算阅读时间并向上取整
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  
  // 确保至少返回 1 分钟
  return Math.max(1, minutes)
} 