/**
 * Vite 基础配置
 * 提供通用的构建选项和配置
 */

import type { BaseViteOptions } from '@sim/types'
import type { UserConfig } from 'vite'

// 导入 process 模块以避免 ESLint 错误
import process from 'node:process'

/**
 * 创建基础 Vite 配置
 * 包含通用的构建选项，不包含特定框架的插件
 */
export function createBaseConfig(options: BaseViteOptions = {}): UserConfig {
  const {
    root = process.cwd(),
    alias = {},
    define = {},
    target = 'es2015',
    cssTarget = 'chrome80',
    outDir = 'dist'
  } = options

  // 构建配置对象，只有当 root 有值时才包含它
  const config: UserConfig = {
    ...(root && { root }), // 条件性包含 root 属性
    resolve: {
      alias
    },
    define,
    build: {
      target,
      cssTarget,
      outDir,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 分包策略
          manualChunks: {
            // Vue 相关
            vue: ['vue', 'vue-router', 'pinia'],
            // UI 库
            'naive-ui': ['naive-ui'],
            // 工具库
            utils: ['dayjs', '@vueuse/core', 'es-toolkit']
          }
        }
      }
    },
    // 预编译优化
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        '@vueuse/core',
        'vue-i18n',
        'dayjs',
        'es-toolkit'
      ]
    }
  }

  return config
}
