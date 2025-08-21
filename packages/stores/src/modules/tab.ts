import type { ComputedRef, Ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

import { computed, ref } from 'vue'

import { defineStore } from 'pinia'

// 定义 Tab Store 的返回类型接口
interface TabStore {
  // States
  pinTabs: Ref<RouteLocationNormalized[]>
  tabs: Ref<RouteLocationNormalized[]>
  currentTab: Ref<string>

  // Getters
  allTabs: ComputedRef<RouteLocationNormalized[]>

  // Actions
  addTab: (route: RouteLocationNormalized) => void
  closeTab: (fullPath: string) => void
  closeOtherTabs: (fullPath: string) => void
  closeLeftTabs: (fullPath: string) => void
  closeRightTabs: (fullPath: string) => void
  clearAllTabs: () => void
  closeAllTabs: () => void
  setCurrentTab: (fullPath: string) => void
  getTabIndex: (fullPath: string) => number
  // 修正 modifyTab 的类型声明
  modifyTab: (fullPath: string, modifyFn: (route: RouteLocationNormalized) => void) => void
}

export const useTabStore = defineStore('tab-store', (): TabStore => {
  // States
  const pinTabs = ref<RouteLocationNormalized[]>([])
  const tabs = ref<RouteLocationNormalized[]>([])
  const currentTab = ref<string>('')

  // Getters
  // 所有标签页
  const allTabs = computed(() => [...pinTabs.value, ...tabs.value])

  // Actions
  // 添加标签页
  const addTab = (route: RouteLocationNormalized) => {
    // 判断meta中是否有noTab属性，有则不添加到标签列表
    if (route.meta && route.meta.noTab) return

    // 判断是否已存在标签
    const existTab = hasExistTab(route.fullPath as string)
    if (existTab) return

    // 根据meta中的pinTab进行分组
    if (route.meta && route.meta.pinTab) {
      pinTabs.value.push(route)
    } else {
      tabs.value.push(route)
    }
  }

  // 关闭标签
  const closeTab = (fullPath: string, router?: any) => {
    const tabsLength = tabs.value.length

    // 如果tabs不为空，才能跳转
    if (tabsLength > 1) {
      // 获取关闭标签的索引
      const index = getTabIndex(fullPath)
      const isLastTab = index + 1 === tabsLength

      // 如果关闭当前标签,并且不是最后一个标签，路由跳转到当前标签的后一个标签
      if (currentTab.value === (fullPath as string) && !isLastTab && router) {
        const nextTab = tabs.value[index + 1]
        if (nextTab) {
          router.push(nextTab.fullPath)
        }
      }

      // 如果关闭当前标签，并且是最后一个标签，路由跳转到上一个标签
      else if (currentTab.value === (fullPath as string) && isLastTab && router) {
        const prevTab = tabs.value[index - 1]
        if (prevTab) {
          router.push(prevTab.fullPath)
        }
      }
    }
    // 删除标签
    tabs.value = tabs.value.filter(t => t.fullPath !== fullPath)

    // 如果删除了所有标签，则跳转到默认首页
    if (tabsLength - 1 === 0 && router) {
      router.push('/')
    }
  }

  // 关闭其他标签
  const closeOtherTabs = (fullPath: string) => {
    const index = getTabIndex(fullPath)
    if (index !== -1) {
      tabs.value = tabs.value.filter((_, i) => i === index)
    }
  }

  // 关闭左侧标签
  const closeLeftTabs = (fullPath: string) => {
    const index = getTabIndex(fullPath)
    if (index !== -1) {
      tabs.value = tabs.value.filter((_, i) => i >= index)
    }
  }

  // 关闭右侧标签
  const closeRightTabs = (fullPath: string) => {
    const index = getTabIndex(fullPath)
    if (index !== -1) {
      tabs.value = tabs.value.filter((_, i) => i <= index)
    }
  }

  // 清除所有标签
  const clearAllTabs = () => {
    tabs.value = []
    pinTabs.value = []
  }

  // 关闭所有标签
  const closeAllTabs = (router?: any) => {
    tabs.value = []
    if (router) {
      router.push('/')
    }
  }

  // 判断标签是否已存在
  const hasExistTab = (fullPath: string) => {
    const _tabs = [...tabs.value, ...pinTabs.value]
    return _tabs.some(t => t.fullPath === fullPath)
  }

  // 设置当前标签为激活状态
  const setCurrentTab = (fullPath: string) => {
    currentTab.value = fullPath
  }

  // 获取标签索引
  const getTabIndex = (fullPath: string) => {
    return tabs.value.findIndex(t => t.fullPath === fullPath)
  }

  // 移动标签
  const modifyTab = (fullPath: string, modifyFn: (route: RouteLocationNormalized) => void) => {
    const index = getTabIndex(fullPath)
    if (index !== -1 && tabs.value[index]) {
      modifyFn(tabs.value[index])
    }
  }

  return {
    pinTabs,
    tabs,
    currentTab,
    allTabs,
    addTab,
    closeTab,
    closeOtherTabs,
    closeLeftTabs,
    closeRightTabs,
    clearAllTabs,
    closeAllTabs,
    setCurrentTab,
    getTabIndex,
    modifyTab
  }
})
