/**
 * 压缩插件配置
 * 迁移自 sim-admin/build/compress.ts
 */

import type { Plugin } from 'vite'

import compressPlugin from 'vite-plugin-compression'

/**
 * 配置压缩插件
 * 用于打包输出 gzip 和 brotli 压缩文件
 *
 * @param compress 压缩类型
 * @param deleteOriginFile 是否删除原文件
 * @returns Vite 插件数组（可能为空数组）
 *
 * @example
 * ```typescript
 * const compressPlugins = configCompressPlugin('gzip,brotli', false)
 * ```
 */
export function configCompressPlugin(
  compress: 'brotli' | 'gzip' | 'none' | string,
  deleteOriginFile = false
): Plugin[] {
  const compressList = compress.split(',')
  const plugins: Plugin[] = []

  if (compressList.includes('gzip')) {
    const gzipPlugin = compressPlugin({
      ext: '.gz',
      deleteOriginFile,
      algorithm: 'gzip'
    })
    // 确保插件存在后再添加
    if (gzipPlugin) {
      plugins.push(gzipPlugin)
    }
  }

  if (compressList.includes('brotli')) {
    const brotliPlugin = compressPlugin({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile
    })
    // 确保插件存在后再添加
    if (brotliPlugin) {
      plugins.push(brotliPlugin)
    }
  }

  // 始终返回插件数组，确保类型安全
  return plugins
}
