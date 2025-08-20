/**
 * 代理配置工具函数
 * 迁移自 sim-admin/build/proxy.ts
 */

import type { ProxyList } from '@sim/types'
import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>

const httpsRE = /^https:\/\//

/**
 * 创建代理配置
 * 用于解析 .env.development 代理配置
 *
 * @param list 代理列表
 * @returns 代理配置对象
 *
 * @example
 * ```typescript
 * const proxy = createProxy([
 *   ['/api', 'http://localhost:3000'],
 *   ['/upload', 'https://api.example.com']
 * ])
 * ```
 */
export function createProxy(list: ProxyList = []): ProxyTargetList {
  const ret: ProxyTargetList = {}

  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https 需要 secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }

  return ret
}
