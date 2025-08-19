/**
 * Vite 配置相关类型定义
 */

/**
 * 环境变量类型定义
 * 迁移自 sim-admin/src/types/global.d.ts
 * 用于 Vite 项目的环境变量配置
 */
export interface ViteEnv {
	/** 应用标题 */
	VITE_APP_TITLE: string
	/** API 地址 */
	VITE_API_URL: string
	/** 基础路径 */
	VITE_BASE_PATH: string
	/** 端口号 */
	VITE_PORT: number
	/** 代理配置 */
	VITE_PROXY: [string, string][]
	/** 是否使用 Mock */
	VITE_USE_MOCK: boolean
	/** 构建压缩类型 */
	VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
	/** 是否删除原文件 */
	VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
	/** 是否移除 console */
	VITE_DROP_CONSOLE: boolean
	/** 路由加载模式 */
	VITE_ROUTE_LOAD_MODE: 'dynamic' | 'static'
}

/**
 * 基础 Vite 配置选项
 */
export interface BaseViteOptions {
	/** 项目根目录 */
	root?: string
	/** 路径别名 */
	alias?: Record<string, string>
	/** 全局定义 */
	define?: Record<string, any>
	/** 构建目标 */
	target?: string
	/** CSS 目标 */
	cssTarget?: string
	/** 输出目录 */
	outDir?: string
}

/**
 * Vue Vite 配置选项
 */
export interface VueViteOptions extends BaseViteOptions {
	/** 插件配置 */
	plugins?: {
		/** 是否启用 JSX 支持 */
		jsx?: boolean
		/** 是否启用开发工具 */
		devTools?: boolean
		/** 是否启用 TailwindCSS */
		tailwindcss?: boolean
		/** 是否启用 Mock */
		mock?: boolean
		/** 是否启用 Naive UI 自动导入 */
		naiveUi?: boolean
		/** 是否启用 HTML 插件 */
		html?: boolean
		/** 是否启用压缩 */
		compress?: boolean
		/** 是否启用 i18n */
		i18n?: boolean
	}
	/** 服务器配置 */
	server?: {
		/** 端口号 */
		port?: number
		/** 是否自动打开浏览器 */
		open?: boolean
		/** 代理配置 */
		proxy?: any
	}
	/** 环境变量 */
	env?: Partial<ViteEnv>
	/** 是否为构建模式 */
	isBuild?: boolean
	/** 构建时间 */
	buildTime?: string
}

/**
 * 代理配置项
 */
export type ProxyItem = [string, string]

/**
 * 代理列表
 */
export type ProxyList = ProxyItem[]

/**
 * 组件解析器类型
 */
export interface ComponentResolver {
	(name: string): { name: string; from: string } | undefined
}
