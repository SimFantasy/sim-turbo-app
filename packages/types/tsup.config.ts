import { createLibraryConfig } from '@sim/tsup-config'

export default createLibraryConfig({
  entry: ['src/index.ts'],
  external: ['vue', 'vue-router', 'axios']
})
