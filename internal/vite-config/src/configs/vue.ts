/**
 * Vue 项目 Vite 配置
 * 基于基础配置，添加 Vue 特定的插件和配置
 */

import type { VueViteOptions } from '@sim/types'
import type { UserConfig } from 'vite'

// import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { mergeConfig } from 'vite'

import { createProxy, createVitePlugins, getBuildTime, getProjectRoot } from '../utils'
import { createBaseConfig } from './base'

/**
 * 创建 Vue 项目 Vite 配置
 *
 * @param options Vue 配置选项
 * @returns Vite 配置对象
 */
export function createVueConfig(options: VueViteOptions = {}): UserConfig {
  const {
    alias = {},
    define = {},
    plugins = {},
    server = {},
    env = {},
    isBuild = false,
    buildTime = getBuildTime(),
    // root = process.cwd(),
    ...baseOptions
  } = options

  // 默认路径别名
  const projectRoot = getProjectRoot()
  const defaultAlias = {
    '@': path.resolve(projectRoot, './src'), // 根据实际项目结构调整
    '~': path.resolve(projectRoot, '../'),
    '#': path.resolve(projectRoot, './src/types'),
    ...alias
  }
  // const defaultAlias = {
  // 	'@': fileURLToPath(new URL('./src', import.meta.url)),
  // 	'~': fileURLToPath(new URL('./', import.meta.url)),
  // 	'#': fileURLToPath(new URL('./src/types', import.meta.url)),
  // 	...alias
  // }

  // 默认全局定义
  const defaultDefine = {
    BUILD_TIME: JSON.stringify(buildTime),
    ...define
  }

  // 创建基础配置
  const baseConfig = createBaseConfig({
    ...baseOptions,
    alias: defaultAlias,
    define: defaultDefine
  })

  // 创建插件配置对象，只有当 env 有值时才包含它
  const pluginOptions: VueViteOptions = {
    plugins,
    ...(env && { env }), // 条件性包含 env 属性
    isBuild,
    buildTime
  }

  // 创建插件列表
  const vitePlugins = createVitePlugins(pluginOptions)

  // Vue 特定配置
  const vueConfig: UserConfig = {
    plugins: vitePlugins,
    server: {
      host: true,
      open: true,
      port: server.port || 5173,
      proxy: createProxy(server.proxy) || {}
    },
    esbuild: {
      // 生产环境移除 console 和 debugger
      drop: env?.VITE_DROP_CONSOLE && isBuild ? ['console', 'debugger'] : []
    }
  }

  return mergeConfig(baseConfig, vueConfig)
}

/**
 * 创建开发环境配置
 *
 * @param options 配置选项
 * @returns 开发环境 Vite 配置
 */
export function createDevConfig(options: VueViteOptions = {}): UserConfig {
  return createVueConfig({
    ...options,
    isBuild: false,
    plugins: {
      jsx: true,
      devTools: true,
      tailwindcss: true,
      mock: true,
      naiveUi: true,
      html: false,
      compress: false,
      i18n: true,
      ...options.plugins
    }
  })
}

/**
 * 创建生产环境配置
 *
 * @param options 配置选项
 * @returns 生产环境 Vite 配置
 */
export function createProdConfig(options: VueViteOptions = {}): UserConfig {
  return createVueConfig({
    ...options,
    isBuild: true,
    plugins: {
      jsx: true,
      devTools: false,
      tailwindcss: true,
      mock: false,
      naiveUi: true,
      html: true,
      compress: true,
      i18n: true,
      ...options.plugins
    }
  })
}
