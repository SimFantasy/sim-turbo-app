import { createLibraryConfig } from '@sim/tsup-config'

export default createLibraryConfig({
  entry: {
    index: 'src/index.ts',
    'zh-CN': 'src/lang/zh-CN/index.ts',
    'en-US': 'src/lang/en-US/index.ts',
    naive: 'src/naive.ts'
  },
  external: ['vue-i18n', 'naive-ui']
})
