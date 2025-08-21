import type { Linter } from 'eslint'

// 定义需要忽略的文件路径
const restrictedImportIgnores = [
  '**/vite.config.mts',
  '**/tailwind.config.mjs',
  '**/postcss.config.mjs'
]

// 自定义的 ESLint 配置数组
const customConfig: Linter.Config[] = [
  // 对多个目录下的文件应用特定规则和忽略路径
  {
    files: [
      'apps/**/**',
      'packages/effects/**/**',
      'packages/utils/**/**',
      'packages/types/**/**',
      'packages/locales/**/**'
    ],
    ignores: restrictedImportIgnores,
    rules: {
      'perfectionist/sort-interfaces': 'off',
      'perfectionist/sort-objects': 'off'
    }
  },
  // 对所有 vue 文件应用特定规则和忽略路径
  {
    files: ['**/**.vue'],
    ignores: restrictedImportIgnores,
    rules: {
      'perfectionist/sort-objects': 'off'
    }
  },
  // apps内部的一些基础规则，不允许导入特定的包
  {
    files: ['apps/**/**'],
    ignores: restrictedImportIgnores,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['#/api/*'],
              message:
                'The #/api package cannot be imported, please use the @sim/api package itself'
            },
            {
              group: ['#/layouts/*'],
              message:
                'The #/layouts package cannot be imported, please use the @sim/layouts package itself'
            },
            {
              group: ['#/locales/*'],
              message:
                'The #/locales package cannot be imported, please use the @sim/locales package itself'
            },
            {
              group: ['#/stores/*'],
              message:
                'The #/stores package cannot be imported, please use the @sim/stores package itself'
            }
          ]
        }
      ],
      'perfectionist/sort-interfaces': 'off'
    }
  },
  // 不能引入@sim/*里面的包
  // {
  //   files: [
  //     'packages/types/**/**',
  //     'packages/utils/**/**',
  //     'packages/constants/**/**',
  //     'packages/styles/**/**',
  //     'packages/stores/**/**',
  //     'packages/locales/**/**'
  //   ],
  //   ignores: restrictedImportIgnores,
  //   rules: {
  //     'no-restricted-imports': [
  //       'error',
  //       {
  //         patterns: [
  //           {
  //             group: ['@sim/*'],
  //             message: 'The @sim package cannot be imported, please use the @core package itself'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // },
  // 内部脚本和配置文件，允许使用console
  {
    files: ['internal/**/**'],
    rules: {
      'no-console': 'off'
    }
  }
]

export { customConfig }
