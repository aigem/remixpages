import { bundleMDX } from 'mdx-bundler'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkToc from 'remark-toc'
import remarkEmoji from 'remark-emoji'

interface CompileMDXOptions {
  source: string
  files?: Record<string, string>
}

export async function compileMDX({ source, files = {} }: CompileMDXOptions) {
  try {
    // Windows 平台特殊处理
    if (process.platform === 'win32') {
      process.env.ESBUILD_BINARY_PATH = 'node_modules/esbuild-windows-64/esbuild.exe'
    }

    const { code, frontmatter } = await bundleMDX({
      source,
      files,
      mdxOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm,
          [remarkToc, { heading: '目录', tight: true }],
          remarkEmoji,
        ]
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          [rehypePrism, { showLineNumbers: true }],
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
                ariaLabel: '锚点链接',
              },
            },
          ],
        ]
        return options
      },
      esbuildOptions(options) {
        options.target = ['es2020']
        options.platform = 'node'
        options.charset = 'utf8'
        options.minify = false
        options.sourcemap = false
        options.loader = {
          ...options.loader,
          '.js': 'jsx',
          '.ts': 'tsx',
        }
        return options
      },
      globals: {
        'react': 'React',
        '@mdx-js/react': 'mdx',
      },
    })

    return {
      code,
      frontmatter: frontmatter as Record<string, unknown>,
    }
  } catch (error) {
    console.error('Error compiling MDX:', error)
    throw error
  }
} 