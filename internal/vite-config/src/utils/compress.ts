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
 * @returns Vite 插件数组
 *
 * @example
 * ```typescript
 * const compressPlugins = configCompressPlugin('gzip,brotli', false)
 * ```
 */
export function configCompressPlugin(
  compress: 'brotli' | 'gzip' | 'none' | string,
  deleteOriginFile = false
): Plugin | Plugin[] {
  const compressList = compress.split(',')
  const plugins: Plugin[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
        algorithm: 'gzip'
      })
    )
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    )
  }

  // 类型安全的返回逻辑
  if (plugins.length === 0) {
    return []
  }

  // 使用非空断言，因为我们已经确认数组不为空
  return plugins.length === 1 ? plugins[0]! : plugins
}
