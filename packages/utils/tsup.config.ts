import { createLibraryConfig } from '@sim/tsup-config'

export default createLibraryConfig({
  entry: {
    index: 'src/index.ts',
    storage: 'src/storage.ts',
    // router: 'src/router.ts',
    'array-tree': 'src/array-tree.ts',
    // request: 'src/request.ts',
    // utils: 'src/utils.ts',
    icon: 'src/icon.ts',
    naive: 'src/naive.ts'
  },
  external: ['vue', 'axios', 'qs', 'naive-ui', '@iconify/vue', 'vue-router', 'dayjs']
})
