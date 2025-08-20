import 'vue-router'
import type { RoleType } from './global'

// 扩展路由元信息
declare module 'vue-router' {
	interface RouteMeta extends AppRoute.RouteMeta {}
}

declare namespace AppRoute {
	// 菜单类型
	type MenuType = 'dir' | 'page'

	// 路由Meta
	interface RouteMeta {
		title: string // 页面标题
		icon?: string // 页面图标
		hasAuth?: boolean // 是否需要权限
		roles?: RoleType[] // 页面需要的角色
		keepAlive?: boolean // 是否缓存页面
		hide?: boolean // 是否隐藏菜单
		order?: number // 菜单排序
		href?: string // 嵌套外链
		activeMenu?: string // 当前激活菜单
		noTab?: boolean // 是否不显示在标签页
		pinTab?: boolean // 是否固定标签页
		menuType?: MenuType // 菜单类型
	}

	// 路由基础信息
	interface BaseRoute {
		name: string // 路由名称(唯一)
		path: string // 路由路径
		redirect?: string // 重定向路径
		componentPath?: string | null // 组件地址
		id: number // 路由ID
		pid: number | null // 父路由ID
	}

	// 路由Meta的key
	type MetaKeys = keyof RouteMeta

	// 路由类型结构
	type RowRoute = BaseRoute & RouteMeta

	// 扩展到项目真实路由
	interface Route extends RowRoute {
		children?: Route[] // 子路由
		component?: any // 组件
		meta: RouteMeta // 路由元信息
	}
}

export { AppRoute }
