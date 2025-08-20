/**
 * HTML 插件配置
 * 迁移自 sim-admin/build/html.ts
 */

import type { Plugin } from 'vite'

/**
 * 设置 HTML 插件
 * 在构建时向 HTML 中注入构建时间等信息
 *
 * @param buildTime 构建时间
 * @param options 额外选项
 * @param options.meta 元数据配置
 * @param options.title 页面标题
 * @returns Vite 插件
 *
 * @example
 * ```typescript
 * const htmlPlugin = setupHtmlPlugin('2024-01-15 14:30:25', {
 *   title: 'My App',
 *   meta: { version: '1.0.0' }
 * })
 * ```
 */
export function setupHtmlPlugin(
  buildTime: string,
  options: {
    meta?: Record<string, string>
    title?: string
  } = {}
): Plugin {
  const { title, meta = {} } = options

  const plugin: Plugin = {
    name: 'html-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      let transformedHtml = html

      // 注入构建时间
      transformedHtml = transformedHtml.replace(
        '<head>',
        `<head>\n    <meta name="buildTime" content="${buildTime}">`
      )

      // 注入标题
      if (title) {
        transformedHtml = transformedHtml.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      }

      // 注入额外的 meta 标签
      Object.entries(meta).forEach(([name, content]) => {
        transformedHtml = transformedHtml.replace(
          '<head>',
          `<head>\n    <meta name="${name}" content="${content}">`
        )
      })

      return transformedHtml
    }
  }

  return plugin
}
