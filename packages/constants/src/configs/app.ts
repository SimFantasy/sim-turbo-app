import { ENV } from '../util'
import type { AppConfig, ServerConfig, DefaultConfig, PaginationConfig } from '@sim/types'

// 应用基本信息配置
export const APP_CONFIG: AppConfig = {
	NAME: ENV.APP_NAME,
	VERSION: '1.0.0'
} as const

// 服务配置
export const SERVER_CONFIG: ServerConfig = {
	API_URL: ENV.API_URL, // 后端API地址
	TIMEOUT: 1000 * 10, // 10秒
	ENABLE_LOADING: true, // 是否显示加载动画
	CANCEL_DUPLICATE_REQUEST: true, // 是否取消重复请求
	ENABLE_RETRY: true, // 是否开启请求重试
	MAX_RETRY_COUNT: 3, // 最大重试次数
	RETRY_DELAY: 1000 * 3 // 重试延迟时间
} as const

// 默认配置
export const DEFAULT_CONFIG: DefaultConfig = {
	LANGUAGE: 'zhCN',
	THEME: 'light',
	WATERMARK: 'Sim turbo admin',
	HOME_PATH: '/dashboard/analysis'
} as const

// 分页配置
export const PAGINATION_CONFIG: PaginationConfig = {
	DEFAULT_PAGE: 1,
	PAGE_SIZE: 20
} as const
