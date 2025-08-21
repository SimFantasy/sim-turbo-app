import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/modules/app',
    'src/modules/auth',
    'src/modules/router',
    'src/modules/tab'
  ],
  declaration: true,
  clean: true,
  // 禁用警告导致的构建失败
  failOnWarn: false,
  rollup: {
    emitCJS: true
  },
  externals: [
    'vue',
    'pinia',
    'vue-router',
    '@sim/constants',
    '@sim/locales',
    '@sim/types',
    '@sim/utils'
  ]
})
