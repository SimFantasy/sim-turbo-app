import type { AppRoute } from '@sim/types'

import type { Ref } from 'vue'

import { ref } from 'vue'

import { createMenus, createRoutes, generateCacheRoutes, message } from '@sim/utils'
import { defineStore } from 'pinia'

// 定义 RouterStore 接口
interface RouterStore {
  hasInitAuthRouter: Ref<boolean>
  menus: Ref<AppRoute.MenuOption[]>
  rowRoutes: Ref<AppRoute.RowRoute[]>
  activeMenu: Ref<null | string>
  cacheRoutes: Ref<string[]>
  resetRouteStore: (router: any) => void
  resetRoutes: () => void
  setActiveMenu: (key: string) => void
  initAuthRoute: (userRoutes: AppRoute.RowRoute[]) => Promise<void>
}

export const useRouterStore = defineStore('router-store', (): RouterStore => {
  // States
  const hasInitAuthRouter = ref(false) // 是否初始化过路由
  const menus = ref<AppRoute.MenuOption[]>([]) // 菜单
  const rowRoutes = ref<AppRoute.RowRoute[]>([]) // 原始路由
  const activeMenu = ref<null | string>(null) // 当前激活菜单
  const cacheRoutes = ref<string[]>([]) // 缓存路由

  // Actions

  /**
   * 重置路由store状态
   * 重置路由和store中的States
   */
  const resetRouteStore = (router: any) => {
    resetRoutes(router)
    hasInitAuthRouter.value = false
    menus.value = []
    rowRoutes.value = []
    activeMenu.value = null
    cacheRoutes.value = []
  }

  /**
   * 重置路由
   * 如果有Root路由，则移除Root路由
   */
  const resetRoutes = (router?: any) => {
    if (!router) return

    if (router.hasRoute('Root')) {
      router.removeRoute('Root')
    }
    // 检查并移除AppRoot路由
    if (router.hasRoute('AppRoot')) {
      router.removeRoute('AppRoot')
    }
  }

  /**
   * 设置当前激活菜单key
   * @param key 菜单key
   */
  const setActiveMenu = (key: string) => {
    activeMenu.value = key
  }

  /**
   * 初始化路由信息
   * 根据环境变量决定是加载动态路由还是静态路由
   */
  const initRouteInfo = async (staticRoutes?: AppRoute.Route[]) => {
    // // 动态路由加载逻辑（可选）
    // if (getUserRoutesApi) {
    //   // 从本地存储获取用户信息
    //   const userInfo = userStorage.get()

    //   if (!userInfo || !userInfo.id) {
    //     // 如果用户信息不存在或没有ID
    //     const authStore = useAuthStore() // 获取认证Store
    //     authStore.logout() // 注销用户
    //     return
    //   }

    //   // 获取用户路由
    //   const { data } = await getUserRoutesApi(userInfo.id)

    //   if (!data) {
    //     // 如果没有获取到数据
    //     return
    //   }

    //   return data // 返回用户路由数据
    // } else {
    //   // 如果路由加载模式为静态
    //   if (staticRoutes) {
    //     rowRoutes.value = staticRoutes // 使用静态路由配置
    //     return staticRoutes // 返回静态路由配置
    //   }
    // }
    if (staticRoutes) {
      rowRoutes.value = staticRoutes // 使用静态路由配置
      return staticRoutes // 返回静态路由配置
    }
  }

  /**
   * 初始化认证路由
   * 加载路由信息、生成实际路由、菜单和缓存路由
   */
  const initAuthRoute = async (
    router?: any,
    staticRoutes?: AppRoute.Route[],
    hasPermission?: (roles?: string[]) => boolean,
    renderIcon?: (icon: string) => any,
    $t?: (key: string, fallback?: string) => string,
    h?: any,
    RouterLink?: any,
    Layout?: any,
    defaultHomePath?: string
  ) => {
    // 重置路由初始化
    hasInitAuthRouter.value = false

    // 初始化路由信息，获取路由配置数据
    const rowRoutesInfo = await initRouteInfo(staticRoutes)
    // 如果获取到的路由配置数据为空，则终止初始化
    if (!rowRoutesInfo) {
      message.error('获取路由失败，请稍后再试')
      return
    }
    // 将获取到的路由配置数据赋值给rowRoutes
    rowRoutes.value = rowRoutesInfo

    // 生成实际路由并插入到Vue Router中
    if (router && hasPermission && Layout && defaultHomePath) {
      const routes = createRoutes({
        routes: rowRoutesInfo,
        hasPermission,
        Layout
      })
      // 将生成的路由添加到Vue Router中
      router.addRoute(routes)
    }

    // 生成菜单
    if (hasPermission && renderIcon && $t && h && RouterLink) {
      menus.value = createMenus(rowRoutesInfo, hasPermission, renderIcon, $t, h, RouterLink)
    }

    // 生成缓存路由
    cacheRoutes.value = generateCacheRoutes(rowRoutesInfo)

    console.warn('store rowRoutesInfo', rowRoutesInfo)
    console.warn('store rowRoutes', rowRoutes.value)
    console.warn('store hasInitAuthRouter', hasInitAuthRouter.value)

    // 完成路由初始化
    hasInitAuthRouter.value = true
  }

  return {
    hasInitAuthRouter,
    menus,
    rowRoutes,
    activeMenu,
    cacheRoutes,
    resetRouteStore,
    resetRoutes,
    setActiveMenu,
    initAuthRoute
  }
})
