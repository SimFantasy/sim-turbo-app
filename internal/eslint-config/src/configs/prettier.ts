import type { Linter } from 'eslint'

import { interopDefault } from '../util'

export async function prettier(): Promise<Linter.Config[]> {
  const [pluginPrettier] = await Promise.all([
    interopDefault(import('eslint-plugin-prettier'))
  ] as const)
  return [
    {
      plugins: {
        prettier: pluginPrettier
      },
      rules: {
        'prettier/prettier': 'error' // 将 Prettier 规则作为 ESLint 错误
      }
    }
  ]
}
