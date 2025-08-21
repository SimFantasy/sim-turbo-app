/**
 * Vite 配置工具函数
 */

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import dotenv from 'dotenv'

/**
 * 获取指定前缀的环境变量
 *
 * @param match 前缀匹配字符串
 * @param confFiles 配置文件列表
 * @returns 匹配的环境变量配置
 *
 * @example
 * ```typescript
 * const config = getEnvConfig('VITE_GLOB_', ['.env', '.env.production'])
 * ```
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = ['.env', '.env.production']) {
  let envConfig = {}
  confFiles.forEach(item => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
      envConfig = { ...envConfig, ...env }
    } catch (error) {
      // 文件不存在时忽略错误
      console.warn('配置文件读取失败:', error)
    }
  })

  Object.keys(envConfig).forEach(key => {
    const reg = new RegExp(`^(${match})`)
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig
}

export function getProjectRoot(): string {
  // 使用 import.meta.url 获取当前模块路径（ES模块方式）
  // 如果在 CommonJS 环境中，降级到当前工作目录
  try {
    // 在 ES 模块环境中使用 import.meta.url
    if (import.meta !== undefined && import.meta.url) {
      return path.dirname(new URL(import.meta.url).pathname)
    }
  } catch {
    // 忽略错误，使用降级方案
  }

  // 降级到当前工作目录
  return process.cwd()
}
