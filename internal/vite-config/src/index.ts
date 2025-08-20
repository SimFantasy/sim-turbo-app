/**
 * Vite 公共配置包
 * 提供 base 和 vue 两种构建配置，支持可选插件
 */

// 导出基础配置
export { createBaseConfig } from './configs/base'

// 导出 Vue 配置
export { createDevConfig, createProdConfig, createVueConfig } from './configs/vue'

// 导出压缩插件
export {
  configCompressPlugin,
  createProxy,
  createVitePlugins,
  getBuildTime,
  getEnvConfig,
  getRootPath,
  isDevMode,
  isProdMode,
  isReportMode,
  setupHtmlPlugin,
  wrapperEnv
} from './utils'
