import type { Linter } from 'eslint'

import { interopDefault } from '../util'

export async function turbo(): Promise<Linter.Config[]> {
  try {
    const [pluginTurbo] = await Promise.all([
      // @ts-expect-error - no types
      interopDefault(import('eslint-config-turbo'))
    ] as const)

    return [
      {
        plugins: {
          turbo: pluginTurbo
        }
      }
    ]
  } catch (error) {
    // 如果 eslint-config-turbo 加载失败，返回空配置
    console.warn('eslint-config-turbo 加载失败，跳过 turbo 配置:', error.message)
    return []
  }
}
