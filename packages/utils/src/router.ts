import type { AppRoute } from '@sim/types'

import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_CONFIG } from '@sim/constants'
import { clone, omit, pick } from 'es-toolkit'

import { arrayToTree } from './array-tree'

// 标准化路由meta字段的集合
const metaFields: AppRoute.MetaKeys[] = [
  'title',
  'icon',
  'hasAuth',
  'roles',
  'keepAlive',
  'hide',
  'order',
  'href',
  'activeMenu',
  'noTab',
  'pinTab',
  'menuType'
]

/**
 * 标注化路由
 * 将路由信息中的meta字段提取出来
 * @param route
 */
export function standardizedRoutes(route: AppRoute.RowRoute[]) {
  return clone(route).map(item => {
    // 去除meta字段
    const route = omit(item, metaFields)
    // 使用Reflect.set将meta字段重新设置到路由对象上
    Reflect.set(route, 'meta', pick(item, metaFields))
    // 返回标准化后的路由对象
    return route
  }) as AppRoute.Route[]
}

/**
 * 创建路由
 * 根据传入的路由配置生成符合vue-router的路由配置
 * @param options 路由创建选项
 * @param options.routes 路由配置
 * @param options.hasPermission 权限检查函数
 * @param options.Layout 布局组件
 * @param options.defaultHomePath 默认首页路径
 * @returns 返回符合 vue-router 的路由配置数组
 */
export function createRoutes({
  routes,
  hasPermission,
  Layout,
  defaultHomePath = DEFAULT_CONFIG.HOME_PATH
}: {
  defaultHomePath?: string
  hasPermission: (roles?: string[]) => boolean
  Layout: any
  routes: AppRoute.RowRoute[]
}) {
  // 标准化路由
  let resultRoutes = standardizedRoutes(routes)

  // 根据权限过滤路由
  resultRoutes = resultRoutes.filter(item => hasPermission(item.meta.roles))

  // 导入所有页面组件
  const modules = import.meta.glob('@/views/**/*.vue')

  // 将没有redirect属性的路由设置component属性
  resultRoutes = resultRoutes.map((item: AppRoute.Route) => {
    if (item.componentPath && !item.redirect) {
      item.component = modules[`/src/views${item.componentPath}`]
    }
    return item
  })

  // 将一维路由数组转换为树形结构（路由嵌套）
  resultRoutes = arrayToTree(resultRoutes) as AppRoute.Route[]

  // 定义根路由
  const appRootRoute: any = {
    path: '/app-root',
    name: 'AppRoot',
    redirect: defaultHomePath,
    component: Layout,
    meta: {
      title: '',
      icon: 'tabler:home'
    },
    children: []
  }

  // 设置路由的默认重定向
  setRedirect(resultRoutes)

  // 将处理后的路由插入到根路由的children属性中
  appRootRoute.children = resultRoutes as unknown as RouteRecordRaw[]

  return appRootRoute
}

/**
 * 设置路由的默认重定向路径
 * 如果路由有子路由且没有设置redirect属性，则默认重定向到第一个非隐藏的子路由
 * @param routes 路由配置
 */
function setRedirect(routes: AppRoute.Route[]) {
  routes.forEach(route => {
    if (route.children) {
      if (!route.redirect) {
        // 过滤出非隐藏的子路由
        const visibleChilds = route.children.filter(child => !child.meta.hide)

        // 默认重定向到第一个非隐藏的子路由
        let target = visibleChilds[0]

        // 如果有子路由设置了order属性，则选择order值最小的子路由作为重定向目标
        const orderChilds = visibleChilds.filter(child => child.meta.order)

        if (orderChilds.length > 0) {
          // 使用 for 循环替代 reduce，提高可读性
          target = orderChilds[0]
          for (const current of orderChilds) {
            // 添加空值检查，确保 target 和 current 都存在且有 order 属性
            if (
              current?.meta?.order &&
              target?.meta?.order &&
              current.meta.order < target.meta.order
            ) {
              target = current
            }
          }
        }

        // 设置重定向 - 添加空值检查
        if (target?.path) {
          route.redirect = target.path
        }
      }
      // 递归处理子路由
      setRedirect(route.children)
    }
  })
}

/**
 * 生成需要缓存的路由名称的数组
 * 这些路由组件卸载时将会被缓存
 * @param routes 路由配置
 * @returns 返回需要缓存的路由名称数组
 */
export function generateCacheRoutes(routes: AppRoute.RowRoute[]) {
  // 过滤出keepAlive属性为true的路由
  // 提取出路由名称
  return routes.filter(i => i.keepAlive).map(i => i.name)
}

/**
 * 将路由转换为naive-ui的菜单格式
 * 根据用户权限过滤和排序
 */
function transformAuthRoutesToMenu(
  userRoutes: AppRoute.Route[],
  hasPermission: (roles?: string[]) => boolean,
  renderIcon: (icon: string) => any,
  $t: (key: string, fallback?: string) => string,
  h: any,
  RouterLink: any
) {
  return (
    userRoutes
      // 过滤出有权限访问的菜单项
      .filter(i => hasPermission(i.meta.roles))
      // 根据order属性对菜单进行排序，order值越小越靠前
      .sort((a, b) => {
        if (a.meta && a.meta.order && b.meta && b.meta.order) return a.meta.order - b.meta.order
        else if (a.meta && a.meta.order) return -1
        else if (b.meta && b.meta.order) return 1
        else return 0
      })
      .map(item => {
        // label：如果menuType为'page'或未设置，使用h函数创建一个虚拟DOM节点
        const target: any = {
          id: item.id,
          pid: item.pid,
          label:
            !item.meta.menuType || item.meta.menuType === 'page'
              ? () =>
                  h(
                    RouterLink,
                    { to: { path: item.path } },
                    { default: () => $t(`route.${String(item.name)}`, item.meta.title) }
                  )
              : () => $t(`route.${String(item.name)}`, item.meta.title),
          key: item.path,
          icon: item.meta.icon ? renderIcon(item.meta.icon) : undefined
        }
        return target
      })
  )
}

/**
 * 生成菜单
 * 根据路由配置生成符合naive-ui的菜单配置
 * @param userRoutes
 * @param hasPermission 权限检查函数
 * @param renderIcon 图标渲染函数
 * @param $t 国际化函数
 * @param h Vue h 函数
 * @param RouterLink Vue RouterLink 组件
 */
export function createMenus(
  userRoutes: AppRoute.Route[],
  hasPermission: (roles?: string[]) => boolean,
  renderIcon: (icon: string) => any,
  $t: (key: string, fallback?: string) => string,
  h: any,
  RouterLink: any
) {
  // 标准化路由，提取出meta字段
  const resultMenus = standardizedRoutes(userRoutes)

  // 过滤出不需要显示的菜单项
  const visibleMenus = resultMenus.filter(i => !i.meta.hide)

  // 转化为naive-ui的菜单格式
  return arrayToTree(
    transformAuthRoutesToMenu(visibleMenus, hasPermission, renderIcon, $t, h, RouterLink)
  )
}
