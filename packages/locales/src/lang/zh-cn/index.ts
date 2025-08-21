import { app } from './app'
/**
 * 中文语言包主入口
 * 导出所有中文翻译模块
 */
import { common } from './common'
import { route } from './route'

export const zhCN = {
  common,
  app,
  route
}
